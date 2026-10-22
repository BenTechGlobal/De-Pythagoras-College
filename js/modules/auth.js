/**
 * Client-side auth helpers (session management only).
 * Real security is enforced by the backend.
 */

const Auth = (() => {
  function getUser() {
    try {
      return JSON.parse(sessionStorage.getItem("demoUser") || "null");
    } catch {
      return null;
    }
  }

  function isLoggedIn() {
    return !!getUser() && !!sessionStorage.getItem("authToken");
  }

  function requireRole(allowedRoles = []) {
    const user = getUser();
    if (!user) {
      window.location.href = "/portal/login.html";
      return null;
    }
    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      window.location.href = "/portal/unauthorized.html";
      return null;
    }
    return user;
  }

  function logout() {
    sessionStorage.removeItem("demoUser");
    sessionStorage.removeItem("authToken");
    window.location.href = "/portal/login.html";
  }

  async function login(username, password) {
    const result = await API.login({ username, password });
    return result.user;
  }

  function getRedirectForRole(role) {
    switch (role) {
      case "super_admin":
      case "school_admin":
        return "/admin/dashboard.html";
      case "teacher":
        return "/admin/teacher-dashboard.html";
      case "student":
      case "parent":
        return "/portal/dashboard.html";
      default:
        return "/portal/login.html";
    }
  }

  return {
    getUser,
    isLoggedIn,
    requireRole,
    logout,
    login,
    getRedirectForRole
  };
})();
