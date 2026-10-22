/**
 * Application Configuration
 * Central place for school settings and API endpoints.
 * Replace placeholder values with real school data before deployment.
 */

const CONFIG = {
  // School identity (edit these)
  school: {
    name: "De-Pythagoras College",
    shortName: "DPC",
    motto: "Excellence • Integrity • Innovation",
    tagline: "Nurturing minds for a brighter tomorrow",
    founded: 2026,
    address: "12 NEPA office, Fajol, Obantoko, Abeokuta, Ogun State, Nigeria",
    phone: "+234 8039637049",
    email: "info@De-PythagorasCollege.edu.ng",
    officeHours: "Monday – Friday, 8:00 AM – 5:00 PM",
    website: "https://De-PythagorasCollege.edu.ng"
  },

  // Academic configuration
  academic: {
    currentSession: "2025/2026",
    terms: ["First Term", "Second Term", "Third Term"],
    currentTerm: "First Term",
    gradingScale: [
      { min: 80, max: 100, grade: "A", remark: "Excellent" },
      { min: 70, max: 79, grade: "B", remark: "Very Good" },
      { min: 60, max: 69, grade: "C", remark: "Good" },
      { min: 50, max: 59, grade: "D", remark: "Pass" },
      { min: 40, max: 49, grade: "E", remark: "Fair" },
      { min: 0, max: 39, grade: "F", remark: "Fail" }
    ],
    assessmentStructure: {
      continuousAssessment: { max: 40, weight: 40 },
      examination: { max: 60, weight: 60 }
    },
    passMark: 50
  },

  // Attendance
  attendance: {
    schoolOpenTime: "07:45",
    lateThresholdMinutes: 15
  },

  /**
   * Backend API base URL
   * Leave empty or point to a mock for static demo.
   * For production: "https://api.yourschool.edu.ng/v1"
   */
  apiBaseUrl: "",

  /**
   * When true, the frontend uses local synthetic data and mock auth.
   * Set to false when a real backend is connected.
   */
  demoMode: true,

  // Feature flags
  features: {
    studentPortal: true,
    staffPortal: true,
    attendanceModule: true,
    resultsModule: true,
    printResults: true
  }
};

// Freeze to prevent accidental mutation in production
Object.freeze(CONFIG);
Object.freeze(CONFIG.school);
Object.freeze(CONFIG.academic);
Object.freeze(CONFIG.attendance);
Object.freeze(CONFIG.features);
