import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { mockCurriculum } from "../../data/mockData";

// ─── Icons ────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function Grades({ onBack }) {
  const { isDark } = useTheme();
  const [expandedYear, setExpandedYear] = useState(null);

  const theme = {
    bgPage: isDark ? "#0d1b36" : "#eef2fb",
    bgSurface: isDark ? "#162044" : "#ffffff",
    bgSecondary: isDark ? "#1c2a52" : "#f9faff",
    bgInput: isDark ? "#1c2a52" : "#f7f9ff",
    bgHover: isDark ? "#222e52" : "#f3f5fa",
    textPrimary: isDark ? "#e8eeff" : "#0d2f6e",
    textSecondary: isDark ? "#7a99cc" : "#5a72a0",
    borderLight: isDark ? "#243560" : "#dce8f8",
    primary: isDark ? "#4a72cc" : "#0d2f6e",
    primaryLight: isDark ? "#5a82dc" : "#1a3d8f",
    shadowCard: isDark ? "rgba(0,0,0,0.35)" : "rgba(13,47,110,0.08)",
  };

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <div style={styles(theme).container}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .grades-page { animation: slideIn 0.3s ease both; }

        .year-section { transition: all 0.3s ease; }
        .course-row { transition: background-color 0.2s ease; }
        .course-row:hover { background-color: ${theme.bgHover} !important; }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .grade-cell {
          text-align: center;
          font-weight: 600;
          color: ${theme.textPrimary};
        }

        .prerequisite {
          padding: 4px 8px;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 600;
        }

        .highlighted-row {
          background-color: ${isDark ? "rgba(234, 179, 8, 0.1)" : "rgba(251, 191, 36, 0.08)"} !important;
        }

        .red-highlighted-row {
          background-color: ${isDark ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.08)"} !important;
        }
      `}</style>

      <div className="grades-page">
        {/* Header */}
        <div style={styles(theme).header}>
          <button
            onClick={onBack}
            style={styles(theme).backBtn}
            onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            <BackIcon />
          </button>
          <div>
            <h1 style={styles(theme).title}>Curriculum Evaluation</h1>
            <p style={styles(theme).subtitle}>View your grades and academic progress</p>
          </div>
        </div>

        {/* Curriculum Info Card */}
        <div style={styles(theme).infoCard}>
          <div>
            <div style={styles(theme).infoLabel}>Curriculum</div>
            <div style={styles(theme).infoValue}>{mockCurriculum.curriculum}</div>
          </div>
          <div>
            <div style={styles(theme).infoLabel}>Status</div>
            <div style={styles(theme).statusBadgeContainer}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: theme.primary }}>
                {mockCurriculum.status}
              </span>
            </div>
          </div>
        </div>

        {/* Grades by Year */}
        <div style={styles(theme).gradesContainer}>
          {mockCurriculum.grades.map((yearData, idx) => (
            <div key={idx} className="year-section" style={styles(theme).yearSection}>
              {/* Year Header - Collapsible */}
              <button
                onClick={() => toggleYear(idx)}
                style={styles(theme).yearHeader}
                onMouseEnter={(e) => (e.style.backgroundColor = theme.bgHover)}
                onMouseLeave={(e) => (e.style.backgroundColor = theme.bgSecondary)}
              >
                <span style={{ fontSize: "15px", fontWeight: 700, color: theme.primary }}>
                  {yearData.year}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transition: "transform 0.3s ease",
                    transform: expandedYear === idx ? "rotate(180deg)" : "rotate(0deg)",
                    color: theme.primary,
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Courses Table */}
              {expandedYear === idx && (
                <div style={styles(theme).tableWrapper}>
                  <table style={styles(theme).table}>
                    <thead>
                      <tr style={styles(theme).tableHeader}>
                        <th style={styles(theme).thCode}>Code</th>
                        <th style={styles(theme).thName}>Name</th>
                        <th style={styles(theme).thUnits}>Units</th>
                        <th style={styles(theme).thGrade}>Grade</th>
                        <th style={styles(theme).thRemark}>Remark</th>
                        <th style={styles(theme).thTake}>Take 1</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearData.courses.map((course, cIdx) => (
                        <tr
                          key={cIdx}
                          className={`course-row ${course.highlighted ? "highlighted-row" : ""} ${course.isRed ? "red-highlighted-row" : ""}`}
                          style={styles(theme).tableRow}
                        >
                          <td style={styles(theme).td}>
                            <span style={{ fontWeight: 600, color: theme.textPrimary }}>
                              {course.code}
                            </span>
                          </td>
                          <td style={styles(theme).td}>
                            <span style={{ color: theme.textPrimary }}>{course.name}</span>
                          </td>
                          <td style={{ ...styles(theme).td, textAlign: "center" }}>
                            <span style={{ color: theme.textSecondary }}>{course.units.toFixed(1)}</span>
                          </td>
                          <td style={styles(theme).td}>
                            {course.grade ? (
                              <span className="grade-cell">{course.grade.toFixed(2)}</span>
                            ) : (
                              <span style={{ color: theme.textSecondary }}>—</span>
                            )}
                          </td>
                          <td style={styles(theme).td}>
                            {course.remark ? (
                              <span style={styles(theme).statusBadge}>{course.remark}</span>
                            ) : course.prereq ? (
                              <span className="prerequisite">{course.remark || "Pre-req."}</span>
                            ) : (
                              <span style={{ color: theme.textSecondary }}>—</span>
                            )}
                          </td>
                          <td style={styles(theme).td}>
                            <span style={{ color: theme.textSecondary }}>
                              {course.take1 || "—"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div style={styles(theme).summaryCard}>
          <div style={styles(theme).statItem}>
            <span style={styles(theme).statLabel}>Total Units Completed</span>
            <span style={styles(theme).statValue}>
              {mockCurriculum.grades
                .reduce((sum, year) => sum + year.courses.filter((c) => c.remark === "Passed").length * 3, 0)}
            </span>
          </div>
          <div style={styles(theme).divider}></div>
          <div style={styles(theme).statItem}>
            <span style={styles(theme).statLabel}>Courses Passed</span>
            <span style={styles(theme).statValue}>
              {mockCurriculum.grades.reduce(
                (sum, year) => sum + year.courses.filter((c) => c.remark === "Passed").length,
                0
              )}
            </span>
          </div>
          <div style={styles(theme).divider}></div>
          <div style={styles(theme).statItem}>
            <span style={styles(theme).statLabel}>Status</span>
            <span style={{ fontSize: "18px", fontWeight: 700, color: theme.primary }}>
              {mockCurriculum.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = (theme) => ({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "32px",
    backgroundColor: theme.bgPage,
    color: theme.textPrimary,
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  backBtn: {
    width: "40px",
    height: "40px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: theme.bgSurface,
    color: theme.textPrimary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: `0 1px 2px ${theme.shadowCard}`,
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
    color: theme.textPrimary,
  },
  subtitle: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: theme.textSecondary,
  },
  infoCard: {
    display: "flex",
    gap: "32px",
    padding: "20px",
    backgroundColor: theme.bgSurface,
    borderRadius: "12px",
    boxShadow: `0 1px 3px ${theme.shadowCard}`,
  },
  infoLabel: {
    fontSize: "12px",
    color: theme.textSecondary,
    marginBottom: "8px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  infoValue: {
    fontSize: "15px",
    fontWeight: 600,
    color: theme.textPrimary,
  },
  statusBadgeContainer: {
    display: "flex",
    alignItems: "center",
  },
  gradesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  yearSection: {
    backgroundColor: theme.bgSurface,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: `0 1px 3px ${theme.shadowCard}`,
  },
  yearHeader: {
    width: "100%",
    padding: "16px 20px",
    border: "none",
    backgroundColor: theme.bgSecondary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "background-color 0.2s ease",
  },
  tableWrapper: {
    overflowX: "auto",
    borderTop: `1px solid ${theme.borderLight}`,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  tableHeader: {
    backgroundColor: theme.bgInput,
    borderBottom: `2px solid ${theme.borderLight}`,
  },
  thCode: {
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: 700,
    color: theme.textPrimary,
    width: "90px",
  },
  thName: {
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: 700,
    color: theme.textPrimary,
    minWidth: "250px",
  },
  thUnits: {
    padding: "12px 16px",
    textAlign: "center",
    fontWeight: 700,
    color: theme.textPrimary,
    width: "80px",
  },
  thGrade: {
    padding: "12px 16px",
    textAlign: "center",
    fontWeight: 700,
    color: theme.textPrimary,
    width: "80px",
  },
  thRemark: {
    padding: "12px 16px",
    textAlign: "center",
    fontWeight: 700,
    color: theme.textPrimary,
    width: "100px",
  },
  thTake: {
    padding: "12px 16px",
    textAlign: "center",
    fontWeight: 700,
    color: theme.textPrimary,
    width: "120px",
  },
  tableRow: {
    borderBottom: `1px solid ${theme.borderLight}`,
    backgroundColor: theme.bgSurface,
  },
  td: {
    padding: "12px 16px",
    color: theme.textSecondary,
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 600,
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    color: "#22c55e",
  },
  summaryCard: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "0px",
    padding: "0px",
    backgroundColor: theme.bgSurface,
    borderRadius: "12px",
    boxShadow: `0 1px 3px ${theme.shadowCard}`,
    overflow: "hidden",
  },
  divider: {
    height: "1px",
    backgroundColor: theme.borderLight,
    gridColumn: "1 / -1",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px 20px",
    alignItems: "flex-start",
  },
  statLabel: {
    fontSize: "12px",
    color: theme.textSecondary,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: 700,
    color: theme.primary,
  },
});
