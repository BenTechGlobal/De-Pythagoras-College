/**
 * API Layer
 * In demoMode, serves synthetic data from local modules.
 * When a real backend is connected, set CONFIG.apiBaseUrl and CONFIG.demoMode = false.
 */

const API = (() => {
  const base = () => CONFIG.apiBaseUrl || "";

  async function request(endpoint, options = {}) {
    if (CONFIG.demoMode) {
      // Delegate to demo handlers
      return DemoAPI.handle(endpoint, options);
    }

    const url = `${base()}${endpoint}`;
    const token = sessionStorage.getItem("authToken");

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    };

    try {
      const res = await fetch(url, { ...options, headers });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const err = new Error(data.message || `Request failed (${res.status})`);
        err.status = res.status;
        err.data = data;
        throw err;
      }
      return data;
    } catch (err) {
      if (err.name === "TypeError") {
        throw new Error("Unable to reach the server. Please check your connection.");
      }
      throw err;
    }
  }

  return {
    // Auth
    login: (credentials) =>
      request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
    logout: () => request("/auth/logout", { method: "POST" }),
    changePassword: (payload) =>
      request("/auth/change-password", { method: "POST", body: JSON.stringify(payload) }),

    // Students
    getStudents: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/students${qs ? "?" + qs : ""}`);
    },
    getStudent: (id) => request(`/students/${id}`),
    createStudent: (data) =>
      request("/students", { method: "POST", body: JSON.stringify(data) }),
    updateStudent: (id, data) =>
      request(`/students/${id}`, { method: "PUT", body: JSON.stringify(data) }),

    // Attendance
    getAttendance: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/attendance${qs ? "?" + qs : ""}`);
    },
    markAttendance: (data) =>
      request("/attendance", { method: "POST", body: JSON.stringify(data) }),

    // Results
    getResults: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/results${qs ? "?" + qs : ""}`);
    },
    getStudentResult: (studentId, session, term) =>
      request(`/results/${studentId}?session=${session}&term=${term}`),
    submitScores: (data) =>
      request("/results/scores", { method: "POST", body: JSON.stringify(data) }),
    publishResults: (data) =>
      request("/results/publish", { method: "POST", body: JSON.stringify(data) }),

    // Classes & subjects
    getClasses: () => request("/classes"),
    getSubjects: () => request("/subjects"),

    // Dashboard stats
    getDashboardStats: () => request("/dashboard/stats")
  };
})();
