import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

// ─── Icons ────────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
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
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const WarningIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      fill="rgba(220,38,38,0.12)" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="9" x2="12" y2="13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="#dc2626" />
  </svg>
);

// ─── Sidebar config ───────────────────────────────────────────────────────────

const TRANSACTIONS = [
  {
    group: "Academic",
    items: ["Pre-enlistment", "Enrollment", "Add / Drop Subject", "Assessment"],
  },
  {
    group: "Finance",
    items: ["Amount Due", "Get Transaction Number", "Payment", "Failed Subjects Payment"],
  },
  {
    group: "Services",
    items: ["Teacher Evaluation", "Disable ID Card"],
  },
];

const REPORTS = [
  {
    group: "Academic Records",
    items: ["Class Schedule", "Grades", "Transcript of Records"],
  },
  {
    group: "Financial Records",
    items: ["Statement of Account", "Payment History"],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardLayout({ user, onLogout, children, activePage, onNavigate }) {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab]       = useState("transactions");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeNav, setActiveNav]       = useState(activePage || null);

  const navGroups = activeTab === "transactions" ? TRANSACTIONS : REPORTS;

  const handleNavClick = (item) => {
    setActiveNav(item);
    if (onNavigate) onNavigate(item);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    if (onLogout) onLogout();
  };

  // Avatar initials fallback
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "S";

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@400;600;700&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes sidebarIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .db-root        { animation: fadeIn 0.35s ease both; }
        .db-sidebar     { animation: sidebarIn 0.4s ease both; }
        .db-main        { animation: slideUp 0.4s ease both 0.1s; opacity: 0; animation-fill-mode: forwards; }

        .db-icon-btn:hover  { opacity: 0.7; background: var(--toggle-bg) !important; }
        .db-nav-item:hover  { background: var(--bg-input) !important; color: var(--text-primary) !important; }
        .db-nav-item.active { background: var(--primary) !important; color: var(--primary-text) !important; font-weight: 700; }
        .db-tab:hover       { opacity: 0.85; }
        .db-logout-cancel:hover { background: var(--bg-input) !important; }
        .db-logout-confirm:hover { background: #b91c1c !important; }
        .db-user-btn:hover  { background: var(--bg-input) !important; }

        /* Scrollbar styling for sidebar */
        .db-sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .db-sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .db-sidebar-scroll::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 4px; }
      `}</style>

      {/* ── Background ── */}
      <div style={styles.bgPage} />
      <div style={styles.bgGrid} />

      {/* ── Header ── */}
      <header style={styles.header} className="db-root">

        {/* Left: user info */}
        <button className="db-user-btn" style={styles.userBtn}>
          <div style={styles.avatar}>{initials}</div>
          <div style={styles.userInfo}>
            <span style={styles.userName}>{user?.name || "Student"}</span>
            <span style={styles.userEmail}>{user?.email || "student@educore.edu.ph"}</span>
          </div>
          <ChevronDown />
        </button>

        {/* Center: brand */}
        <div style={styles.brand}>
          <span style={styles.brandName}>EduCore</span>
          <span style={styles.brandVersion}>3.7.2.14</span>
        </div>

        {/* Right: actions */}
        <div style={styles.headerRight}>
          {/* Theme toggle */}
          <button
            className="db-icon-btn"
            onClick={toggleTheme}
            style={styles.iconBtn}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Settings */}
          <button className="db-icon-btn" style={styles.iconBtn} title="Settings">
            <SettingsIcon />
          </button>

          {/* Logout */}
          <button
            className="db-icon-btn"
            style={{ ...styles.iconBtn, color: "#dc2626", borderColor: "rgba(220,38,38,0.25)" }}
            title="Log out"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogoutIcon />
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={styles.body}>

        {/* ── Sidebar ── */}
        <aside style={styles.sidebar} className="db-sidebar db-sidebar-scroll">

          {/* Transactions / Reports tab */}
          <div style={styles.tabRow}>
            {["transactions", "reports"].map((tab) => (
              <button
                key={tab}
                className="db-tab"
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab ? styles.tabActive : styles.tabInactive),
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Nav groups */}
          <nav style={styles.nav}>
            {navGroups.map((group) => (
              <div key={group.group} style={styles.navGroup}>
                <p style={styles.navGroupLabel}>{group.group}</p>
                {group.items.map((item) => (
                  <button
                    key={item}
                    className={`db-nav-item${activeNav === item ? " active" : ""}`}
                    onClick={() => handleNavClick(item)}
                    style={styles.navItem}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main style={styles.main} className="db-main">
          {children}
        </main>
      </div>

      {/* ── Logout modal ── */}
      {showLogoutModal && (
        <div style={styles.modalOverlay} onClick={() => setShowLogoutModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <WarningIcon />
            <div style={styles.modalText}>
              <h3 style={styles.modalTitle}>Log out?</h3>
              <p style={styles.modalSub}>Are you sure you want to log out?</p>
            </div>
            <div style={styles.modalBtns}>
              <button
                className="db-logout-cancel"
                style={styles.modalCancel}
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="db-logout-confirm"
                style={styles.modalConfirm}
                onClick={confirmLogout}
              >
                Yes, log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const HEADER_H = "56px";
const SIDEBAR_W = "240px";

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

  // Header
  header: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    height: HEADER_H,
    background: "var(--top-bar-bg)",
    borderBottom: "1.5px solid var(--border-light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    zIndex: 100,
    transition: "background 0.25s, border-color 0.25s",
  },
  userBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "10px",
    transition: "background 0.2s",
    color: "var(--text-primary)",
    minWidth: 0,
    flex: "0 0 auto",
  },
  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "var(--primary)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 700,
    flexShrink: 0,
    transition: "background 0.25s",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1px",
  },
  userName: {
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--text-primary)",
    transition: "color 0.25s",
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },
  userEmail: {
    fontSize: "11px",
    color: "var(--text-secondary)",
    transition: "color 0.25s",
    whiteSpace: "nowrap",
  },
  brand: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1px",
    pointerEvents: "none",
  },
  brandName: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "17px",
    fontWeight: 700,
    color: "var(--text-primary)",
    letterSpacing: "0.02em",
    transition: "color 0.25s",
    lineHeight: 1.1,
  },
  brandVersion: {
    fontSize: "10px",
    color: "var(--text-secondary)",
    fontWeight: 600,
    letterSpacing: "0.06em",
    transition: "color 0.25s",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: "0 0 auto",
  },
  iconBtn: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    border: "1.5px solid var(--border-light)",
    background: "transparent",
    color: "var(--text-secondary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.2s, opacity 0.15s, border-color 0.25s, color 0.25s",
  },

  // Body
  body: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    paddingTop: HEADER_H,
    minHeight: "100vh",
  },

  // Sidebar
  sidebar: {
    position: "fixed",
    top: HEADER_H,
    left: 0,
    bottom: 0,
    width: SIDEBAR_W,
    background: "var(--bg-surface)",
    borderRight: "1.5px solid var(--border-light)",
    display: "flex",
    flexDirection: "column",
    padding: "16px 12px",
    gap: "16px",
    overflowY: "auto",
    zIndex: 50,
    transition: "background 0.25s, border-color 0.25s",
  },
  tabRow: {
    display: "flex",
    background: "var(--bg-input)",
    borderRadius: "10px",
    padding: "3px",
    gap: "2px",
    flexShrink: 0,
  },
  tab: {
    flex: 1,
    height: "32px",
    border: "none",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.03em",
    transition: "background 0.2s, color 0.2s, opacity 0.15s",
    fontFamily: "'Source Sans 3', sans-serif",
  },
  tabActive: {
    background: "var(--primary)",
    color: "var(--primary-text)",
    boxShadow: "0 2px 8px var(--shadow-btn)",
  },
  tabInactive: {
    background: "transparent",
    color: "var(--text-secondary)",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  navGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  navGroupLabel: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--text-placeholder)",
    padding: "0 8px",
    marginBottom: "4px",
    transition: "color 0.25s",
  },
  navItem: {
    width: "100%",
    padding: "9px 12px",
    border: "none",
    borderRadius: "8px",
    background: "transparent",
    color: "var(--text-secondary)",
    fontSize: "13px",
    fontWeight: 600,
    textAlign: "left",
    cursor: "pointer",
    transition: "background 0.15s, color 0.15s",
    fontFamily: "'Source Sans 3', sans-serif",
  },

  // Main
  main: {
    marginLeft: SIDEBAR_W,
    flex: 1,
    padding: "32px",
    minHeight: `calc(100vh - ${HEADER_H})`,
    display: "flex",
    flexDirection: "column",
  },

  // Logout modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(3px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
    animation: "fadeIn 0.2s ease",
  },
  modal: {
    background: "var(--bg-surface)",
    border: "1.5px solid var(--border-light)",
    borderRadius: "16px",
    padding: "32px 28px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    maxWidth: "320px",
    width: "90%",
    boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
    animation: "slideUp 0.25s ease",
  },
  modalText: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  modalTitle: {
    fontSize: "20px",
    fontFamily: "'DM Serif Display', serif",
    color: "var(--text-primary)",
    margin: 0,
    transition: "color 0.25s",
  },
  modalSub: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    margin: 0,
    transition: "color 0.25s",
  },
  modalBtns: {
    display: "flex",
    gap: "10px",
    width: "100%",
  },
  modalCancel: {
    flex: 1,
    height: "40px",
    borderRadius: "8px",
    border: "1.5px solid var(--border-light)",
    background: "transparent",
    color: "var(--text-secondary)",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.15s",
    fontFamily: "'Source Sans 3', sans-serif",
  },
  modalConfirm: {
    flex: 1,
    height: "40px",
    borderRadius: "8px",
    border: "none",
    background: "#dc2626",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.15s",
    fontFamily: "'Source Sans 3', sans-serif",
  },
};
