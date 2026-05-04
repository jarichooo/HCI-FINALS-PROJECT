import { useState } from "react";
import { mockEnrolledSubjects, mockAssessmentPeriods } from "../data/mockData";

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default function Assessment({ onBack }) {
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const handleDownloadPDF = () => {
    alert("PDF download functionality would be implemented here");
  };

  return (
    <div style={styles.container}>
      <style>{`
        .assessment-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          animation: slideIn 0.3s ease;
        }

        .assessment-back-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          transition: opacity 0.2s;
        }

        .assessment-back-btn:hover {
          opacity: 0.7;
        }

        .assessment-title {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          font-family: 'Source Sans 3', sans-serif;
        }

        .assessment-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .assessment-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          display: block;
          margin-bottom: 8px;
        }

        .assessment-input {
          width: 100%;
          max-width: 400px;
          padding: 10px 12px;
          border: 1px solid var(--border-light);
          border-radius: 6px;
          background: var(--bg-input);
          color: var(--text-primary);
          font-size: 13px;
          font-family: 'Source Sans 3', sans-serif;
          transition: all 0.2s;
        }

        .assessment-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary-alpha);
        }

        .assessment-table-wrapper {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid var(--border-light);
          margin-bottom: 24px;
        }

        .assessment-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--bg-secondary);
        }

        .assessment-table thead {
          background: var(--bg-input);
          border-bottom: 1px solid var(--border-light);
        }

        .assessment-table th {
          padding: 12px 14px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .assessment-table td {
          padding: 12px 14px;
          font-size: 13px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-light);
        }

        .assessment-table tbody tr:hover {
          background: var(--bg-hover);
        }

        .assessment-table tbody tr:last-child td {
          border-bottom: none;
        }

        .assessment-empty {
          padding: 48px 24px;
          text-align: center;
          color: var(--text-secondary);
        }

        .assessment-empty-text {
          font-size: 14px;
          margin: 0;
        }

        .assessment-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .assessment-pdf-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: var(--primary);
          color: var(--primary-text);
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Source Sans 3', sans-serif;
        }

        .assessment-pdf-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-1px);
        }

        .assessment-pdf-btn:active {
          transform: translateY(0);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Header */}
      <div className="assessment-header">
        {onBack && (
          <button className="assessment-back-btn" onClick={onBack} title="Go back">
            <BackIcon />
          </button>
        )}
        <h1 className="assessment-title">Assessment</h1>
      </div>

      {/* Period Section */}
      <div className="assessment-section">
        <label className="assessment-label">Period:</label>
        <input
          type="text"
          className="assessment-input"
          placeholder="Select a period"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          list="period-list"
        />
        <datalist id="period-list">
          {mockAssessmentPeriods.map((period) => (
            <option key={period} value={period} />
          ))}
        </datalist>
      </div>

      {/* Enrolled Subjects Section */}
      <div className="assessment-section">
        <label className="assessment-label">Enrolled Subjects</label>
        <div className="assessment-table-wrapper">
          {mockEnrolledSubjects.length > 0 ? (
            <table className="assessment-table">
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
              <tbody>
                {mockEnrolledSubjects.map((subject) => (
                  <tr key={subject.code}>
                    <td><strong>{subject.code}</strong></td>
                    <td>{subject.subject}</td>
                    <td>{subject.description}</td>
                    <td>{subject.units}</td>
                    <td>{subject.tf}</td>
                    <td>{subject.lec}</td>
                    <td>{subject.lab}</td>
                    <td>{subject.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="assessment-empty">
              <p className="assessment-empty-text">No subjects enrolled yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer with Download Button */}
      <div className="assessment-footer">
        <button className="assessment-pdf-btn" onClick={handleDownloadPDF}>
          <DownloadIcon />
          Download PDF Copy
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    maxWidth: "1200px",
  },
};
