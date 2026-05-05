import { useTheme } from "../../context/ThemeContext";
import PageHeader from "../../components/PageHeader";
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

// ─── Skeleton Loader ──────────────────────────────────────────────────────────

function SkeletonLine({ width = "100%", height = "12px", style = {} }) {
  return (
    <div
      style={{
        height,
        width,
        background: "var(--skeleton-bg)",
        borderRadius: "6px",
        animation: "skeletonPulse 1.5s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

function SkeletonBox({ width = "80px", height = "80px", style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        background: "var(--skeleton-bg)",
        borderRadius: "8px",
        animation: "skeletonPulse 1.5s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TranscriptOfRecords({ onBack }) {
  const { isDark } = useTheme();

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes skeletonPulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tor-container {
          animation: fadeIn 0.4s ease both;
        }

        .tor-profile-section {
          animation: fadeIn 0.4s ease both 0.1s;
          animation-fill-mode: both;
        }

        .tor-summary-section {
          animation: fadeIn 0.4s ease both 0.2s;
          animation-fill-mode: both;
        }

        .tor-content-section {
          animation: fadeIn 0.4s ease both 0.3s;
          animation-fill-mode: both;
        }
      `}</style>

      {/* Header */}
      <PageHeader
        title="Transcript of Records"
        subtitle="Academic transcript and cumulative records"
        onBack={onBack}
      />

      {/* Main Content */}
      <div style={styles.content} className="tor-container">
        {/* Profile Info Section */}
        <Card style={styles.profileCard} className="tor-profile-section">
          <div style={styles.profileLayout}>
            {/* Avatar Skeleton */}
            <div style={styles.avatarSkeleton}>
              <SkeletonBox width="80px" height="80px" />
            </div>

            {/* Profile Info Skeleton */}
            <div style={styles.profileInfo}>
              <SkeletonLine width="180px" height="18px" style={{ marginBottom: "12px" }} />
              <SkeletonLine width="140px" height="14px" style={{ marginBottom: "16px" }} />
              <div style={styles.infoGrid}>
                <div>
                  <SkeletonLine width="60px" height="11px" style={{ marginBottom: "6px" }} />
                  <SkeletonLine width="100px" height="13px" />
                </div>
                <div>
                  <SkeletonLine width="60px" height="11px" style={{ marginBottom: "6px" }} />
                  <SkeletonLine width="100px" height="13px" />
                </div>
                <div>
                  <SkeletonLine width="60px" height="11px" style={{ marginBottom: "6px" }} />
                  <SkeletonLine width="100px" height="13px" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Stats Section */}
        <Card style={styles.summaryCard} className="tor-summary-section">
          <div style={styles.summaryTitle}>
            <SkeletonLine width="140px" height="16px" />
          </div>
          <div style={styles.statsGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={styles.statBox}>
                <SkeletonLine width="60px" height="12px" style={{ marginBottom: "8px" }} />
                <SkeletonLine width="80px" height="24px" />
              </div>
            ))}
          </div>
        </Card>

        {/* Academic Records Section */}
        <Card style={styles.recordsCard} className="tor-content-section">
          <div style={styles.sectionHeader}>
            <SkeletonLine width="180px" height="16px" />
          </div>

          {/* Year 1 */}
          <div style={styles.yearBlock}>
            <div style={styles.yearHeader}>
              <SkeletonLine width="120px" height="14px" />
            </div>
            <div style={styles.tableHeader}>
              <div style={{ flex: "1" }}>
                <SkeletonLine width="50px" height="12px" />
              </div>
              <div style={{ flex: "2" }}>
                <SkeletonLine width="80px" height="12px" />
              </div>
              <div style={{ flex: "1" }}>
                <SkeletonLine width="60px" height="12px" />
              </div>
              <div style={{ flex: "1" }}>
                <SkeletonLine width="50px" height="12px" />
              </div>
            </div>
            <div style={styles.tableRows}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={styles.tableRow}>
                  <div style={{ flex: "1" }}>
                    <SkeletonLine width="50px" height="12px" />
                  </div>
                  <div style={{ flex: "2" }}>
                    <SkeletonLine width="100%" height="12px" />
                  </div>
                  <div style={{ flex: "1" }}>
                    <SkeletonLine width="60px" height="12px" />
                  </div>
                  <div style={{ flex: "1" }}>
                    <SkeletonLine width="50px" height="12px" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Year 2 */}
          <div style={styles.yearBlock}>
            <div style={styles.yearHeader}>
              <SkeletonLine width="120px" height="14px" />
            </div>
            <div style={styles.tableHeader}>
              <div style={{ flex: "1" }}>
                <SkeletonLine width="50px" height="12px" />
              </div>
              <div style={{ flex: "2" }}>
                <SkeletonLine width="80px" height="12px" />
              </div>
              <div style={{ flex: "1" }}>
                <SkeletonLine width="60px" height="12px" />
              </div>
              <div style={{ flex: "1" }}>
                <SkeletonLine width="50px" height="12px" />
              </div>
            </div>
            <div style={styles.tableRows}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={styles.tableRow}>
                  <div style={{ flex: "1" }}>
                    <SkeletonLine width="50px" height="12px" />
                  </div>
                  <div style={{ flex: "2" }}>
                    <SkeletonLine width="100%" height="12px" />
                  </div>
                  <div style={{ flex: "1" }}>
                    <SkeletonLine width="60px" height="12px" />
                  </div>
                  <div style={{ flex: "1" }}>
                    <SkeletonLine width="50px" height="12px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Additional Information Section */}
        <Card style={styles.additionalCard} className="tor-content-section">
          <div style={styles.sectionHeader}>
            <SkeletonLine width="160px" height="16px" />
          </div>
          <div style={styles.infoSection}>
            <SkeletonLine width="100%" height="12px" style={{ marginBottom: "10px" }} />
            <SkeletonLine width="95%" height="12px" style={{ marginBottom: "10px" }} />
            <SkeletonLine width="90%" height="12px" />
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "32px 40px 40px",
    overflowY: "auto",
  },
  profileCard: {
    padding: "28px",
  },
  profileLayout: {
    display: "flex",
    gap: "28px",
    alignItems: "flex-start",
  },
  avatarSkeleton: {
    flexShrink: 0,
  },
  profileInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    marginTop: "16px",
  },
  summaryCard: {
    padding: "24px",
  },
  summaryTitle: {
    marginBottom: "20px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "16px",
  },
  statBox: {
    padding: "16px",
    background: "var(--bg-secondary)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  recordsCard: {
    padding: "24px",
  },
  sectionHeader: {
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1.5px solid var(--border-light)",
  },
  yearBlock: {
    marginBottom: "24px",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  yearHeader: {
    marginBottom: "12px",
  },
  tableHeader: {
    display: "flex",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1.5px solid var(--border-light)",
    marginBottom: "8px",
  },
  tableRows: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  tableRow: {
    display: "flex",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid var(--border-light)",
    alignItems: "center",
  },
  additionalCard: {
    padding: "24px",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};
