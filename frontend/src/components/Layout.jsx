import TopBar from "./TopBar";

export default function Layout({ children }) {
  return (
    <div style={styles.root}>
      {/* Full-viewport background */}
      <div style={styles.bgPage} />

      {/* Subtle grid overlay */}
      <div style={styles.bgGrid} />

      {/* Top navigation bar */}
      <TopBar />

      {/* Page content — padded below topbar */}
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  root: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    fontFamily: "'Source Sans 3', sans-serif",
  },
  bgPage: {
    position: "fixed",
    inset: 0,
    background: "var(--bg-page)",
    transition: "background 0.25s",
    zIndex: 0,
  },
  bgGrid: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(var(--bg-grid) 1px, transparent 1px), linear-gradient(90deg, var(--bg-grid) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
    zIndex: 1,
  },
  main: {
    position: "relative",
    zIndex: 2,
    paddingTop: "44px",      // height of TopBar
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "calc(44px + 32px) 16px 40px",
  },
};
