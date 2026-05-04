import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import RoleSelection from "./pages/RoleSelection";
import StudentLogin from "./pages/StudentLogin";
import "./App.css";

function Router() {
  const [page, setPage] = useState("role-selection");

  if (page === "student-login") {
    return <StudentLogin onBack={() => setPage("role-selection")} />;
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
