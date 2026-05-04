import { useTheme } from "../context/ThemeContext";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const EduCoreCapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#fff" />
    <path d="M2 17l10 5 10-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12l10 5 10-5" stroke="rgba(255,255,255,0.5)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TopBar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={styles.bar}>
      {/* Brand */}
      <div style={styles.brand}>
        <div style={styles.iconWrap}>
          <EduCoreCapIcon />
        </div>
        <span style={styles.name}>EduCore</span>
      </div>

      {/* Right side */}
      <div style={styles.right}>
        <span style={styles.version}>3.7.2.14</span>
        <button
          onClick={toggleTheme}
          style={styles.toggleBtn}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        .toggle-btn:hover { opacity: 0.75; }
      `}</style>
    </div>
  );
}

const styles = {
  bar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "44px",
    borderBottom: "1.5px solid var(--border-light)",
    background: "var(--top-bar-bg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    zIndex: 100,
    transition: "background 0.25s, border-color 0.25s",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  iconWrap: {
    width: "26px",
    height: "26px",
    borderRadius: "7px",
    background: "var(--primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.25s",
  },
  name: {
    fontWeight: 700,
    fontSize: "15px",
    color: "var(--text-primary)",
    fontFamily: "'DM Serif Display', serif",
    letterSpacing: "0.01em",
    transition: "color 0.25s",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  version: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    fontWeight: 600,
    letterSpacing: "0.05em",
    transition: "color 0.25s",
  },
  toggleBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    border: "1.5px solid var(--border-light)",
    background: "var(--toggle-bg)",
    color: "var(--toggle-icon)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.25s, border-color 0.25s, color 0.25s, opacity 0.15s",
  },
};
