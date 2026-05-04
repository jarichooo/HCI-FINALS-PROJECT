import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import RoleSelection from "./pages/RoleSelection";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import "./App.css";

function Router() {
  const [page, setPage] = useState("role-selection");
  const [currentUser, setCurrentUser] = useState(null);

  if (page === "student-login") {
    return (
      <StudentLogin
        onBack={() => setPage("role-selection")}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setPage("student-dashboard");
        }}
      />
    );
  }

  if (page === "student-dashboard") {
    return (
      <StudentDashboard
        user={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          setPage("role-selection");
        }}
      />
    );
  }

  return <RoleSelection onSelectRole={(role) => {
    if (role === "student") setPage("student-login");
  }} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}