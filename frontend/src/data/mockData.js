// ─── Student credentials ──────────────────────────────────────────────────────

export const mockStudents = [
  {
    studentId: "2021-00123",
    password: "student123",
    name: "Juan Dela Cruz",
    email: "jdelacruz@educore.edu.ph",
    firstLogin: true,
  },
  {
    studentId: "2022-00456",
    password: "pass456",
    name: "Maria Santos",
    email: "msantos@educore.edu.ph",
    firstLogin: true,
  },
];

export function validateStudent(studentId, password) {
  return (
    mockStudents.find(
      (s) => s.studentId === studentId && s.password === password
    ) || null
  );
}

// ─── Assessment periods ───────────────────────────────────────────────────────

export const mockAssessmentPeriods = [
  "1st Semester 2024-2025",
  "2nd Semester 2024-2025",
  "1st Semester 2023-2024",
  "2nd Semester 2023-2024",
];

// ─── Enrolled subjects ────────────────────────────────────────────────────────

export const mockEnrolledSubjects = [
  {
    code: "CS101",
    subject: "Introduction to Computer Science",
    description: "Fundamentals of programming and algorithms",
    units: 3,
    tf: "M/W",
    lec: "10:00–11:30",
    lab: "1:00–2:30",
    schedule: "M10:00, W10:00",
  },
  {
    code: "MATH201",
    subject: "Calculus II",
    description: "Advanced calculus and integration techniques",
    units: 4,
    tf: "T/Th",
    lec: "9:00–10:30",
    lab: "2:00–3:30",
    schedule: "T9:00, Th9:00",
  },
  {
    code: "ENG102",
    subject: "English Composition",
    description: "Advanced writing and communication skills",
    units: 3,
    tf: "M/W/F",
    lec: "11:00–12:00",
    lab: "N/A",
    schedule: "MWF11:00",
  },
  {
    code: "PHYS151",
    subject: "Physics I",
    description: "Classical mechanics and motion",
    units: 4,
    tf: "T/Th",
    lec: "1:00–2:30",
    lab: "3:00–5:00",
    schedule: "T1:00, Th1:00",
  },
  {
    code: "CHEM101",
    subject: "General Chemistry",
    description: "Basic principles of chemistry",
    units: 3,
    tf: "M/W",
    lec: "2:00–3:30",
    lab: "4:00–6:00",
    schedule: "M2:00, W2:00",
  },
  {
    code: "HIS105",
    subject: "World History",
    description: "Survey of major historical events",
    units: 3,
    tf: "F",
    lec: "10:00–12:00",
    lab: "N/A",
    schedule: "F10:00",
  },
];

// ─── Curriculum and Grades ────────────────────────────────────────────────────

export const mockCurriculum = {
  curriculum: "Bachelor of Science in Computer Science",
  status: "Unfinished",
  grades: [
    {
      year: "1st Year, 1st Semester",
      courses: [
        { code: "CGCS 101", name: "Introduction to Computing", units: 3.0, grade: 1.50, remark: "Passed", take1: "1.50 (23-1)" },
        { code: "CGCS 102", name: "Fundamentals of Programming", units: 3.0, grade: 1.20, remark: "Passed", take1: "1.20 (23-1)" },
        { code: "CSAM 112", name: "Linear Algebra", units: 3.0, grade: 1.25, remark: "Passed", take1: "1.25 (23-1)" },
        { code: "GE 1", name: "Understanding the Self", units: 3.0, grade: 1.10, remark: "Passed", take1: "1.10 (23-1)" },
        { code: "GE 2", name: "Readings of Philippine History", units: 3.0, grade: 1.60, remark: "Passed", take1: "1.60 (23-1)" },
        { code: "GE ELECT 4", name: "Gender and Society", units: 3.0, grade: 1.30, remark: "Passed", take1: "1.30 (23-1)" },
        { code: "PE 1E", name: "Physical Activities toward Health and Fitness", units: 2.0, grade: 1.20, remark: "Passed", take1: "1.20 (23-1)" },
        { code: "NSTP 1(LTS)", name: "National Service Training Program 1", units: 3.0, grade: null, remark: null, take1: null, highlighted: true },
        { code: "NSTP 1(CWTS)", name: "National Service Training Program 1", units: 3.0, grade: 1.50, remark: "Passed", take1: "1.50 (23-1)" },
        { code: "NSTP 1(ROTC)", name: "National Service Training Program 1", units: 3.0, grade: null, remark: null, take1: null, highlighted: true },
      ],
    },
    {
      year: "1st Year, 2nd Semester",
      courses: [
        { code: "CGCS 103", name: "Intermediate Programming", units: 3.0, grade: 1.60, remark: "Passed", take1: "1.60 (23-2)" },
        { code: "CSAM 122", name: "Calculus For Computer Science", units: 3.0, grade: 1.50, remark: "Passed", take1: "1.50 (23-2)" },
        { code: "CSAM 121", name: "Discrete Structures 1", units: 3.0, grade: 1.30, remark: "Passed", take1: "1.30 (23-2)" },
        { code: "GE 4", name: "Mathematics in the Modern World", units: 3.0, grade: 1.10, remark: "Passed", take1: "1.10 (23-2)" },
        { code: "GE 3", name: "The Contemporary World", units: 3.0, grade: 1.50, remark: "Passed", take1: "1.50 (23-2)" },
        { code: "GE 8", name: "Ethics", units: 3.0, grade: 1.25, remark: "Passed", take1: "1.25 (23-2)" },
        { code: "PE 2E", name: "Physical Activities toward Health and Fitness", units: 2.0, grade: 1.70, remark: "Passed", take1: "1.70 (23-2)" },
        { code: "NSTP 2(LTS)", name: "National Service Training Program 2", units: 3.0, grade: null, remark: null, take1: null, highlighted: true },
        { code: "NSTP 2(CWTS)", name: "National Service Training Program 2", units: 3.0, grade: 1.20, remark: "Passed", take1: "1.20 (23-2)" },
        { code: "NSTP 2(ROTC)", name: "National Service Training Program 2", units: 3.0, grade: null, remark: "Pre-req.", prereq: "NSTP 1(ROTC)", highlighted: true, isRed: true },
      ],
    },
    {
      year: "2nd Year, 1st Semester",
      courses: [
        { code: "CGCS 104", name: "Data Structures and Algorithms", units: 3.0, grade: 1.10, remark: "Passed", take1: "1.10 (24-1)" },
        { code: "CS 214A", name: "Object Oriented Programming", units: 3.0, grade: 1.60, remark: "Passed", take1: "1.60 (24-1)" },
        { code: "CS 215", name: "Operating Systems", units: 3.0, grade: 1.50, remark: "Passed", take1: "1.50 (24-1)" },
        { code: "CSAC 212", name: "Introduction to Artificial Intelligence", units: 3.0, grade: 1.60, remark: "Passed", take1: "1.60 (24-1)" },
        { code: "CSAM 211", name: "Ordinary Differential Equations", units: 3.0, grade: 1.20, remark: "Passed", take1: "1.20 (24-1)" },
        { code: "CSAM 212", name: "Discrete Structures 2", units: 3.0, grade: 1.10, remark: "Passed", take1: "1.10 (24-1)" },
        { code: "GE 6", name: "Art Appreciation", units: 3.0, grade: 1.25, remark: "Passed", take1: "1.25 (24-1)" },
        { code: "GE 7", name: "Science, Technology and Society", units: 3.0, grade: 1.25, remark: "Passed", take1: "1.25 (24-1)" },
        { code: "PE 3E", name: "Physical Activities toward Health and Fitness", units: 2.0, grade: 1.20, remark: "Passed", take1: "1.20 (24-1)" },
      ],
    },
    {
      year: "2nd Year, 2nd Semester",
      courses: [
        { code: "CGCS 105", name: "Information Management 1", units: 3.0, grade: 1.25, remark: "Passed", take1: "1.25 (24-2)" },
      ],
    },
  ],
};
