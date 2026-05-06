import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import Assessment from "./Assessment";
import ViewStudentProfile from "./ViewStudentProfile";
import EditStudentProfile from "./EditStudentProfile";
import PreEnlistment from "./PreEnlistment";
import Enrollment from "./Enrollment";
import AddDropSubject from "./AddDropSubject";
import AmountDue from "./AmountDue";
import GetTransactionNumber from "./GetTransactionNumber";
import Payment from "./Payment";
import FailedSubjectsPayment from "./FailedSubjectsPayment";
import Grades from "./Reports/Grades";
import StatementOfAccount from "./Reports/StatementOfAccount";
import TranscriptOfRecords from "./Reports/TranscriptOfRecords";
import GuideTour from "../components/GuideTour";

const WavingHandIcon = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes wave {
        0%,100% { transform: rotate(-8deg); }
        25%      { transform: rotate(12deg); }
        50%      { transform: rotate(-4deg); }
        75%      { transform: rotate(10deg); }
      }
      .waving-hand { animation: wave 1.6s ease-in-out infinite; transform-origin: 70% 80%; }
    `}</style>
    <g className="waving-hand">
      {/* Palm */}
      <rect x="28" y="38" width="34" height="36" rx="10" fill="none"
        stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Thumb */}
      <path d="M28 50 C20 48 18 36 26 35 C30 34 32 38 32 42"
        fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
      {/* Fingers */}
      <line x1="36" y1="38" x2="36" y2="24" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
      <line x1="44" y1="38" x2="44" y2="21" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
      <line x1="52" y1="38" x2="52" y2="24" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
      <line x1="58" y1="40" x2="60" y2="28" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
    </g>
    {/* Motion lines */}
    <path d="M68 30 Q74 26 72 20" stroke="var(--primary)" strokeWidth="2.5"
      strokeLinecap="round" opacity="0.35" />
    <path d="M72 40 Q80 36 80 28" stroke="var(--primary)" strokeWidth="2.5"
      strokeLinecap="round" opacity="0.2" />
    <path d="M66 20 Q70 14 66 10" stroke="var(--primary)" strokeWidth="2"
      strokeLinecap="round" opacity="0.15" />
  </svg>
);

export default function StudentDashboard({ user, onLogout }) {
  const firstName = user?.name?.split(" ")[0] || "Student";
  const [activePage, setActivePage] = useState(null);
  const [showGuide, setShowGuide] = useState(user?.firstLogin ?? true);

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  const handleBack = () => {
    setActivePage(null);
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} activePage={activePage} onNavigate={handleNavigate} onShowGuide={setShowGuide}>
      <style>{`
        @keyframes welcomeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .welcome-content { animation: welcomeIn 0.5s ease both 0.2s; opacity: 0; animation-fill-mode: forwards; }
      `}</style>
      {activePage === "Assessment" ? (
        <Assessment user={user} onBack={handleBack} />
      ) : activePage === "Pre-enlistment" ? (
        <PreEnlistment onBack={handleBack} />
      ) : activePage === "Enrollment" ? (
        <Enrollment onBack={handleBack} />
      ) : activePage === "Add / Drop Subject" ? (
        <AddDropSubject onBack={handleBack} />
      ) : activePage === "View Student Profile" ? (
        <ViewStudentProfile user={user} onBack={handleBack} />
      ) : activePage === "Edit Student Profile" ? (
        <EditStudentProfile user={user} onBack={handleBack} />
      ) : activePage === "Amount Due" ? (
        <AmountDue onBack={handleBack} />
      ) : activePage === "Get Transaction Number" ? (
        <GetTransactionNumber onBack={handleBack} />
      ) : activePage === "Payment" ? (
        <Payment onBack={handleBack} />
      ) : activePage === "Failed Subjects Payment" ? (
        <FailedSubjectsPayment onBack={handleBack} />
      ) : activePage === "Grades" ? (
        <Grades onBack={handleBack} />
      ) : activePage === "Statement of Account" ? (
        <StatementOfAccount onBack={handleBack} />
      ) : activePage === "Transcript of Records" ? (
        <TranscriptOfRecords onBack={handleBack} />
      ) : (
        <div style={styles.wrapper} className="welcome-content">
          <WavingHandIcon />
          <div style={styles.textBlock}>
            <h2 style={styles.greeting}>Welcome back, {firstName}!</h2>
            <p style={styles.sub}>
              Select a transaction or report from the sidebar to get started.
            </p>
          </div>
        </div>
      )}

      {/* Guide Tour */}
      {showGuide && <GuideTour onFinish={() => setShowGuide(false)} />}
    </DashboardLayout>
  );
}

const styles = {
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    textAlign: "center",
    minHeight: "100%",
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  greeting: {
    fontSize: "clamp(20px, 3vw, 26px)",
    fontFamily: "'DM Serif Display', serif",
    color: "var(--text-primary)",
    margin: 0,
    transition: "color 0.25s",
  },
  sub: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    margin: 0,
    transition: "color 0.25s",
  },
};
