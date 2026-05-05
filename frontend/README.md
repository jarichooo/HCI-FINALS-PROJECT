# EduCore — A Redesign of CSPC SIAS Online

EduCore is a student information and academic services portal designed as a redesign prototype of the CSPC SIAS Online system. The goal is to address the usability and navigation issues of the current system by providing a more intuitive, accessible, and user-centered experience for CSPC students.

---

## Why EduCore?

The original SIAS Online system has several pain points that make it difficult for students to navigate and use effectively. EduCore was built to directly address these issues.

| Issue (SIAS Online) | Fix (EduCore) |
|---|---|
| No option to view login credentials | Password visibility toggle on login |
| Blank dashboard after login | Welcoming dashboard with navigation hints |
| No confirmation dialogs | Logout and action confirmation modals |
| No onboarding for new users | Onboarding modal on first login |
| No push notifications | Notification system for deadlines and updates |
| No back buttons between pages | Back navigation available throughout |
| Broken support button | Functional Contact Support modal |
| No theme options | Light/Dark mode toggle |

---

## Features

- **Student Login** — Secure login with password visibility toggle and error feedback
- **Role Selection** — Choose between student and other roles on entry
- **Dashboard** — Welcoming home screen with sidebar navigation
- **Transactions** — Access pre-enlistment, enrollment, add/drop, assessment, payment, and more
- **Reports** — View grade, enrollment, and assessment reports
- **Notifications** — Push-down alerts for deadlines and enrollment status
- **Settings** — Change password, access help, and contact support
- **Theme Toggle** — Switch between light and dark mode

---

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Inline styles with CSS variables for theming
- **State Management:** React useState (no backend — prototype only)
- **Mock Data:** Hardcoded credentials via `mockData.js`

---

## Getting Started

```bash
# Clone the repo
git clone <repo-url>
cd <project-folder>

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Test Credentials
| Student ID | Password |
|---|---|
| 2021-00001 | password123 |

```
frontend/
└── src/
    ├── pages/
    │   ├── RoleSelection.jsx
    │   ├── StudentLogin.jsx
    │   └── StudentDashboard.jsx
    ├── components/
    │   ├── Layout.jsx
    │   └── FormCard.jsx
    ├── context/
    │   └── ThemeContext.jsx
    ├── data/
    │   └── mockData.js
    └── App.jsx
```

## Group 3 — BSCS-3A

- Alba, John Raymond S.
- Barja, Joshua Jericho DL.
- Moico, Mary Joyce N.
- Muit, Ivy Pauline B.

*CS 3215 - Human Computer Interaction | Camarines Sur Polytechnic Colleges*
