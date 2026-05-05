import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import PageHeader from "../components/PageHeader";
import SectionHeader from "../components/SectionHeader";
import Card from "../components/Card";
import Button from "../components/Button";

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

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
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
    campus: "Main Campus",
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
        
        .profile-container { animation: fadeIn 0.3s ease; }
        .profile-header { animation: slideDown 0.3s ease; }
        .profile-card { animation: slideDown 0.3s ease both; }
        .save-message { animation: slideInSuccess 3s ease both; }
        
        input:focus {
          outline: none !important;
          border-color: var(--primary) !important;
          background: var(--bg-input) !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
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
      <PageHeader 
        title="Edit Student Profile"
        subtitle="Update your academic enrollment information"
        onBack={onBack}
        className="profile-header"
      />

      {/* Main Content */}
      <div style={styles.content} className="profile-container">
        {/* Changes Indicator */}
        {hasChanges && (
          <Card className="profile-card" style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "rgba(220, 38, 38, 0.08)", border: "1.5px solid rgba(220, 38, 38, 0.3)" }}>
            <AlertIcon />
            <span style={{ color: "#dc2626", fontWeight: 600 }}>You have unsaved changes</span>
          </Card>
        )}

        {/* Main Section - Enrollment Data */}
        <Card className="profile-card">
          <SectionHeader
            title="Enrollment Information"
            subtitle="Edit your academic and enrollment details"
          />

          <div style={styles.fieldsContainer}>
            {/* Row 1 */}
            <div style={styles.fieldsRow}>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Course</label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => handleChange("course", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Level</label>
                <input
                  type="text"
                  value={formData.level}
                  onChange={(e) => handleChange("level", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Department</label>
                <input
                  type="text"
                  value={formData.dept}
                  onChange={(e) => handleChange("dept", e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div style={styles.fieldsRow}>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Curriculum</label>
                <input
                  type="text"
                  value={formData.curriculum}
                  onChange={(e) => handleChange("curriculum", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Year Level</label>
                <input
                  type="text"
                  value={formData.yearLevel}
                  onChange={(e) => handleChange("yearLevel", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Learner Ref. No</label>
                <input
                  type="text"
                  value={formData.learnerRef}
                  onChange={(e) => handleChange("learnerRef", e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div style={styles.fieldsRow}>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Entry Period</label>
                <input
                  type="text"
                  value={formData.entryPeriod}
                  onChange={(e) => handleChange("entryPeriod", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Entry Date</label>
                <input
                  type="text"
                  value={formData.entryDate}
                  onChange={(e) => handleChange("entryDate", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.fieldBlock}>
                <label style={styles.label}>Exam Score</label>
                <input
                  type="text"
                  value={formData.examScore}
                  onChange={(e) => handleChange("examScore", e.target.value)}
                  style={styles.input}
                />
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
                  <input
                    type="text"
                    value={formData.nstpNo}
                    onChange={(e) => handleChange("nstpNo", e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fieldBlock}>
                  <label style={styles.label}>Preferred Modality</label>
                  <input
                    type="text"
                    value={formData.prefModality}
                    onChange={(e) => handleChange("prefModality", e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fieldBlock}>
                  <label style={styles.label}>Campus</label>
                  <input
                    type="text"
                    value={formData.campus}
                    onChange={(e) => handleChange("campus", e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.fieldsRow}>
                <div style={styles.fieldBlock}>
                  <label style={styles.label}>Student Type</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fieldBlock}>
                  <label style={styles.label}>Section Number</label>
                  <input
                    type="text"
                    value={formData.sectionNo}
                    onChange={(e) => handleChange("sectionNo", e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Save Button Section */}
        <div style={styles.actionBar}>
          <Button
            variant={hasChanges ? "primary" : "secondary"}
            size="md"
            onClick={handleSave}
            disabled={!hasChanges}
            title={hasChanges ? "Save your changes" : "No changes to save"}
          >
            <CheckIcon />
            <span>Save Changes</span>
          </Button>
        </div>
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
  changesAlert: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    background: "rgba(59, 130, 246, 0.05)",
    border: "1.5px solid rgba(59, 130, 246, 0.2)",
    borderRadius: "10px",
    color: "var(--primary)",
    fontSize: "13px",
    fontWeight: 600,
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
  input: {
    padding: "10px 12px",
    fontSize: "14px",
    fontFamily: "'Source Sans 3', sans-serif",
    border: "1.5px solid var(--border-light)",
    borderRadius: "8px",
    background: "var(--bg-input)",
    color: "var(--text-primary)",
    transition: "all 0.2s",
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
    padding: "11px 24px",
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
