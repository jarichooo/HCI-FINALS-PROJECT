import PageHeader from "./PageHeader";
import Card from "./Card";

// ─── Skeleton Components ──────────────────────────────────────────────────────

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

// ─── Main Skeleton Page Component ─────────────────────────────────────────────

export default function SkeletonPage({ title, subtitle, onBack, children }) {
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

        .skeleton-container {
          animation: fadeIn 0.4s ease both;
        }

        .skeleton-section-1 {
          animation: fadeIn 0.4s ease both 0.1s;
          animation-fill-mode: both;
        }

        .skeleton-section-2 {
          animation: fadeIn 0.4s ease both 0.2s;
          animation-fill-mode: both;
        }

        .skeleton-section-3 {
          animation: fadeIn 0.4s ease both 0.3s;
          animation-fill-mode: both;
        }
      `}</style>

      {/* Header */}
      <PageHeader
        title={title}
        subtitle={subtitle}
        onBack={onBack}
      />

      {/* Main Content */}
      <div style={styles.content} className="skeleton-container">
        {children}
      </div>
    </div>
  );
}

// ─── Exported Skeleton Components for reuse ───────────────────────────────────

export function SkeletonProfileCard() {
  return (
    <Card style={styles.profileCard} className="skeleton-section-1">
      <div style={styles.profileLayout}>
        <div style={styles.avatarSkeleton}>
          <SkeletonBox width="80px" height="80px" />
        </div>

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
  );
}

export function SkeletonSummaryCard() {
  return (
    <Card style={styles.summaryCard} className="skeleton-section-2">
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
  );
}

export function SkeletonTableCard() {
  return (
    <Card style={styles.tableCard} className="skeleton-section-3">
      <div style={styles.sectionHeader}>
        <SkeletonLine width="180px" height="16px" />
      </div>

      {/* Table rows */}
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
        {[1, 2, 3, 4, 5].map((i) => (
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
    </Card>
  );
}

export function SkeletonFormCard() {
  return (
    <Card style={styles.formCard} className="skeleton-section-2">
      <div style={styles.formField}>
        <SkeletonLine width="100px" height="14px" style={{ marginBottom: "8px" }} />
        <SkeletonLine width="100%" height="40px" />
      </div>
      <div style={styles.formField}>
        <SkeletonLine width="120px" height="14px" style={{ marginBottom: "8px" }} />
        <SkeletonLine width="100%" height="40px" />
      </div>
      <div style={styles.formField}>
        <SkeletonLine width="80px" height="14px" style={{ marginBottom: "8px" }} />
        <SkeletonLine width="100%" height="40px" />
      </div>
      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
        <SkeletonLine width="100px" height="40px" />
        <SkeletonLine width="100px" height="40px" />
      </div>
    </Card>
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
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },
  statBox: {
    padding: "16px",
    background: "var(--bg-input)",
    borderRadius: "10px",
  },
  tableCard: {
    padding: "24px",
  },
  formCard: {
    padding: "24px",
  },
  sectionHeader: {
    marginBottom: "20px",
  },
  tableHeader: {
    display: "flex",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid var(--border-light)",
    marginBottom: "12px",
  },
  tableRows: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  tableRow: {
    display: "flex",
    gap: "12px",
    paddingBottom: "12px",
    borderBottom: "1px solid var(--border-light)",
  },
  formField: {
    marginBottom: "16px",
  },
};
