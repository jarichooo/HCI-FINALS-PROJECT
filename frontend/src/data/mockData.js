export const mockStudents = [
  {
    studentId: "2021-00123",
    password: "student123",
    name: "Juan Dela Cruz",
  },
  {
    studentId: "2022-00456",
    password: "pass456",
    name: "Maria Santos",
  },
];

export function validateStudent(studentId, password) {
  return mockStudents.find(
    (s) => s.studentId === studentId && s.password === password
  ) || null;
}