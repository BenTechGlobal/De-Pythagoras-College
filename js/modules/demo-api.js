/**
 * Demo API — simulates backend responses with synthetic data.
 * This is NOT a secure production authentication system.
 */

const DemoAPI = (() => {
  const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

  function getSessionUser() {
    try {
      return JSON.parse(sessionStorage.getItem("demoUser") || "null");
    } catch {
      return null;
    }
  }

  function requireAuth(roles = []) {
    const user = getSessionUser();
    if (!user) {
      const err = new Error("Authentication required");
      err.status = 401;
      throw err;
    }
    if (roles.length && !roles.includes(user.role)) {
      const err = new Error("Insufficient permissions");
      err.status = 403;
      throw err;
    }
    return user;
  }

  async function handle(endpoint, options = {}) {
    await delay();
    const method = (options.method || "GET").toUpperCase();
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch {
        body = {};
      }
    }

    // Auth routes
    if (endpoint === "/auth/login" && method === "POST") {
      const user = DEMO_DATA.users.find(
        (u) => u.username === body.username && u.password === body.password
      );
      if (!user) {
        const err = new Error("Invalid username or password");
        err.status = 401;
        throw err;
      }
      const sessionUser = {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        email: user.email,
        studentId: user.studentId || null,
        linkedStudents: user.linkedStudents || [],
        subjects: user.subjects || [],
        classes: user.classes || []
      };
      sessionStorage.setItem("demoUser", JSON.stringify(sessionUser));
      sessionStorage.setItem("authToken", "demo-token-" + user.id);
      return { user: sessionUser, token: "demo-token-" + user.id };
    }

    if (endpoint === "/auth/logout" && method === "POST") {
      sessionStorage.removeItem("demoUser");
      sessionStorage.removeItem("authToken");
      return { success: true };
    }

    if (endpoint === "/auth/change-password" && method === "POST") {
      requireAuth();
      // Demo: accept any change
      return { success: true, message: "Password updated (demo only)" };
    }

    // Students
    if (endpoint === "/students" && method === "GET") {
      requireAuth(["super_admin", "school_admin", "teacher"]);
      let list = [...DEMO_DATA.students];
      const url = new URL(endpoint, "http://local");
      // Simple filter support via query in real impl; here return all
      return { data: list, total: list.length };
    }

    if (endpoint.startsWith("/students/") && method === "GET") {
      const user = requireAuth(["super_admin", "school_admin", "teacher", "student", "parent"]);
      const id = endpoint.split("/")[2];
      // Record-level check
      if (user.role === "student" && user.studentId !== id) {
        const err = new Error("Access denied");
        err.status = 403;
        throw err;
      }
      if (user.role === "parent" && !user.linkedStudents.includes(id)) {
        const err = new Error("Access denied");
        err.status = 403;
        throw err;
      }
      const student = DEMO_DATA.students.find((s) => s.id === id);
      if (!student) {
        const err = new Error("Student not found");
        err.status = 404;
        throw err;
      }
      return { data: student };
    }

    // Results
    if (endpoint.startsWith("/results/") && method === "GET") {
      const user = requireAuth(["super_admin", "school_admin", "teacher", "student", "parent"]);
      const parts = endpoint.split("?");
      const id = parts[0].split("/")[2];
      const params = new URLSearchParams(parts[1] || "");
      const session = params.get("session") || CONFIG.academic.currentSession;
      const term = params.get("term") || CONFIG.academic.currentTerm;

      if (user.role === "student" && user.studentId !== id) {
        const err = new Error("Access denied");
        err.status = 403;
        throw err;
      }
      if (user.role === "parent" && !user.linkedStudents.includes(id)) {
        const err = new Error("Access denied");
        err.status = 403;
        throw err;
      }

      const result = DEMO_DATA.results[id]?.[session]?.[term];
      if (!result) {
        return { data: null, message: "No published results for this term" };
      }
      if (result.status !== "published" && !["super_admin", "school_admin", "teacher"].includes(user.role)) {
        return { data: null, message: "Results not yet published" };
      }
      return { data: { studentId: id, session, term, ...result } };
    }

    // Dashboard stats
    if (endpoint === "/dashboard/stats") {
      requireAuth(["super_admin", "school_admin", "teacher"]);
      return {
        totalStudents: DEMO_DATA.students.length,
        activeStudents: DEMO_DATA.students.filter((s) => s.status === "Active").length,
        totalStaff: DEMO_DATA.staff.length,
        classes: DEMO_DATA.classes.length,
        attendanceToday: { present: 4, absent: 1, late: 1, percentage: 80 }
      };
    }

    // Classes & subjects
    if (endpoint === "/classes") {
      requireAuth();
      return { data: DEMO_DATA.classes };
    }
    if (endpoint === "/subjects") {
      requireAuth();
      return { data: DEMO_DATA.subjects };
    }

    // Attendance
    if (endpoint === "/attendance" && method === "GET") {
      requireAuth(["super_admin", "school_admin", "teacher"]);
      return { data: DEMO_DATA.attendance };
    }

    // Fallback
    const err = new Error(`Demo endpoint not implemented: ${method} ${endpoint}`);
    err.status = 404;
    throw err;
  }

  return { handle };
})();
