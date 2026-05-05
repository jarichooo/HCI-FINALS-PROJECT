import { useTheme } from "../../context/ThemeContext";
import { mockCurriculum } from "../../data/mockData";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Card from "../../components/Card";

// ─── Icons ────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// ─── PDF Generator ────────────────────────────────────────────────────────────

function generateYearPDF(yearData) {
  const rows = yearData.courses.map((course) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;font-weight:700;color:#0d2f6e;">${course.code}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;">${course.name}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;">${course.units.toFixed(1)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;font-weight:700;color:${
        course.grade ? (course.grade <= 1.25 ? "#22c55e" : course.grade <= 1.75 ? "#f59e0b" : "#ef4444") : "#5a72a0"
      };">${course.grade ? course.grade.toFixed(2) : "—"}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;">${
        course.remark === "Passed" ? "✓ Passed" : course.isRed ? "Pre-req." : "Pending"
      }</td>
    </tr>
  `).join("");

  const totalUnits = yearData.courses.filter((c) => c.remark === "Passed").reduce((sum, c) => sum + c.units, 0);
  const passedCourses = yearData.courses.filter((c) => c.remark === "Passed").length;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Curriculum Evaluation – EduCore</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; color: #1a2a4a; padding: 40px; }
        .header { text-align: center; margin-bottom: 32px; border-bottom: 2px solid #0d2f6e; padding-bottom: 20px; }
        .header h1 { font-size: 22px; color: #0d2f6e; letter-spacing: 0.05em; }
        .header p  { font-size: 13px; color: #5a72a0; margin-top: 4px; }
        .meta { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; }
        .meta strong { color: #0d2f6e; }
        .section-title { font-size: 14px; font-weight: 700; color: #0d2f6e; margin-bottom: 10px; letter-spacing: 0.04em; text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        thead { background: #eef2fb; }
        th { padding: 10px 12px; text-align: left; font-weight: 700; color: #0d2f6e; border-bottom: 2px solid #c8d6f0; }
        th:nth-child(3), th:nth-child(4), th:nth-child(5) { text-align: center; }
        tbody tr:last-child td { border-bottom: none; }
        tbody tr:nth-child(even) td { background: #f7f9ff; }
        .footer { margin-top: 20px; display: flex; justify-content: space-between; font-size: 12px; color: #5a72a0; border-top: 1px solid #dce8f8; padding-top: 12px; }
        .stats { font-weight: 700; color: #0d2f6e; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>EduCore Curriculum Evaluation</h1>
        <p>Bachelor of Science in Computer Science</p>
      </div>
      <div class="meta">
        <div><strong>Semester:</strong> ${yearData.year}</div>
        <div><strong>Generated:</strong> ${new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}</div>
      </div>
      <div class="section-title">Courses</div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Course Name</th>
            <th>Units</th>
            <th>Grade</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="footer">
        <span>EduCore – Student Information System</span>
        <span class="stats">Passed: ${passedCourses} | Units: ${totalUnits.toFixed(1)}</span>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) {
    win.onload = () => {
      win.print();
      URL.revokeObjectURL(url);
    };
  }
}

function generateAllPDF() {
  const yearRows = mockCurriculum.grades.map((yearData) => {
    const rows = yearData.courses.map((course) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;font-weight:700;color:#0d2f6e;">${course.code}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;">${course.name}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;">${course.units.toFixed(1)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;font-weight:700;color:${
          course.grade ? (course.grade <= 1.25 ? "#22c55e" : course.grade <= 1.75 ? "#f59e0b" : "#ef4444") : "#5a72a0"
        };">${course.grade ? course.grade.toFixed(2) : "—"}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;">${
          course.remark === "Passed" ? "✓ Passed" : course.isRed ? "Pre-req." : "Pending"
        }</td>
      </tr>
    `).join("");

    return `
      <div style="margin-top: 30px; page-break-inside: avoid;">
        <div class="section-title">${yearData.year}</div>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Course Name</th>
              <th>Units</th>
              <th>Grade</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }).join("");

  const totalCourses = mockCurriculum.grades.reduce((sum, year) => sum + year.courses.length, 0);
  const passedCourses = mockCurriculum.grades.reduce(
    (sum, year) => sum + year.courses.filter((c) => c.remark === "Passed").length,
    0
  );
  const totalUnits = mockCurriculum.grades.reduce(
    (sum, year) => sum + year.courses.filter((c) => c.remark === "Passed").reduce((s, c) => s + c.units, 0),
    0
  );

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Curriculum Evaluation – EduCore</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; color: #1a2a4a; padding: 40px; }
        .header { text-align: center; margin-bottom: 32px; border-bottom: 2px solid #0d2f6e; padding-bottom: 20px; }
        .header h1 { font-size: 22px; color: #0d2f6e; letter-spacing: 0.05em; }
        .header p  { font-size: 13px; color: #5a72a0; margin-top: 4px; }
        .meta { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; }
        .meta strong { color: #0d2f6e; }
        .section-title { font-size: 14px; font-weight: 700; color: #0d2f6e; margin-bottom: 10px; letter-spacing: 0.04em; text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; }
        thead { background: #eef2fb; }
        th { padding: 10px 12px; text-align: left; font-weight: 700; color: #0d2f6e; border-bottom: 2px solid #c8d6f0; }
        th:nth-child(3), th:nth-child(4), th:nth-child(5) { text-align: center; }
        tbody tr:last-child td { border-bottom: none; }
        tbody tr:nth-child(even) td { background: #f7f9ff; }
        .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 12px; color: #5a72a0; border-top: 1px solid #dce8f8; padding-top: 12px; }
        .stats { font-weight: 700; color: #0d2f6e; }
        .page-break { page-break-after: always; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>EduCore Curriculum Evaluation</h1>
        <p>Bachelor of Science in Computer Science</p>
      </div>
      <div class="meta">
        <div><strong>Academic Record</strong></div>
        <div><strong>Generated:</strong> ${new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}</div>
      </div>
      ${yearRows}
      <div class="footer" style="margin-top: 60px;">
        <span>EduCore – Student Information System</span>
        <span class="stats">Total Courses: ${totalCourses} | Passed: ${passedCourses} | Units: ${totalUnits.toFixed(1)}</span>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) {
    win.onload = () => {
      win.print();
      URL.revokeObjectURL(url);
    };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Grades({ onBack }) {
  const { isDark } = useTheme();

  const theme = {
    bgPage: isDark ? "#0d1b36" : "#eef2fb",
    bgSurface: isDark ? "#162044" : "#ffffff",
    bgSecondary: isDark ? "#1c2a52" : "#f9faff",
    bgInput: isDark ? "#1c2a52" : "#f7f9ff",
    bgHover: isDark ? "#222e52" : "#f3f5fa",
    bgStriped: isDark ? "rgba(255,255,255,0.02)" : "rgba(13,47,110,0.02)",
    textPrimary: isDark ? "#e8eeff" : "#0d2f6e",
    textSecondary: isDark ? "#7a99cc" : "#5a72a0",
    borderLight: isDark ? "#243560" : "#dce8f8",
    primary: isDark ? "#4a72cc" : "#0d2f6e",
    shadowCard: isDark ? "rgba(0,0,0,0.35)" : "rgba(13,47,110,0.08)",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
  };

  // Download individual year table as PDF
  const handleDownloadYear = (yearData) => {
    generateYearPDF(yearData);
  };

  // Download all tables as PDF
  const handleDownloadAll = () => {
    generateAllPDF();
  };

  // Calculate grade color
  const getGradeColor = (grade) => {
    if (grade <= 1.25) return theme.success;
    if (grade <= 1.75) return theme.warning;
    return theme.danger;
  };

  // Calculate summary stats
  const totalCourses = mockCurriculum.grades.reduce((sum, year) => sum + year.courses.length, 0);
  const passedCourses = mockCurriculum.grades.reduce(
    (sum, year) => sum + year.courses.filter((c) => c.remark === "Passed").length,
    0
  );
  const totalUnits = mockCurriculum.grades.reduce(
    (sum, year) => sum + year.courses.filter((c) => c.remark === "Passed").reduce((s, c) => s + c.units, 0),
    0
  );

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

        .status-passed {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
          white-space: nowrap;
        }

        .status-pending {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          background: rgba(234, 179, 8, 0.15);
          color: #eab308;
          white-space: nowrap;
        }

        .status-failed {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
          white-space: nowrap;
        }

        .grade-excellent { color: ${theme.success}; font-weight: 700; }
        .grade-good { color: ${theme.warning}; font-weight: 700; }
        .grade-poor { color: ${theme.danger}; font-weight: 700; }

        .highlighted-row {
          background-color: ${isDark ? "rgba(234, 179, 8, 0.08)" : "rgba(251, 191, 36, 0.05)"} !important;
        }

        .red-highlighted-row {
          background-color: ${isDark ? "rgba(239, 68, 68, 0.08)" : "rgba(239, 68, 68, 0.05)"} !important;
        }
      `}</style>

      <div className="grades-page">
        {/* Header with Download All Button */}
        <div style={styles(theme).headerWrapper}>
          <PageHeader
            title="Curriculum Evaluation"
            subtitle="Bachelor of Science in Computer Science"
            onBack={onBack}
          />
          <Button
            variant="primary"
            size="md"
            onClick={handleDownloadAll}
            title="Download all tables as PDF"
          >
            <DownloadIcon />
            <span style={{ marginLeft: "2px" }}>Download All</span>
          </Button>
        </div>

        {/* Grades by Year */}
        <div style={styles(theme).gradesContainer}>
          {mockCurriculum.grades.map((yearData, yearIdx) => (
            <div key={yearIdx} className="year-section" style={styles(theme).yearSection}>
              {/* Year Header with Download Button */}
              <div style={styles(theme).yearHeaderWrapper}>
                <div style={styles(theme).yearHeader}>
                  <div style={styles(theme).yearHeaderContent}>
                    <span style={{ fontSize: "16px", fontWeight: 700 }}>
                      {yearData.year}
                    </span>
                    <span style={{
                      fontSize: "13px",
                      opacity: 0.8,
                      marginLeft: "12px",
                    }}>
                      {yearData.courses.filter((c) => c.remark === "Passed").length} / {yearData.courses.length} courses
                    </span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDownloadYear(yearData)}
                  title="Download this semester as PDF"
                >
                  <DownloadIcon />
                </Button>
              </div>

              {/* Courses Table */}
              <div style={styles(theme).tableWrapper}>
                <table style={styles(theme).table}>
                  <thead>
                    <tr style={styles(theme).tableHeader}>
                      <th style={styles(theme).thCode}>Code</th>
                      <th style={styles(theme).thName}>Course Name</th>
                      <th style={styles(theme).thUnits}>Units</th>
                      <th style={styles(theme).thGrade}>Grade</th>
                      <th style={styles(theme).thRemark}>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearData.courses.map((course, cIdx) => (
                      <tr
                        key={cIdx}
                        className={`course-row ${course.highlighted ? "highlighted-row" : ""} ${
                          course.isRed ? "red-highlighted-row" : cIdx % 2 === 1 ? "striped-row" : ""
                        }`}
                        style={{
                          ...styles(theme).tableRow,
                          backgroundColor:
                            course.highlighted || course.isRed
                              ? undefined
                              : cIdx % 2 === 1
                              ? theme.bgStriped
                              : theme.bgSurface,
                        }}
                      >
                        <td style={styles(theme).td}>
                          <span style={{ fontWeight: 700, color: theme.primary, fontSize: "13px" }}>
                            {course.code}
                          </span>
                        </td>
                        <td style={styles(theme).td}>
                          <span style={{ color: theme.textPrimary, fontSize: "14px" }}>
                            {course.name}
                          </span>
                        </td>
                        <td style={{ ...styles(theme).td, textAlign: "center" }}>
                          <span style={{ color: theme.textSecondary, fontWeight: 600 }}>
                            {course.units.toFixed(1)}
                          </span>
                        </td>
                        <td style={{ ...styles(theme).td, textAlign: "center" }}>
                          {course.grade ? (
                            <span
                              className={
                                course.grade <= 1.25
                                  ? "grade-excellent"
                                  : course.grade <= 1.75
                                  ? "grade-good"
                                  : "grade-poor"
                              }
                              style={{ fontSize: "14px" }}
                            >
                              {course.grade.toFixed(2)}
                            </span>
                          ) : (
                            <span style={{ color: theme.textSecondary }}>—</span>
                          )}
                        </td>
                        <td style={styles(theme).td}>
                          {course.remark === "Passed" ? (
                            <span className="status-passed">✓ Passed</span>
                          ) : course.isRed ? (
                            <span className="status-failed">Pre-req.</span>
                          ) : (
                            <span className="status-pending">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div style={styles(theme).footerInfo}>
          <p style={styles(theme).footerText}>
            💡 Your grades are calculated using the 4-point grading scale. Click on a semester to view detailed course information.
          </p>
        </div>

        {/* Summary Stats - Bottom */}
        <div style={styles(theme).summaryStats}>
          <div style={styles(theme).summaryItem}>
            <span style={styles(theme).summaryLabel}>Total Courses</span>
            <span style={styles(theme).summaryValue}>{totalCourses}</span>
          </div>
          <span style={styles(theme).summarySeparator}>•</span>
          <div style={styles(theme).summaryItem}>
            <span style={styles(theme).summaryLabel}>Courses Passed</span>
            <span style={{ ...styles(theme).summaryValue, color: theme.success }}>{passedCourses}</span>
          </div>
          <span style={styles(theme).summarySeparator}>•</span>
          <div style={styles(theme).summaryItem}>
            <span style={styles(theme).summaryLabel}>Total Units</span>
            <span style={styles(theme).summaryValue}>{totalUnits.toFixed(1)}</span>
          </div>
          <span style={styles(theme).summarySeparator}>•</span>
          <div style={styles(theme).summaryItem}>
            <span style={styles(theme).summaryLabel}>Status</span>
            <span style={{ ...styles(theme).summaryValue, color: theme.primary }}>
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
    gap: "28px",
    padding: "32px",
    backgroundColor: theme.bgPage,
    color: theme.textPrimary,
    minHeight: "100vh",
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flex: 1,
  },
  backBtn: {
    width: "44px",
    height: "44px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: theme.bgSurface,
    color: theme.textPrimary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: `0 1px 3px ${theme.shadowCard}`,
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: 700,
    color: theme.textPrimary,
  },
  subtitle: {
    margin: "6px 0 0 0",
    fontSize: "14px",
    color: theme.textSecondary,
    fontWeight: 500,
  },

  // Download Button - All
  downloadAllBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: `${theme.primary}90`,
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.2s ease",
    fontWeight: 600,
    fontSize: "14px",
    boxShadow: `0 2px 4px ${theme.shadowCard}`,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  // Grades Container
  gradesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  yearSection: {
    backgroundColor: theme.bgSurface,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: `0 1px 3px ${theme.shadowCard}`,
    border: `1px solid ${theme.borderLight}`,
  },
  yearHeaderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "0 20px 0 0",
    backgroundColor: theme.bgSecondary,
    borderBottom: `1px solid ${theme.borderLight}`,
  },
  yearHeader: {
    flex: 1,
    width: "100%",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  yearHeaderContent: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  downloadYearBtn: {
    width: "40px",
    height: "40px",
    padding: "0",
    border: "none",
    borderRadius: "6px",
    backgroundColor: `${theme.primary}80`,
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    flexShrink: 0,
    margin: "8px 8px 8px 0",
  },
  tableWrapper: {
    overflowX: "auto",
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
    padding: "14px 16px",
    textAlign: "left",
    fontWeight: 700,
    color: theme.textPrimary,
    width: "100px",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  thName: {
    padding: "14px 16px",
    textAlign: "left",
    fontWeight: 700,
    color: theme.textPrimary,
    flex: 1,
    minWidth: "220px",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  thUnits: {
    padding: "14px 16px",
    textAlign: "center",
    fontWeight: 700,
    color: theme.textPrimary,
    width: "80px",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  thGrade: {
    padding: "14px 16px",
    textAlign: "center",
    fontWeight: 700,
    color: theme.textPrimary,
    width: "80px",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  thRemark: {
    padding: "14px 16px",
    textAlign: "center",
    fontWeight: 700,
    color: theme.textPrimary,
    width: "130px",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tableRow: {
    borderBottom: `1px solid ${theme.borderLight}`,
    transition: "background-color 0.15s ease",
  },
  td: {
    padding: "16px",
    color: theme.textSecondary,
    verticalAlign: "middle",
  },

  // Footer
  footerInfo: {
    padding: "16px 20px",
    backgroundColor: theme.bgInput,
    borderRadius: "10px",
    border: `1px solid ${theme.borderLight}`,
    marginTop: "8px",
  },
  footerText: {
    margin: 0,
    fontSize: "13px",
    color: theme.textSecondary,
    lineHeight: "1.5",
  },

  // Summary Stats - Bottom
  summaryStats: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    padding: "20px",
    flexWrap: "wrap",
    marginTop: "12px",
  },
  summaryItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  summaryLabel: {
    fontSize: "12px",
    color: theme.textSecondary,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  summaryValue: {
    fontSize: "20px",
    fontWeight: 700,
    color: theme.primary,
  },
  summarySeparator: {
    color: theme.borderLight,
    fontSize: "20px",
    opacity: 0.5,
  },
});
