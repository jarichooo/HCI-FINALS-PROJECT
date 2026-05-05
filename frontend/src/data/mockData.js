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
