import Layout from "../components/Layout";

export default function RoleSelection({ onSelectRole }) {
  return (
    <Layout>
      <div style={styles.content}>
        <h1 style={styles.title}>Role Selection</h1>
        <p style={styles.sub}>Page coming soon — choose your role to continue.</p>
        <button style={styles.btn} onClick={() => onSelectRole("student")}>
          Continue as Student →
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rs-content { animation: fadeSlideUp 0.45s ease both; }
        .rs-btn:hover { background: var(--primary-hover) !important; transform: translateY(-1px); }
      `}</style>
    </Layout>
  );
}

const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    textAlign: "center",
    padding: "0 16px",
  },
  title: {
    fontSize: "clamp(22px, 5vw, 32px)",
    color: "var(--text-primary)",
    fontFamily: "'DM Serif Display', serif",
    transition: "color 0.25s",
  },
  sub: {
    fontSize: "clamp(13px, 3vw, 15px)",
    color: "var(--text-secondary)",
    transition: "color 0.25s",
  },
  btn: {
    marginTop: "8px",
    padding: "12px 32px",
    background: "var(--primary)",
    color: "var(--primary-text)",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.05em",
    transition: "background 0.2s, transform 0.15s",
  },
};
