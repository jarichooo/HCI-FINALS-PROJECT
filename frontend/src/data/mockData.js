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

// ─── Helper function to generate random schedule values ────────────────────────

function generateRandomTF() {
  const options = ["M/W", "T/Th", "M/W/F", "F", "M", "W", "T", "Th"];
  return options[Math.floor(Math.random() * options.length)];
}

function generateRandomTime() {
  const hours = [8, 9, 10, 11, 13, 14, 15, 16];
  const hour = hours[Math.floor(Math.random() * hours.length)];
  const minute = Math.random() > 0.5 ? "00" : "30";
  const endHour = hour + 1;
  return `${hour}:${minute}–${endHour}:${minute}`;
}

function generateRandomSchedule(tf) {
  const dayMap = { M: "Monday", W: "Wednesday", F: "Friday", T: "Tuesday", Th: "Thursday" };
  const days = tf.split("/");
  const times = [];
  let startHour = Math.floor(Math.random() * 6) + 8;
  
  days.forEach(day => {
    times.push(`${day}${startHour}:00`);
  });
  
  return times.join(", ");
}

// ─── Assessment periods with subjects ──────────────────────────────────────────

export const mockAssessmentPeriods = [
  "1st Semester 2024-2025",
  "2nd Semester 2024-2025",
  "1st Semester 2023-2024",
  "2nd Semester 2023-2024",
];

// ─── Enrolled subjects by period ───────────────────────────────────────────────

export const mockEnrolledSubjectsByPeriod = {
  "1st Semester 2024-2025": [
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
      code: "CS315",
      subject: "Web Development",
      description: "Modern web development frameworks",
      units: 3,
      tf: null,
      lec: null,
      lab: null,
      schedule: null,
    },
  ],
  "2nd Semester 2024-2025": [
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
      tf: null,
      lec: null,
      lab: null,
      schedule: null,
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
  ],
  "1st Semester 2023-2024": [
    {
      code: "CS201",
      subject: "Data Structures",
      description: "Introduction to data structures and algorithms",
      units: 3,
      tf: null,
      lec: null,
      lab: null,
      schedule: null,
    },
    {
      code: "MATH301",
      subject: "Linear Algebra",
      description: "Advanced linear algebra concepts",
      units: 4,
      tf: "M/W",
      lec: "13:00–14:30",
      lab: "N/A",
      schedule: "M13:00, W13:00",
    },
  ],
  "2nd Semester 2023-2024": [
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
    {
      code: "BIO102",
      subject: "Biology II",
      description: "Cellular and molecular biology",
      units: 4,
      tf: null,
      lec: null,
      lab: null,
      schedule: null,
    },
  ],
};

// Function to get subjects with random values generated for missing fields
export function getEnrolledSubjectsForPeriod(period) {
  const subjects = mockEnrolledSubjectsByPeriod[period] || [];
  return subjects.map(subject => ({
    ...subject,
    tf: subject.tf || generateRandomTF(),
    lec: subject.lec || generateRandomTime(),
    lab: subject.lab || (Math.random() > 0.4 ? generateRandomTime() : "N/A"),
    schedule: subject.schedule || generateRandomSchedule(subject.tf || generateRandomTF()),
  }));
}

// ─── Enrolled subjects (default) ───────────────────────────────────────────────

export const mockEnrolledSubjects = getEnrolledSubjectsForPeriod("1st Semester 2024-2025");

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
        { code: "CSAC 223", name: "Robotics", units: 3.0, grade: 1.40, remark: "Passed", take1: "1.40 (24-2)" },
        { code: "CSAM 221", name: "Probability And Statistics In Computer Science", units: 3.0, grade: 1.50, remark: "Passed", take1: "1.50 (24-2)" },
        { code: "CSAC 224", name: "Machine Learning", units: 3.0, grade: 1.30, remark: "Passed", take1: "1.30 (24-2)" },
        { code: "CS 212", name: "Algorithms & Complexity", units: 3.0, grade: 1.20, remark: "Passed", take1: "1.20 (24-2)" },
        { code: "CSAC 225", name: "Digital Image Processing", units: 3.0, grade: 1.50, remark: "Passed", take1: "1.50 (24-2)" },
        { code: "CS 226A", name: "Networks and Communications", units: 3.0, grade: 1.60, remark: "Passed", take1: "1.60 (24-2)" },
        { code: "GE 9", name: "The Life and Works of Rizal", units: 3.0, grade: 1.10, remark: "Passed", take1: "1.10 (24-2)" },
        { code: "PE 4E", name: "Physical Activities Toward Health and Fitness", units: 2.0, grade: 1.40, remark: "Passed", take1: "1.40 (24-2)" },
      ],
    },
    {
      year: "3rd Year, 1st Semester",
      courses: [
        { code: "CGCS 106", name: "Application Development and Emerging Technologies", units: 3.0, grade: 1.70, remark: "Passed", take1: "1.70 (25-1)" },
        { code: "CS 317", name: "Automata Theory and Formal Languages", units: 3.0, grade: 1.50, remark: "Passed", take1: "1.50 (25-1)" },
        { code: "CS 318", name: "Architecture and Organization", units: 3.0, grade: 1.25, remark: "Passed", take1: "1.25 (25-1)" },
        { code: "CS 319", name: "Information Assurance and Security", units: 3.0, grade: null, remark: null, take1: null, highlighted: true },
        { code: "CS 3110", name: "Software Engineering 1", units: 3.0, grade: 1.40, remark: "Passed", take1: "1.40 (25-1)" },
        { code: "CSAC 3211", name: "Methods Of Research", units: 3.0, grade: 1.70, remark: "Passed", take1: "1.70 (25-1)" },
        { code: "CSAC 317", name: "Digital Forensics", units: 3.0, grade: 1.50, remark: "Passed", take1: "1.50 (25-1)" },
        { code: "CSAC 3210", name: "English Proficiency Program", units: 1.0, grade: 1.40, remark: "Passed", take1: "1.40 (25-1)" },
        { code: "GE 5", name: "Purposive Communication", units: 3.0, grade: 1.30, remark: "Passed", take1: "1.30 (25-1)" },
      ],
    },
    {
      year: "3rd Year, 2nd Semester",
      courses: [
        { code: "CS 3212", name: "Programming Languages", units: 3.0, grade: null, remark: null, take1: "(25-2)", highlighted: true },
        { code: "CS 3213", name: "Software Engineering 2", units: 3.0, grade: null, remark: null, take1: "(25-2)", highlighted: true },
        { code: "CS 3214", name: "Computer Science Thesis 1", units: 3.0, grade: null, remark: null, take1: "(25-2)", highlighted: true },
        { code: "CS 3215", name: "Human Computer Interaction", units: 3.0, grade: null, remark: null, take1: "(25-2)", highlighted: true },
        { code: "GE ELECT 7", name: "Indigenous Creative Crafts", units: 3.0, grade: null, remark: null, take1: "(25-2)", highlighted: true },
        { code: "GE ELECT 8", name: "Reading Visual Art", units: 3.0, grade: null, remark: null, take1: "(25-2)", highlighted: true },
        { code: "CSEC 3", name: "Cloud Computing", units: 3.0, grade: null, remark: null, take1: "(25-2)", highlighted: true },
        { code: "CSEC 6", name: "Natural Language Processing", units: 3.0, grade: null, remark: null, take1: "(25-2)", highlighted: true },
      ],
    },
    {
      year: "4th Year, 1st Semester",
      courses: [
        { code: "CS 4116", name: "Social Issues & Professional Practice 1", units: 3.0, grade: null, remark: "Pre-req.", prereq: "CS 3213", isRed: true },
        { code: "CS 4117", name: "Computer Science Thesis 2", units: 3.0, grade: null, remark: "Pre-req.", prereq: "CS 3214", isRed: true },
      ],
    },
    {
      year: "4th Year, 2nd Semester",
      courses: [
        { code: "CS 4218", name: "OJT Training/Practicum (162 Hrs)", units: 3.0, grade: null, remark: null, take1: "(25-2)", highlighted: true },
      ],
    },
  ],
};

// ─── Notifications ────────────────────────────────────────────────────────────

export const mockNotifications = [
  {
    id: 1,
    type: "info",
    title: "Enrollment is now open",
    body: "2nd Semester 2025-2026 enrollment runs May 5–16. Complete your pre-enlistment first.",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Unpaid balance detected",
    body: "You have an outstanding balance of ₱4,200.00 for this semester. Settle before May 31.",
    time: "2 hrs ago",
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "Grade posted: CS 318",
    body: "Architecture and Organization — Final grade: 1.25. Check your full grades in Reports.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    type: "info",
    title: "Teacher evaluation open",
    body: "Faculty evaluation for 1st Semester 2025-2026 is now available until May 10.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "warning",
    title: "Pre-requisite not met",
    body: "CS 4116 requires CS 3213 to be completed first. Contact your department for guidance.",
    time: "3 days ago",
    read: true,
  },
];