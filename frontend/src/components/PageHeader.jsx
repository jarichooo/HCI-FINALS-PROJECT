/**
 * Unified Page Header Component
 * Consistent styling for page headers with optional back button and subtitle
 */
export default function PageHeader({ title, subtitle, onBack, children }) {
  const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );

  return (
    <div style={styles.header}>
      {onBack && (
        <button onClick={onBack} style={styles.backBtn} title="Go back">
          <BackIcon />
        </button>
      )}
      <div style={styles.content}>
        {title && <h1 style={styles.title}>{title}</h1>}
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "28px",
    width: "100%",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    padding: 0,
    background: "var(--bg-secondary)",
    border: "1.5px solid var(--border-light)",
    borderRadius: "8px",
    color: "var(--text-secondary)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    flexShrink: 0,
    marginTop: "2px",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  title: {
    fontSize: "clamp(24px, 4vw, 28px)",
    fontFamily: "'Source Sans 3', sans-serif",
    fontWeight: 700,
    color: "var(--text-primary)",
    margin: 0,
    transition: "color 0.25s",
  },
  subtitle: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    margin: 0,
    transition: "color 0.25s",
  },
};
