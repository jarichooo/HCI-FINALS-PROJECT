// Guide modal tour steps for first-time users.
// Each step targets a named anchor (data-guide attribute) on the dashboard.

export const guideSteps = [
  {
    id: "profile",
    title: "Your Profile",
    description:
      "Click your name and photo here to manage your account details and profile settings.",
    position: "bottom-left",
  },
  {
    id: "tabs",
    title: "Transactions & Reports",
    description:
      "Switch between Transactions (enrollment forms, assessment, etc.) and Reports (your academic data) using these tabs.",
    position: "bottom-right",
  },
  {
    id: "sidebar",
    title: "Navigation Menu",
    description:
      "Access all key student features here — Pre-enlistment, Enrollment, Assessment, Payment, and more.",
    position: "right",
  },
  {
    id: "topbar-actions",
    title: "Settings & Logout",
    description:
      "Use the gear icon to open Settings (Change Password, Help, Support) and the arrow icon to log out.",
    position: "bottom-left",
  },
];
