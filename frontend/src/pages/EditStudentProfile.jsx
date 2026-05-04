import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function EditStudentProfile({ user, onBack }) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    course: "BSCS",
    level: "College",
    dept: "CCS",
    curriculum: "BSCS 2023",
    yearLevel: "3",
    learnerRef: "40372915296",
    entryPeriod: "23-1",
    entryDate: "Jun 20, 2023",
    examScore: "97",
    nstpNo: "C-05-395352-24",
    prefModality: "Face to Face",
    campus: "",
    type: "Regular",
    sectionNo: "0",
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
    setHasChanges(false);
  };

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
        @keyframes slideInSuccess {
          0% { opacity: 0; transform: translateY(-20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        
        .save-message {
          animation: slideInSuccess 3s ease both;
        }
      `}</style>

      {/* Success Message */}
      {showSaveMessage && (
        <div style={styles.successMessage} className="save-message">
          <CheckIcon />
          <span>Profile updated successfully</span>
        </div>
      )}

      {/* Header */}
      <div style={styles.header} className="profile-header">
        <button onClick={onBack} style={styles.backBtn}>
          <BackIcon />
          <span>Go back</span>
        </button>
        <h1 style={styles.title}>Edit Student Profile</h1>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Enrollment Data Section */}
        <div style={styles.section} className="profile-section">
          <h2 style={styles.sectionTitle}>Enrollment Data</h2>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Course</label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => handleChange("course", e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Level</label>
              <input
                type="text"
                value={formData.level}
                onChange={(e) => handleChange("level", e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Dept</label>
              <input
                type="text"
                value={formData.dept}
                onChange={(e) => handleChange("dept", e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Curriculum</label>
              <input
                type="text"
                value={formData.curriculum}
                onChange={(e) => handleChange("curriculum", e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Year Level</label>
              <input
                type="text"
                value={formData.yearLevel}
                onChange={(e) => handleChange("yearLevel", e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Learner Ref. No</label>
              <input
                type="text"
                value={formData.learnerRef}
                onChange={(e) => handleChange("learnerRef", e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Entry Period</label>
              <input
                type="text"
                value={formData.entryPeriod}
                onChange={(e) => handleChange("entryPeriod", e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Entry Date</label>
              <input
                type="text"
                value={formData.entryDate}
                onChange={(e) => handleChange("entryDate", e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Exam Score</label>
              <input
                type="text"
                value={formData.examScore}
                onChange={(e) => handleChange("examScore", e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.divider} />

          <h3 style={styles.subTitle}>Entry Data</h3>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>NSTP No</label>
              <input
                type="text"
                value={formData.nstpNo}
                onChange={(e) => handleChange("nstpNo", e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Pref. Modality</label>
              <input
                type="text"
                value={formData.prefModality}
                onChange={(e) => handleChange("prefModality", e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Campus</label>
              <input
                type="text"
                value={formData.campus}
                onChange={(e) => handleChange("campus", e.target.value)}
                style={styles.input}
                placeholder="Leave empty if not applicable"
              />
            </div>
          </div>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Section No</label>
              <input
                type="text"
                value={formData.sectionNo}
                onChange={(e) => handleChange("sectionNo", e.target.value)}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={styles.actionBar}>
          <button
            onClick={handleSave}
            style={{
              ...styles.saveBtn,
              ...(hasChanges ? {} : styles.saveBtnDisabled),
            }}
            disabled={!hasChanges}
          >
            <CheckIcon />
            <span>Save Changes</span>
          </button>
          {hasChanges && (
            <p style={styles.changesIndicator}>You have unsaved changes</p>
          )}
        </div>
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
  input: {
    padding: "10px 12px",
    fontSize: "14px",
    fontFamily: "'Source Sans 3', sans-serif",
    border: "1.5px solid var(--border-light)",
    borderRadius: "8px",
    background: "var(--bg-input)",
    color: "var(--text-primary)",
    transition: "all 0.2s",
    outline: "none",
  },
  divider: {
    height: "1px",
    background: "var(--border-light)",
    margin: "16px 0",
    transition: "background 0.25s",
  },
  actionBar: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px",
    background: "var(--bg-surface)",
    border: "1.5px solid var(--border-light)",
    borderRadius: "12px",
    position: "sticky",
    bottom: "0",
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 24px",
    fontSize: "13px",
    fontWeight: 700,
    fontFamily: "'Source Sans 3', sans-serif",
    border: "none",
    borderRadius: "8px",
    background: "var(--primary)",
    color: "var(--primary-text)",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  saveBtnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  changesIndicator: {
    fontSize: "12px",
    color: "var(--text-secondary)",
    margin: 0,
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },
  successMessage: {
    position: "fixed",
    top: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: "#10b981",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
    zIndex: 1000,
    fontFamily: "'Source Sans 3', sans-serif",
  },
};
