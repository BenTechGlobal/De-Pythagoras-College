/**
 * Synthetic demonstration data only.
 * Replace with real data via a secure backend.
 * Do NOT store real student records in public files.
 */

const DEMO_DATA = {
  users: [
    {
      id: "u-admin",
      username: "admin",
      password: "Demo@Admin1", // Demo only — never use in production
      role: "super_admin",
      name: "Ada Okonkwo",
      email: "admin@harmonyheights.edu.ng"
    },
    {
      id: "u-teacher1",
      username: "j.adebayo",
      password: "Demo@Teach1",
      role: "teacher",
      name: "Mr. James Adebayo",
      email: "j.adebayo@harmonyheights.edu.ng",
      subjects: ["Mathematics", "Further Mathematics"],
      classes: ["SS2A", "SS2B"]
    },
    {
      id: "u-student1",
      username: "STU2025001",
      password: "Demo@Stud1",
      role: "student",
      name: "Chioma Eze",
      studentId: "STU2025001",
      email: "chioma.eze@student.harmonyheights.edu.ng"
    },
    {
      id: "u-parent1",
      username: "parent.eze",
      password: "Demo@Par1",
      role: "parent",
      name: "Mrs. Ngozi Eze",
      linkedStudents: ["STU2025001"],
      email: "ngozi.eze@email.com"
    }
  ],

  students: [
    {
      id: "STU2025001",
      fullName: "Chioma Amaka Eze",
      gender: "Female",
      dateOfBirth: "2009-03-15",
      class: "SS2",
      classArm: "A",
      admissionDate: "2020-09-01",
      session: "2025/2026",
      status: "Active",
      parentName: "Mrs. Ngozi Eze",
      parentPhone: "+234 802 111 2233",
      parentEmail: "ngozi.eze@email.com",
      emergencyContact: "+234 803 444 5566"
    },
    {
      id: "STU2025002",
      fullName: "Tunde Oluwaseun Bakare",
      gender: "Male",
      dateOfBirth: "2009-07-22",
      class: "SS2",
      classArm: "A",
      admissionDate: "2020-09-01",
      session: "2025/2026",
      status: "Active",
      parentName: "Mr. Olumide Bakare",
      parentPhone: "+234 805 777 8899",
      parentEmail: "olumide.bakare@email.com",
      emergencyContact: "+234 806 111 2233"
    },
    {
      id: "STU2025003",
      fullName: "Aisha Fatima Ibrahim",
      gender: "Female",
      dateOfBirth: "2009-11-08",
      class: "SS2",
      classArm: "B",
      admissionDate: "2021-09-01",
      session: "2025/2026",
      status: "Active",
      parentName: "Alhaji Yusuf Ibrahim",
      parentPhone: "+234 807 333 4455",
      parentEmail: "yusuf.ibrahim@email.com",
      emergencyContact: "+234 808 666 7788"
    },
    {
      id: "STU2025004",
      fullName: "David Chinedu Okoro",
      gender: "Male",
      dateOfBirth: "2010-01-30",
      class: "SS1",
      classArm: "A",
      admissionDate: "2022-09-01",
      session: "2025/2026",
      status: "Active",
      parentName: "Mrs. Grace Okoro",
      parentPhone: "+234 809 999 0011",
      parentEmail: "grace.okoro@email.com",
      emergencyContact: "+234 810 222 3344"
    },
    {
      id: "STU2025005",
      fullName: "Blessing Adaobi Nwosu",
      gender: "Female",
      dateOfBirth: "2008-05-12",
      class: "SS3",
      classArm: "A",
      admissionDate: "2019-09-01",
      session: "2025/2026",
      status: "Active",
      parentName: "Mr. Emeka Nwosu",
      parentPhone: "+234 811 555 6677",
      parentEmail: "emeka.nwosu@email.com",
      emergencyContact: "+234 812 888 9900"
    }
  ],

  classes: [
    { id: "JSS1A", name: "JSS 1A", level: "Junior Secondary", arm: "A" },
    { id: "JSS2A", name: "JSS 2A", level: "Junior Secondary", arm: "A" },
    { id: "SS1A", name: "SS 1A", level: "Senior Secondary", arm: "A" },
    { id: "SS2A", name: "SS 2A", level: "Senior Secondary", arm: "A" },
    { id: "SS2B", name: "SS 2B", level: "Senior Secondary", arm: "B" },
    { id: "SS3A", name: "SS 3A", level: "Senior Secondary", arm: "A" }
  ],

  subjects: [
    "Mathematics",
    "English Language",
    "Physics",
    "Chemistry",
    "Biology",
    "Further Mathematics",
    "Economics",
    "Government",
    "Literature in English",
    "Computer Science",
    "Civic Education",
    "Agricultural Science"
  ],

  // Sample attendance for SS2A on a given date
  attendance: {
    "2025-10-06": {
      "SS2A": [
        { studentId: "STU2025001", status: "Present", time: "07:42" },
        { studentId: "STU2025002", status: "Late", time: "08:05" }
      ],
      "SS2B": [
        { studentId: "STU2025003", status: "Present", time: "07:38" }
      ]
    }
  },

  // Sample results
  results: {
    "STU2025001": {
      "2025/2026": {
        "First Term": {
          status: "published",
          subjects: [
            { name: "Mathematics", ca: 32, exam: 48, total: 80, grade: "A", remark: "Excellent" },
            { name: "English Language", ca: 30, exam: 45, total: 75, grade: "B", remark: "Very Good" },
            { name: "Physics", ca: 28, exam: 42, total: 70, grade: "B", remark: "Very Good" },
            { name: "Chemistry", ca: 26, exam: 40, total: 66, grade: "C", remark: "Good" },
            { name: "Biology", ca: 34, exam: 50, total: 84, grade: "A", remark: "Excellent" },
            { name: "Further Mathematics", ca: 30, exam: 44, total: 74, grade: "B", remark: "Very Good" },
            { name: "Computer Science", ca: 36, exam: 52, total: 88, grade: "A", remark: "Excellent" },
            { name: "Civic Education", ca: 32, exam: 46, total: 78, grade: "B", remark: "Very Good" }
          ],
          attendance: { present: 58, total: 62, percentage: 93.5 },
          teacherComment: "Chioma is a diligent student who consistently performs at a high level. She should continue to strengthen her Chemistry foundation.",
          principalComment: "An outstanding performance. Keep up the excellent work.",
          position: 2,
          outOf: 35,
          average: 76.9
        }
      }
    },
    "STU2025002": {
      "2025/2026": {
        "First Term": {
          status: "published",
          subjects: [
            { name: "Mathematics", ca: 28, exam: 40, total: 68, grade: "C", remark: "Good" },
            { name: "English Language", ca: 26, exam: 38, total: 64, grade: "C", remark: "Good" },
            { name: "Physics", ca: 24, exam: 36, total: 60, grade: "C", remark: "Good" },
            { name: "Chemistry", ca: 22, exam: 34, total: 56, grade: "D", remark: "Pass" },
            { name: "Biology", ca: 30, exam: 42, total: 72, grade: "B", remark: "Very Good" },
            { name: "Economics", ca: 28, exam: 40, total: 68, grade: "C", remark: "Good" },
            { name: "Computer Science", ca: 32, exam: 46, total: 78, grade: "B", remark: "Very Good" },
            { name: "Civic Education", ca: 30, exam: 44, total: 74, grade: "B", remark: "Very Good" }
          ],
          attendance: { present: 55, total: 62, percentage: 88.7 },
          teacherComment: "Tunde shows good potential. More consistent effort in Chemistry will improve overall standing.",
          principalComment: "A solid performance. Aim higher next term.",
          position: 12,
          outOf: 35,
          average: 67.5
        }
      }
    }
  },

  staff: [
    {
      id: "STF001",
      name: "Mr. James Adebayo",
      role: "Mathematics Teacher",
      department: "Sciences",
      email: "j.adebayo@harmonyheights.edu.ng"
    },
    {
      id: "STF002",
      name: "Mrs. Funke Adeyemi",
      role: "English Teacher",
      department: "Languages",
      email: "f.adeyemi@harmonyheights.edu.ng"
    },
    {
      id: "STF003",
      name: "Dr. Emmanuel Okeke",
      role: "Vice Principal (Academics)",
      department: "Administration",
      email: "e.okeke@harmonyheights.edu.ng"
    }
  ]
};
