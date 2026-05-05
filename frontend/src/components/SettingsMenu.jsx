import { useState, useEffect, useRef } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const GearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

// ─── Shared Modal Shell ───────────────────────────────────────────────────────

function Modal({ title, icon, onClose, children }) {
  return (
    <div style={mStyles.backdrop} onClick={onClose}>
      <div style={mStyles.box} onClick={(e) => e.stopPropagation()}>
        <div style={mStyles.header}>
          <div style={mStyles.headerLeft}>
            {icon && <span style={mStyles.headerIcon}>{icon}</span>}
            <h2 style={mStyles.title}>{title}</h2>
          </div>
          <button style={mStyles.closeBtn} onClick={onClose}><CloseIcon /></button>
        </div>
        <div style={mStyles.body}>{children}</div>
      </div>
    </div>
  );
}

const mStyles = {
  backdrop:   { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9000, padding: "16px" },
  box:        { background: "var(--bg-surface)", borderRadius: "16px", border: "1.5px solid var(--border-light)", width: "100%", maxWidth: "420px", boxShadow: "0 12px 48px rgba(0,0,0,0.22)", animation: "modalPop 0.25s ease both", overflow: "hidden" },
  header:     { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px 14px", borderBottom: "1.5px solid var(--border-light)" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  headerIcon: { width: "40px", height: "40px", borderRadius: "10px", background: "var(--bg-input)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", flexShrink: 0 },
  title:      { fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Serif Display', serif", transition: "color 0.25s" },
  closeBtn:   { width: "30px", height: "30px", borderRadius: "7px", border: "1.5px solid var(--border-light)", background: "var(--bg-input)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
  body:       { padding: "20px 22px 22px" },
};

// ─── Success State ────────────────────────────────────────────────────────────

function SuccessState({ message, sub, onClose }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "8px 0" }}>
      <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", color: "#22c55e" }}>✓</div>
      <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Serif Display', serif" }}>{message}</p>
      <p style={{ fontSize: "13px", color: "var(--text-secondary)", textAlign: "center", lineHeight: 1.5 }}>{sub}</p>
      <button style={{ marginTop: "8px", padding: "10px 32px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }} onClick={onClose}>Done</button>
    </div>
  );
}

// ─── PwField — moved outside ChangePasswordModal to satisfy react/no-unstable-nested-components ──

function PwField({ label, fieldKey, value, showPw, onChange, onToggleShow }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={f.label}>{label}</label>
      <div style={f.row}>
        <input
          type={showPw ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          style={f.input}
          placeholder="••••••••"
        />
        <button type="button" style={f.eye} onClick={() => onToggleShow(fieldKey)}>
          <EyeIcon open={showPw} />
        </button>
      </div>
    </div>
  );
}

// ─── Change Password Modal ────────────────────────────────────────────────────

function ChangePasswordModal({ onClose }) {
  const [fields, setFields] = useState({ current: "", next: "", confirm: "" });
  const [show,   setShow]   = useState({ current: false, next: false, confirm: false });
  const [status, setStatus] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (k, v) => { setFields((prev) => ({ ...prev, [k]: v })); setStatus(""); };
  const handleToggleShow = (k) => setShow((prev) => ({ ...prev, [k]: !prev[k] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fields.current || !fields.next || !fields.confirm) {
      setErrMsg("Please fill in all fields."); setStatus("error"); return;
    }
    if (fields.next.length < 8) {
      setErrMsg("New password must be at least 8 characters."); setStatus("error"); return;
    }
    if (fields.next !== fields.confirm) {
      setErrMsg("New passwords do not match."); setStatus("error"); return;
    }
    setStatus("success");
  };

  return (
    <Modal
      title="Change Password"
      icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
      onClose={onClose}
    >
      {status === "success" ? (
        <SuccessState message="Password updated!" sub="Your new password is active. Use it next time you log in." onClose={onClose} />
      ) : (
        <form onSubmit={handleSubmit}>
          <PwField label="Current Password"     fieldKey="current" value={fields.current} showPw={show.current} onChange={handleChange} onToggleShow={handleToggleShow} />
          <PwField label="New Password"         fieldKey="next"    value={fields.next}    showPw={show.next}    onChange={handleChange} onToggleShow={handleToggleShow} />
          <PwField label="Confirm New Password" fieldKey="confirm" value={fields.confirm} showPw={show.confirm} onChange={handleChange} onToggleShow={handleToggleShow} />
          {status === "error" && <div style={f.err}>{errMsg}</div>}
          <button type="submit" style={f.submit}>Update Password</button>
        </form>
      )}
    </Modal>
  );
}

const f = {
  label:  { display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "5px", letterSpacing: "0.03em" },
  row:    { display: "flex", alignItems: "center", height: "42px", border: "1.5px solid var(--border-input)", borderRadius: "8px", background: "var(--bg-input)", overflow: "hidden" },
  input:  { flex: 1, height: "100%", padding: "0 12px", border: "none", background: "transparent", fontSize: "14px", color: "var(--text-primary)", outline: "none" },
  eye:    { width: "38px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", cursor: "pointer", color: "var(--text-secondary)" },
  err:    { background: "rgba(224,82,82,0.1)", border: "1.5px solid rgba(224,82,82,0.3)", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#e05252", fontWeight: 600, marginBottom: "12px", marginTop: "4px" },
  submit: { width: "100%", height: "44px", background: "var(--primary)", color: "var(--primary-text)", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginTop: "4px", letterSpacing: "0.05em" },
};

// ─── Help Modal ───────────────────────────────────────────────────────────────

function HelpModal({ onClose, onShowGuide }) {
  const features = [
    ["📋", "Pre-enlistment & Enrollment", "Manage your subjects each semester."],
    ["📊", "Assessment & Amount Due",      "View your grades and outstanding balance."],
    ["💳", "Payments",                     "Track and process your school payments."],
    ["📝", "Teacher Evaluation",           "Submit your faculty evaluations."],
    ["📄", "Reports",                      "Access your academic records and transcripts."],
  ];

  return (
    <Modal
      title="Help & About"
      icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
      onClose={onClose}
    >
      <div style={{ marginBottom: "16px" }}>
        <p style={h.sectionLabel}>What is EduCore?</p>
        <p style={h.text}>EduCore is a redesigned student academic services portal for Camarines Sur Polytechnic Colleges — bringing enrollment, assessment, payments, and more into one clean platform.</p>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <p style={h.sectionLabel}>What can I do here?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          {features.map(([emoji, label, desc]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "4px" }}>
              <span style={{ fontSize: "17px" }}>{emoji}</span>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", margin: 0, transition: "color 0.25s" }}>{label}</p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0, transition: "color 0.25s" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: "1.5px", background: "var(--border-light)", margin: "4px 0 14px" }} />

      <button style={h.guideBtn} onClick={() => { onClose(); onShowGuide(); }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
        </svg>
        Show Guide Modals
      </button>
    </Modal>
  );
}

const h = {
  sectionLabel: { fontSize: "11px", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "7px", transition: "color 0.25s" },
  text:         { fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.65, transition: "color 0.25s" },
  guideBtn:     { width: "100%", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "var(--bg-input)", border: "1.5px solid var(--border-input)", borderRadius: "9px", fontSize: "13px", fontWeight: 700, color: "var(--primary)", cursor: "pointer", letterSpacing: "0.02em" },
};

// ─── Support Modal ────────────────────────────────────────────────────────────

function SupportModal({ onClose }) {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Modal
      title="Contact Support"
      icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
      onClose={onClose}
    >
      {submitted ? (
        <SuccessState message="Request sent!" sub={`Our support team will reach out to ${email} shortly.`} onClose={onClose} />
      ) : (
        <>
          <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "14px" }}>
            Enter your email address and our support team will get back to you as soon as possible.
          </p>
          <label style={f.label}>Your Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: "100%", height: "44px", padding: "0 14px", border: "1.5px solid var(--border-input)", borderRadius: "8px", fontSize: "14px", color: "var(--text-primary)", background: "var(--bg-input)", outline: "none", marginBottom: "12px", display: "block" }}
          />
          <button style={f.submit} onClick={() => { if (email) setSubmitted(true); }}>OK</button>
        </>
      )}
    </Modal>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function SettingsMenu({ onShowGuide }) {
  const [open,  setOpen]  = useState(false);
  const [modal, setModal] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const openModal = (name) => { setModal(name); setOpen(false); };

  return (
    <>
      <div ref={ref} style={{ position: "relative" }}>
        <button
          style={{ ...s.gearBtn, background: open ? "var(--bg-input)" : "transparent" }}
          onClick={() => setOpen((o) => !o)}
          title="Settings"
          data-guide="topbar-actions"
        >
          <GearIcon />
        </button>

        {open && (
          <div style={s.dropdown}>
            <div style={s.dropHeader}>
              <span style={s.dropIcon}><GearIcon /></span>
              <div>
                <p style={s.dropTitle}>Settings</p>
                <p style={s.dropSub}>Adjust settings menu</p>
              </div>
            </div>
            {[
              { key: "password", label: "Change Password" },
              { key: "help",     label: "Help" },
              { key: "support",  label: "Support" },
            ].map((item, i, arr) => (
              <button
                key={item.key}
                style={{ ...s.dropItem, borderBottom: i < arr.length - 1 ? "1px solid var(--border-light)" : "none" }}
                onClick={() => openModal(item.key)}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-input)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {modal === "password" && <ChangePasswordModal onClose={() => setModal(null)} />}
      {modal === "help"     && <HelpModal onClose={() => setModal(null)} onShowGuide={onShowGuide} />}
      {modal === "support"  && <SupportModal onClose={() => setModal(null)} />}

      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes dropdownPop {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        input::placeholder { color: var(--text-placeholder); }
      `}</style>
    </>
  );
}

const s = {
  gearBtn:    { width: "36px", height: "36px", borderRadius: "9px", border: "1.5px solid var(--border-light)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.15s" },
  dropdown:   { position: "absolute", top: "calc(100% + 8px)", right: 0, width: "220px", background: "var(--bg-surface)", border: "1.5px solid var(--border-light)", borderRadius: "14px", boxShadow: "0 8px 32px var(--shadow-card)", overflow: "hidden", animation: "dropdownPop 0.2s ease both", zIndex: 500 },
  dropHeader: { display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px 12px", borderBottom: "1.5px solid var(--border-light)" },
  dropIcon:   { width: "34px", height: "34px", borderRadius: "8px", background: "var(--bg-input)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", flexShrink: 0 },
  dropTitle:  { fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Serif Display', serif", transition: "color 0.25s" },
  dropSub:    { fontSize: "11px", color: "var(--text-secondary)", transition: "color 0.25s" },
  dropItem:   { width: "100%", padding: "12px 16px", textAlign: "left", background: "transparent", border: "none", fontSize: "13.5px", color: "var(--text-primary)", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", transition: "background 0.15s" },
};
