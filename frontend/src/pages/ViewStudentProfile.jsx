import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function ViewStudentProfile({ user, onBack }) {
  const { isDark } = useTheme();
  const [expandedSections, setExpandedSections] = useState({
    personal: false,
    addresses: false,
    family: false,
    education: false,
    religious: false,
    medical: false,
    employment: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@400;600;700&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .profile-container { animation: fadeIn 0.3s ease; }
        .profile-header { animation: slideDown 0.3s ease; }
        .profile-card { animation: slideDown 0.3s ease both; }
        
        .collapsible-btn {
          transition: background 0.2s;
        }
        .collapsible-btn:hover { background: var(--bg-input); }
      `}</style>

      {/* Header */}
      <div style={styles.header} className="profile-header">
        <button onClick={onBack} style={styles.backBtn} title="Go back">
          <BackIcon />
          <span>Back</span>
        </button>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Student Profile</h1>
          <p style={styles.subtitle}>View your academic enrollment information</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content} className="profile-container">
        {/* Quick Info Cards */}
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <div style={styles.infoCardIcon}>
              <BookIcon />
            </div>
            <div style={styles.infoCardContent}>
              <p style={styles.infoCardLabel}>Course</p>
              <p style={styles.infoCardValue}>BSCS</p>
            </div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.infoCardIcon}>
              <UserIcon />
            </div>
            <div style={styles.infoCardContent}>
              <p style={styles.infoCardLabel}>Year Level</p>
              <p style={styles.infoCardValue}>3rd Year</p>
            </div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.infoCardIcon}>
              <BookIcon />
            </div>
            <div style={styles.infoCardContent}>
              <p style={styles.infoCardLabel}>Status</p>
              <p style={styles.infoCardValue}>Regular</p>
            </div>
          </div>
        </div>

        {/* Main Section - Enrollment Data */}
        <div style={styles.section} className="profile-card">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Enrollment Information</h2>
            <p style={styles.sectionDesc}>Your current academic and enrollment details</p>
          </div>

          <div style={styles.fieldsContainer}>
            {/* Row 1 */}
            <div style={styles.fieldsRow}>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Course</label>
                <p style={styles.displayValue}>BSCS</p>
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Level</label>
                <p style={styles.displayValue}>College</p>
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Department</label>
                <p style={styles.displayValue}>CCS</p>
              </div>
            </div>

            {/* Row 2 */}
            <div style={styles.fieldsRow}>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Curriculum</label>
                <p style={styles.displayValue}>BSCS 2023</p>
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Year Level</label>
                <p style={styles.displayValue}>3</p>
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Learner Ref. No</label>
                <p style={styles.displayValue}>40372915296</p>
              </div>
            </div>

            {/* Row 3 */}
            <div style={styles.fieldsRow}>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Entry Period</label>
                <p style={styles.displayValue}>23-1</p>
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Entry Date</label>
                <p style={styles.displayValue}>Jun 20, 2023</p>
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Exam Score</label>
                <p style={styles.displayValue}>97</p>
              </div>
            </div>
          </div>

          {/* Entry Data Subsection */}
          <div style={styles.subsection}>
            <h3 style={styles.subTitle}>Entry Details</h3>
            <div style={styles.fieldsContainer}>
              <div style={styles.fieldsRow}>
                <div style={styles.fieldBlock}>
                  <label style={styles.label}>NSTP No</label>
                  <p style={styles.displayValue}>C-05-395352-24</p>
                </div>
                <div style={styles.fieldBlock}>
                  <label style={styles.label}>Preferred Modality</label>
                  <p style={styles.displayValue}>Face to Face</p>
                </div>
                <div style={styles.fieldBlock}>
                  <label style={styles.label}>Campus</label>
                  <p style={styles.displayValue}>Main Campus</p>
                </div>
              </div>

              <div style={styles.fieldsRow}>
                <div style={styles.fieldBlock}>
                  <label style={styles.label}>Student Type</label>
                  <p style={styles.displayValue}>Regular</p>
                </div>
                <div style={styles.fieldBlock}>
                  <label style={styles.label}>Section Number</label>
                  <p style={styles.displayValue}>0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        {[
          { id: "personal", title: "Personal Information" },
          { id: "addresses", title: "Addresses" },
          { id: "family", title: "Family Background" },
          { id: "education", title: "Education History" },
          { id: "religious", title: "Religious Information" },
          { id: "medical", title: "Medical Information" },
          { id: "employment", title: "Employment Information" },
        ].map((section) => (
          <div key={section.id} style={styles.section} className="profile-card">
            <button
              onClick={() => toggleSection(section.id)}
              style={styles.collapsibleBtn}
              className="collapsible-btn"
            >
              <span style={styles.collapsibleTitle}>{section.title}</span>
              <ChevronIcon isOpen={expandedSections[section.id]} />
            </button>

            {expandedSections[section.id] && (
              <div style={styles.collapsibleContent}>
                <p style={styles.placeholderText}>
                  Additional information for {section.title.toLowerCase()} will be displayed here.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    animation: "fadeIn 0.3s ease",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "2px solid var(--border-light)",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "var(--bg-input)",
    border: "1.5px solid var(--border-light)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "var(--text-secondary)",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    transition: "all 0.2s",
    fontFamily: "'Source Sans 3', sans-serif",
    minWidth: "fit-content",
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: "28px",
    fontFamily: "'DM Serif Display', serif",
    color: "var(--text-primary)",
    margin: "0 0 4px 0",
    transition: "color 0.25s",
    fontWeight: 700,
  },
  subtitle: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    margin: 0,
    transition: "color 0.25s",
    fontFamily: "'Source Sans 3', sans-serif",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  infoCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    background: "var(--bg-surface)",
    border: "1.5px solid var(--border-light)",
    borderRadius: "10px",
    transition: "all 0.25s",
  },
  infoCardIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    background: "rgba(59, 130, 246, 0.1)",
    color: "var(--primary)",
    flexShrink: 0,
  },
  infoCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  infoCardLabel: {
    fontSize: "11px",
    fontWeight: 700,
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    margin: 0,
    fontFamily: "'Source Sans 3', sans-serif",
  },
  infoCardValue: {
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--text-primary)",
    margin: 0,
    fontFamily: "'Source Sans 3', sans-serif",
  },
  section: {
    background: "var(--bg-surface)",
    border: "1.5px solid var(--border-light)",
    borderRadius: "12px",
    padding: "28px",
    transition: "all 0.25s",
  },
  sectionHeader: {
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1.5px solid var(--border-light)",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "var(--text-primary)",
    margin: "0 0 6px 0",
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },
  sectionDesc: {
    fontSize: "12px",
    color: "var(--text-secondary)",
    margin: 0,
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  fieldBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "11px",
    fontWeight: 700,
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },
  displayValue: {
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--text-primary)",
    margin: 0,
    fontFamily: "'Source Sans 3', sans-serif",
  },
  subsection: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1.5px solid var(--border-light)",
  },
  subTitle: {
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--text-secondary)",
    margin: "0 0 16px 0",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },
  collapsibleBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 0",
    background: "transparent",
    border: "none",
    color: "var(--text-primary)",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "all 0.2s",
  },
  collapsibleTitle: {
    textAlign: "left",
  },
  collapsibleContent: {
    paddingTop: "12px",
    borderTop: "1.5px solid var(--border-light)",
  },
  placeholderText: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    margin: 0,
    fontFamily: "'Source Sans 3', sans-serif",
    fontStyle: "italic",
  },
};
