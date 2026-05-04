import { useTheme } from "../context/ThemeContext";

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function ViewStudentProfile({ user, onBack }) {
  const { isDark } = useTheme();

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@400;600;700&display=swap');
        
        .profile-section { animation: slideDown 0.3s ease both; }
        .profile-header { animation: fadeIn 0.3s ease; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={styles.header} className="profile-header">
        <button onClick={onBack} style={styles.backBtn}>
          <BackIcon />
          <span>Go back</span>
        </button>
        <h1 style={styles.title}>Student Profile</h1>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Enrollment Data Section */}
        <div style={styles.section} className="profile-section">
          <h2 style={styles.sectionTitle}>Enrollment Data</h2>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Course</label>
              <div style={styles.value}>BSCS</div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Level</label>
              <div style={styles.value}>College</div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Dept</label>
              <div style={styles.value}>CCS</div>
            </div>
          </div>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Curriculum</label>
              <div style={styles.value}>BSCS 2023</div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Year Level</label>
              <div style={styles.value}>3</div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Learner Ref. No</label>
              <div style={styles.value}>40372915296</div>
            </div>
          </div>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Entry Period</label>
              <div style={styles.value}>23-1</div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Entry Date</label>
              <div style={styles.value}>Jun 20, 2023</div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Exam Score</label>
              <div style={styles.value}>97</div>
            </div>
          </div>

          <div style={styles.divider} />

          <h3 style={styles.subTitle}>Entry Data</h3>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>NSTP No</label>
              <div style={styles.value}>C-05-395352-24</div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Pref. Modality</label>
              <div style={styles.value}>Face to Face</div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Campus</label>
              <div style={styles.value}>-</div>
            </div>
          </div>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Type</label>
              <div style={styles.valueGroup}>
                <span style={styles.badge}>New Student</span>
                <span style={styles.badge}>Regular</span>
              </div>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Section No</label>
              <div style={styles.value}>0</div>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        {[
          { title: "Personal Information" },
          { title: "Addresses & Contacts" },
          { title: "Family Background" },
          { title: "Educational Background" },
          { title: "Religious Background" },
          { title: "Medical Information" },
          { title: "Employment Records" },
        ].map((section) => (
          <div key={section.title} style={styles.section} className="profile-section">
            <button style={styles.collapsibleBtn}>
              <ChevronIcon />
              <span>{section.title}</span>
            </button>
            <p style={styles.emptyState}>No data available</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    animation: "fadeIn 0.3s ease",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
    paddingBottom: "16px",
    borderBottom: "1.5px solid var(--border-light)",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "transparent",
    border: "1.5px solid var(--border-light)",
    borderRadius: "8px",
    padding: "8px 12px",
    color: "var(--text-secondary)",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    transition: "all 0.2s",
    fontFamily: "'Source Sans 3', sans-serif",
  },
  title: {
    fontSize: "24px",
    fontFamily: "'DM Serif Display', serif",
    color: "var(--text-primary)",
    margin: 0,
    transition: "color 0.25s",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  section: {
    background: "var(--bg-surface)",
    border: "1.5px solid var(--border-light)",
    borderRadius: "12px",
    padding: "20px",
    transition: "all 0.25s",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--text-primary)",
    margin: "0 0 16px 0",
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },
  subTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "var(--text-secondary)",
    margin: "16px 0 12px 0",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "12px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },
  value: {
    fontSize: "14px",
    color: "var(--text-primary)",
    fontWeight: 500,
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },
  valueGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    background: "var(--bg-input)",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--text-secondary)",
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "all 0.25s",
  },
  divider: {
    height: "1px",
    background: "var(--border-light)",
    margin: "16px 0",
    transition: "background 0.25s",
  },
  collapsibleBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "transparent",
    border: "none",
    padding: "0",
    fontSize: "14px",
    fontWeight: 700,
    color: "var(--text-primary)",
    cursor: "pointer",
    transition: "color 0.2s",
    fontFamily: "'Source Sans 3', sans-serif",
    textAlign: "left",
  },
  emptyState: {
    fontSize: "13px",
    color: "var(--text-placeholder)",
    margin: "12px 0 0 0",
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },
};
