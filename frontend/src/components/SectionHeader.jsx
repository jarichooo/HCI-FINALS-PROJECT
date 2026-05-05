/**
 * Unified Section Header Component
 * For consistent headers within pages for different sections
 */
export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {title && <h2 style={styles.title}>{title}</h2>}
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>
      {action && <div style={styles.action}>{action}</div>}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid var(--border-light)",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 700,
    color: "var(--text-primary)",
    margin: 0,
    transition: "color 0.25s",
  },
  subtitle: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    margin: 0,
    transition: "color 0.25s",
  },
  action: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },
};
