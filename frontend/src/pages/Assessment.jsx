import { useState } from "react";
import { mockEnrolledSubjects, mockAssessmentPeriods } from "../data/mockData";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Card from "../components/Card";

// ─── Icons ───────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── PDF Generator ────────────────────────────────────────────────────────────

function generatePDF(period, subjects) {
  const rows = subjects.map((s) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;font-weight:700;color:#0d2f6e;">${s.code}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;">${s.subject}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;color:#5a72a0;">${s.description}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;">${s.units}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;">${s.tf}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;">${s.lec}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;">${s.lab}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:center;">${s.schedule}</td>
    </tr>
  `).join("");

  const totalUnits = subjects.reduce((sum, s) => sum + s.units, 0);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Assessment – EduCore</title>
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
        th:nth-child(4), th:nth-child(5), th:nth-child(6), th:nth-child(7), th:nth-child(8) { text-align: center; }
        tbody tr:last-child td { border-bottom: none; }
        tbody tr:nth-child(even) td { background: #f7f9ff; }
        .footer { margin-top: 20px; display: flex; justify-content: space-between; font-size: 12px; color: #5a72a0; border-top: 1px solid #dce8f8; padding-top: 12px; }
        .total { font-weight: 700; color: #0d2f6e; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>EduCore Student Assessment</h1>
        <p>Official Enrolled Subjects Record</p>
      </div>
      <div class="meta">
        <div><strong>Period:</strong> ${period || "Not specified"}</div>
        <div><strong>Generated:</strong> ${new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}</div>
      </div>
      <div class="section-title">Enrolled Subjects</div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Units</th>
            <th>TF</th>
            <th>Lec</th>
            <th>Lab</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="footer">
        <span>EduCore – Student Information System</span>
        <span class="total">Total Units: ${totalUnits}</span>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, "_blank");
  if (win) {
    win.onload = () => {
      win.print();
      URL.revokeObjectURL(url);
    };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Assessment({ onBack }) {
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [dropdownOpen, setDropdownOpen]     = useState(false);

  const totalUnits = mockEnrolledSubjects.reduce((sum, s) => sum + s.units, 0);

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tableIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .as-wrap        { animation: pageIn 0.35s ease both; }
        .as-table-wrap  { animation: tableIn 0.4s ease both 0.1s; opacity: 0; animation-fill-mode: forwards; }

        .as-back:hover          { opacity: 0.65; }
        .as-dropdown-item:hover { background: var(--bg-input) !important; color: var(--text-primary) !important; }
        .as-row:hover td        { background: var(--bg-input) !important; }
        .as-pdf-btn:hover       { background: var(--primary-hover) !important; transform: translateY(-1px); box-shadow: 0 6px 20px var(--shadow-btn) !important; }
        .as-pdf-btn:active      { transform: translateY(0); }
        .as-select:hover        { border-color: var(--border-focus) !important; }

        /* Scrollbar */
        .as-table-scroll::-webkit-scrollbar       { height: 4px; }
        .as-table-scroll::-webkit-scrollbar-track { background: transparent; }
        .as-table-scroll::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 4px; }
      `}</style>

      <div className="as-wrap">

        {/* ── Page header ── */}
        <PageHeader title="Assessment" onBack={onBack} />

        {/* ── Period selector ── */}
        <Card>
          <label style={styles.fieldLabel}>Period</label>
          <div style={{ position: "relative", maxWidth: "380px" }}>
            <button
              className="as-select"
              style={{
                ...styles.selectBtn,
                borderColor: dropdownOpen ? "var(--border-focus)" : "var(--border-input)",
                boxShadow: dropdownOpen ? "0 0 0 3px var(--shadow-focus)" : "none",
              }}
              onClick={() => setDropdownOpen((p) => !p)}
            >
              <span style={{ color: selectedPeriod ? "var(--text-primary)" : "var(--text-placeholder)" }}>
                {selectedPeriod || "Select a period"}
              </span>
              <span style={{
                transition: "transform 0.2s",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                color: "var(--text-secondary)",
              }}>
                <ChevronIcon />
              </span>
            </button>

            {dropdownOpen && (
              <div style={styles.dropdown}>
                {mockAssessmentPeriods.map((p) => (
                  <button
                    key={p}
                    className="as-dropdown-item"
                    style={{
                      ...styles.dropdownItem,
                      background: selectedPeriod === p ? "var(--bg-input)" : "transparent",
                      color: selectedPeriod === p ? "var(--primary)" : "var(--text-secondary)",
                      fontWeight: selectedPeriod === p ? 700 : 400,
                    }}
                    onClick={() => { setSelectedPeriod(p); setDropdownOpen(false); }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Enrolled subjects table ── */}
        <Card className="as-table-wrap">
          <div style={styles.tableHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Enrolled Subjects</h2>
              <p style={styles.sectionSub}>{mockEnrolledSubjects.length} subjects · {totalUnits} total units</p>
            </div>
          </div>

          <div className="as-table-scroll" style={styles.tableScroll}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Code", "Subject", "Description", "Units", "TF", "Lec", "Lab", "Schedule"].map((h) => (
                    <th key={h} style={{
                      ...styles.th,
                      textAlign: ["Units", "TF", "Lec", "Lab", "Schedule"].includes(h) ? "center" : "left",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockEnrolledSubjects.map((subject, i) => (
                  <tr key={subject.code} className="as-row" style={{
                    background: i % 2 === 0 ? "transparent" : "var(--bg-page)",
                  }}>
                    <td style={{ ...styles.td, fontWeight: 700, color: "var(--primary)" }}>
                      {subject.code}
                    </td>
                    <td style={styles.td}>{subject.subject}</td>
                    <td style={{ ...styles.td, color: "var(--text-secondary)", fontSize: "12px" }}>
                      {subject.description}
                    </td>
                    <td style={{ ...styles.td, textAlign: "center" }}>{subject.units}</td>
                    <td style={{ ...styles.td, textAlign: "center" }}>{subject.tf}</td>
                    <td style={{ ...styles.td, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
                      {subject.lec}
                    </td>
                    <td style={{ ...styles.td, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
                      {subject.lab}
                    </td>
                    <td style={{ ...styles.td, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
                      {subject.schedule}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} style={styles.tfootTd}>Total</td>
                  <td style={{ ...styles.tfootTd, textAlign: "center", color: "var(--primary)", fontWeight: 700 }}>
                    {totalUnits}
                  </td>
                  <td colSpan={4} style={styles.tfootTd} />
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        {/* ── Footer ── */}
        <div style={styles.footer}>
          <p style={styles.footerNote}>
            This assessment is for viewing purposes only. For official records, download the PDF copy.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => generatePDF(selectedPeriod, mockEnrolledSubjects)}
          >
            <DownloadIcon />
            Download PDF Copy
          </Button>
        </div>

      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  container: {
    width: "100%",
    maxWidth: "1100px",
  },
  pageHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "24px",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    color: "var(--primary)",
    borderRadius: "8px",
    transition: "opacity 0.15s",
  },
  pageTitle: {
    fontSize: "clamp(22px, 3vw, 30px)",
    fontWeight: 700,
    color: "var(--text-primary)",
    fontFamily: "'DM Serif Display', serif",
    margin: 0,
    transition: "color 0.25s",
  },

  // Card wrapper
  card: {
    background: "var(--bg-surface)",
    border: "1.5px solid var(--border-light)",
    borderRadius: "12px",
    padding: "20px 24px",
    marginBottom: "20px",
    transition: "background 0.25s, border-color 0.25s",
    boxShadow: "0 2px 12px var(--shadow-card)",
  },
  fieldLabel: {
    display: "block",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--text-secondary)",
    marginBottom: "10px",
    transition: "color 0.25s",
  },

  // Period dropdown
  selectBtn: {
    width: "100%",
    height: "42px",
    padding: "0 14px",
    border: "1.5px solid",
    borderRadius: "8px",
    background: "var(--bg-input)",
    color: "var(--text-primary)",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.25s",
    fontFamily: "'Source Sans 3', sans-serif",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    right: 0,
    background: "var(--bg-surface)",
    border: "1.5px solid var(--border-light)",
    borderRadius: "10px",
    boxShadow: "0 8px 24px var(--shadow-card)",
    zIndex: 50,
    overflow: "hidden",
  },
  dropdownItem: {
    width: "100%",
    padding: "11px 16px",
    border: "none",
    background: "transparent",
    fontSize: "13px",
    textAlign: "left",
    cursor: "pointer",
    transition: "background 0.15s, color 0.15s",
    fontFamily: "'Source Sans 3', sans-serif",
  },

  // Table section
  tableHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "var(--text-primary)",
    margin: 0,
    transition: "color 0.25s",
  },
  sectionSub: {
    fontSize: "12px",
    color: "var(--text-secondary)",
    margin: "3px 0 0",
    transition: "color 0.25s",
  },
  tableScroll: {
    overflowX: "auto",
    borderRadius: "8px",
    border: "1.5px solid var(--border-light)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
    fontFamily: "'Source Sans 3', sans-serif",
  },
  th: {
    padding: "11px 14px",
    fontSize: "12px",
    fontWeight: 700,
    color: "var(--text-primary)",
    background: "var(--bg-input)",
    borderBottom: "1.5px solid var(--border-light)",
    whiteSpace: "nowrap",
    letterSpacing: "0.02em",
    transition: "background 0.25s, color 0.25s",
  },
  td: {
    padding: "12px 14px",
    color: "var(--text-primary)",
    borderBottom: "1px solid var(--border-light)",
    transition: "background 0.15s, color 0.25s",
    whiteSpace: "nowrap",
  },
  tfootTd: {
    padding: "11px 14px",
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--text-secondary)",
    borderTop: "1.5px solid var(--border-light)",
    background: "var(--bg-input)",
    transition: "background 0.25s, color 0.25s",
  },

  // Footer
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
  },
  footerNote: {
    fontSize: "12px",
    color: "var(--text-placeholder)",
    margin: 0,
    transition: "color 0.25s",
  },
  pdfBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "11px 22px",
    background: "var(--primary)",
    color: "var(--primary-text)",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.04em",
    transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
    fontFamily: "'Source Sans 3', sans-serif",
    boxShadow: "0 4px 14px var(--shadow-btn)",
    flexShrink: 0,
  },
};
