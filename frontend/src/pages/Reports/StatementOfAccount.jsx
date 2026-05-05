import { useTheme } from "../../context/ThemeContext";
import PageHeader from "../../components/PageHeader";
import SectionHeader from "../../components/SectionHeader";
import Card from "../../components/Card";
import Button from "../../components/Button";

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

const PrintIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

// ─── Statement of Account Data ────────────────────────────────────────────────

const studentInfo = {
  name: "Juan dela Cruz",
  studentId: "2021-00123",
  program: "Bachelor of Science in Computer Science",
  academicYear: "2025-2026",
};

const assessmentData = {
  tuitionFees: [
    { label: "Tuition Fees (A/R)", amount: "20 x 250/unit", quantity: 5000.00, total: 5000.00 },
  ],
  laboratoryFees: [
    { label: "Laboratory Fees - HD Computer (A/R)", amount: "1 x 500/subject", quantity: 500.00, total: 500.00 },
  ],
  miscellaneousFees: [
    { label: "Athletic Fees (A/R)", total: 150.00 },
    { label: "Library Fees (A/R)", total: 100.00 },
    { label: "Medical, Dental & Laboratory Fees (A/R)", total: 50.00 },
    { label: "Miscellaneous Fee (A/R)", total: 20.00 },
    { label: "Guidance Fee (A/R)", total: 30.00 },
    { label: "Laboratory Fee-Internet (A/R)", total: 150.00 },
    { label: "Band Fee (A/R)", total: 50.00 },
    { label: "Supreme Student Board (A/R)", total: 100.00 },
    { label: "Publication Fee (A/R)", total: 100.00 },
    { label: "ROTC/NSTP Fee (A/R)", amount: "1 x 375/subject", quantity: 375.00, total: 375.00 },
    { label: "Central Student Council Fee (A/R)", total: 50.00 },
    { label: "School Facilities Fee (A/R)", total: 200.00 },
    { label: "Cultural Arts Fee (A/R)", total: 100.00 },
  ],
};

const summary = {
  currentAssessment: 6905.00,
  discountsScholarships: 0.00,
  previousBalance: 0.00,
  currentReceivable: 6905.00,
};

const paymentSchedule = [
  { description: "Down", amount: 6905.00, total: 6905.00 },
];

// ─── PDF Generator ────────────────────────────────────────────────────────────

function generateStatementPDF() {
  const totalMisc = assessmentData.miscellaneousFees.reduce((sum, fee) => sum + fee.total, 0);
  
  const miscRows = assessmentData.miscellaneousFees.map((fee) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;">${fee.label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:right;">${fee.amount || ""}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #dce8f8;text-align:right;">${fee.total.toFixed(2)}</td>
    </tr>
  `).join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Statement of Account – EduCore</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; color: #1a2a4a; padding: 40px; background: white; }
        .header { text-align: center; margin-bottom: 32px; border-bottom: 3px solid #0d2f6e; padding-bottom: 20px; }
        .header h1 { font-size: 24px; color: #0d2f6e; letter-spacing: 0.05em; font-weight: 700; }
        .header p { font-size: 13px; color: #5a72a0; margin-top: 4px; }
        .student-info { display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 12px; background: #eef2fb; padding: 16px; border-radius: 8px; }
        .student-info-item { display: flex; flex-direction: column; gap: 4px; }
        .student-info-item strong { color: #0d2f6e; }
        .section-title { font-size: 14px; font-weight: 700; color: #0d2f6e; margin-bottom: 12px; margin-top: 20px; letter-spacing: 0.04em; text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 16px; }
        thead { background: #eef2fb; }
        th { padding: 12px; text-align: left; font-weight: 700; color: #0d2f6e; border-bottom: 2px solid #c8d6f0; }
        th:last-child { text-align: right; }
        td { padding: 10px 12px; border-bottom: 1px solid #dce8f8; }
        td:last-child { text-align: right; }
        tbody tr:nth-child(even) { background: #f7f9ff; }
        .total-row { font-weight: 700; color: #0d2f6e; background: #eef2fb !important; }
        .total-row td { border-bottom: 2px solid #c8d6f0; padding: 12px; }
        .summary-table { margin-top: 20px; }
        .summary-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #dce8f8; font-size: 12px; }
        .summary-item strong { color: #0d2f6e; }
        .summary-total { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 2px solid #0d2f6e; font-weight: 700; color: #0d2f6e; font-size: 13px; margin-top: 8px; }
        .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 11px; color: #5a72a0; border-top: 1px solid #dce8f8; padding-top: 12px; }
        .signature { margin-top: 40px; display: flex; justify-content: space-between; font-size: 12px; }
        .sig-line { text-align: center; min-width: 150px; }
        .sig-line-text { border-top: 1px solid #0d2f6e; padding-top: 4px; font-weight: 700; color: #0d2f6e; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>STATEMENT OF ACCOUNT</h1>
        <p>Academic Year ${studentInfo.academicYear}</p>
      </div>

      <div class="student-info">
        <div class="student-info-item">
          <strong>Student Name:</strong>
          <span>${studentInfo.name}</span>
        </div>
        <div class="student-info-item">
          <strong>Student ID:</strong>
          <span>${studentInfo.studentId}</span>
        </div>
        <div class="student-info-item">
          <strong>Program:</strong>
          <span>${studentInfo.program}</span>
        </div>
      </div>

      <div class="section-title">Assessment Details</div>
      
      <div class="section-title" style="margin-top: 12px; font-size: 12px;">Tuition Fees</div>
      <table>
        <thead>
          <tr>
            <th>Assessment</th>
            <th>Amount</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${assessmentData.tuitionFees.map(fee => `
            <tr>
              <td>${fee.label}</td>
              <td>${fee.amount}</td>
              <td>${fee.total.toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="section-title" style="margin-top: 12px; font-size: 12px;">Laboratory Fees</div>
      <table>
        <thead>
          <tr>
            <th>Assessment</th>
            <th>Amount</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${assessmentData.laboratoryFees.map(fee => `
            <tr>
              <td>${fee.label}</td>
              <td>${fee.amount}</td>
              <td>${fee.total.toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="section-title" style="margin-top: 12px; font-size: 12px;">Miscellaneous Fees</div>
      <table>
        <thead>
          <tr>
            <th>Assessment</th>
            <th>Amount</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${miscRows}
          <tr class="total-row">
            <td colspan="2">Total Miscellaneous</td>
            <td>${totalMisc.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div class="section-title">Summary</div>
      <div class="summary-table">
        <div class="summary-item">
          <strong>Current Assessment:</strong>
          <span>${summary.currentAssessment.toFixed(2)}</span>
        </div>
        <div class="summary-item">
          <strong>Discounts/Scholarships:</strong>
          <span>${summary.discountsScholarships.toFixed(2)}</span>
        </div>
        <div class="summary-item">
          <strong>Previous Balance:</strong>
          <span>${summary.previousBalance.toFixed(2)}</span>
        </div>
        <div class="summary-total">
          <span>Current Receivable:</span>
          <span>${summary.currentReceivable.toFixed(2)}</span>
        </div>
      </div>

      <div class="section-title">Payment Schedule</div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align: right;">Amount</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${paymentSchedule.map(payment => `
            <tr>
              <td>${payment.description}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>${payment.total.toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="signature">
        <div class="sig-line">
          <div style="height: 60px;"></div>
          <div class="sig-line-text">Student's Signature</div>
        </div>
        <div class="sig-line">
          <div style="height: 60px;"></div>
          <div class="sig-line-text">Registrar's Signature</div>
        </div>
      </div>

      <div class="footer">
        <span>EduCore – Student Information System</span>
        <span>Generated: ${new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}</span>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StatementOfAccount() {
  const { isDark } = useTheme();
  
  const totalMisc = assessmentData.miscellaneousFees.reduce((sum, fee) => sum + fee.total, 0);
  const totalAssessment = 5000 + 500 + totalMisc;

  const handlePrint = () => {
    generateStatementPDF();
  };

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "32px",
      background: isDark ? "var(--bg-page)" : "var(--bg-page)",
    },
    content: {
      maxWidth: "900px",
      margin: "0 auto",
    },
    actionBar: {
      display: "flex",
      gap: "12px",
      marginTop: "32px",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    studentInfoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "16px",
      marginBottom: "28px",
    },
    infoCard: {
      background: "var(--bg-surface)",
      border: "1px solid var(--border-light)",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 2px 8px var(--shadow-card)",
    },
    infoLabel: {
      fontSize: "12px",
      fontWeight: 700,
      color: "var(--text-secondary)",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      marginBottom: "6px",
    },
    infoValue: {
      fontSize: "14px",
      fontWeight: 600,
      color: "var(--text-primary)",
    },
    section: {
      marginBottom: "28px",
    },
    sectionHeader: {
      fontSize: "14px",
      fontWeight: 700,
      color: "var(--text-primary)",
      marginBottom: "16px",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      paddingBottom: "12px",
      borderBottom: "2px solid var(--border-light)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "var(--bg-surface)",
      border: "1px solid var(--border-light)",
      borderRadius: "8px",
      overflow: "hidden",
    },
    thead: {
      background: "var(--bg-secondary)",
    },
    th: {
      padding: "12px 16px",
      textAlign: "left",
      fontWeight: 700,
      fontSize: "12px",
      color: "var(--text-primary)",
      borderBottom: "1px solid var(--border-light)",
      textTransform: "uppercase",
      letterSpacing: "0.03em",
    },
    td: {
      padding: "12px 16px",
      fontSize: "13px",
      color: "var(--text-primary)",
      borderBottom: "1px solid var(--border-light)",
    },
    tBodyRow: {
      transition: "background 0.2s ease",
    },
    totalRow: {
      background: "var(--bg-secondary)",
      fontWeight: 700,
      color: "var(--text-primary)",
      borderTop: "2px solid var(--border-light)",
      borderBottom: "2px solid var(--border-light)",
    },
    textRight: {
      textAlign: "right",
    },
    summary: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      marginBottom: "28px",
    },
    summaryCol: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    summaryItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      background: "var(--bg-secondary)",
      borderRadius: "8px",
      fontSize: "13px",
    },
    summaryLabel: {
      fontWeight: 600,
      color: "var(--text-primary)",
    },
    summaryValue: {
      fontWeight: 700,
      color: "var(--primary)",
      fontSize: "14px",
    },
    totalReceivable: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px",
      background: "var(--primary)",
      color: "var(--primary-text)",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 700,
      gridColumn: "1 / -1",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <PageHeader
          title="Statement of Account"
          subtitle="View your comprehensive fee assessment and payment details"
          onBack={() => window.history.back()}
        />

        {/* Student Information */}
        <div style={styles.studentInfoGrid}>
          <div style={styles.infoCard}>
            <div style={styles.infoLabel}>Student Name</div>
            <div style={styles.infoValue}>{studentInfo.name}</div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.infoLabel}>Student ID</div>
            <div style={styles.infoValue}>{studentInfo.studentId}</div>
          </div>
          <div style={styles.infoCard}>
            <div style={styles.infoLabel}>Academic Year</div>
            <div style={styles.infoValue}>{studentInfo.academicYear}</div>
          </div>
        </div>

        {/* Assessment Breakdown */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>Tuition Fees</div>
          <Card>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Assessment</th>
                  <th style={styles.th}>Amount</th>
                  <th style={{ ...styles.th, ...styles.textRight }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {assessmentData.tuitionFees.map((fee, idx) => (
                  <tr key={idx} style={styles.tBodyRow}>
                    <td style={styles.td}>{fee.label}</td>
                    <td style={styles.td}>{fee.amount}</td>
                    <td style={{ ...styles.td, ...styles.textRight }}>₱ {fee.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Laboratory Fees */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>Laboratory Fees</div>
          <Card>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Assessment</th>
                  <th style={styles.th}>Amount</th>
                  <th style={{ ...styles.th, ...styles.textRight }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {assessmentData.laboratoryFees.map((fee, idx) => (
                  <tr key={idx} style={styles.tBodyRow}>
                    <td style={styles.td}>{fee.label}</td>
                    <td style={styles.td}>{fee.amount}</td>
                    <td style={{ ...styles.td, ...styles.textRight }}>₱ {fee.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Miscellaneous Fees */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>Miscellaneous Fees</div>
          <Card>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Assessment</th>
                  <th style={styles.th}>Amount</th>
                  <th style={{ ...styles.th, ...styles.textRight }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {assessmentData.miscellaneousFees.map((fee, idx) => (
                  <tr key={idx} style={styles.tBodyRow}>
                    <td style={styles.td}>{fee.label}</td>
                    <td style={styles.td}>{fee.amount || ""}</td>
                    <td style={{ ...styles.td, ...styles.textRight }}>₱ {fee.total.toFixed(2)}</td>
                  </tr>
                ))}
                <tr style={styles.totalRow}>
                  <td colSpan="2" style={styles.td}>Total Miscellaneous Fees</td>
                  <td style={{ ...styles.td, ...styles.textRight }}>₱ {totalMisc.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>

        {/* Summary Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>Summary</div>
          <div style={styles.summary}>
            <div style={styles.summaryCol}>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Current Assessment</span>
                <span style={styles.summaryValue}>₱ {summary.currentAssessment.toFixed(2)}</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Discounts/Scholarships</span>
                <span style={styles.summaryValue}>₱ {summary.discountsScholarships.toFixed(2)}</span>
              </div>
            </div>
            <div style={styles.summaryCol}>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>Previous Balance</span>
                <span style={styles.summaryValue}>₱ {summary.previousBalance.toFixed(2)}</span>
              </div>
            </div>
            <div style={styles.totalReceivable}>
              <span>Current Receivable</span>
              <span>₱ {summary.currentReceivable.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Schedule */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>Payment Schedule</div>
          <Card>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Description</th>
                  <th style={{ ...styles.th, ...styles.textRight }}>Amount</th>
                  <th style={{ ...styles.th, ...styles.textRight }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {paymentSchedule.map((payment, idx) => (
                  <tr key={idx} style={styles.tBodyRow}>
                    <td style={styles.td}>{payment.description}</td>
                    <td style={{ ...styles.td, ...styles.textRight }}>₱ {payment.amount.toFixed(2)}</td>
                    <td style={{ ...styles.td, ...styles.textRight }}>₱ {payment.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Download Action */}
        <div style={styles.actionBar}>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
            Download a copy of your statement for your records.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={handlePrint}
          >
            <DownloadIcon />
            Download PDF Copy
          </Button>
        </div>
      </div>
    </div>
  );
}
