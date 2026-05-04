import { useState } from "react";
import Layout from "../components/Layout";
import FormCard from "../components/FormCard";
import { validateStudent } from "../data/mockData";

// ─── Icons ───────────────────────────────────────────────────────────────────

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const EduCoreLogo = ({ size = 72 }) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="36" cy="36" r="36" fill="var(--primary)" style={{ transition: "fill 0.25s" }} />
    <path d="M36 18L14 29l22 11 22-11-22-11z" fill="#ffffff" />
    <path d="M14 34.5L36 45.5l22-11" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 40L36 51l22-11" stroke="#c8d6f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="58" y1="29" x2="58" y2="41" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="58" cy="43.5" r="2.5" fill="#ffffff" />
  </svg>
);

const StudentIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--text-primary)"
    xmlns="http://www.w3.org/2000/svg" style={{ transition: "fill 0.25s", flexShrink: 0 }}>
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
    <path d="M5 13.18V17l7 4 7-4v-3.82L12 17l-7-3.82z" />
  </svg>
);

const BackIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="var(--text-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
    stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function StudentLogin({ onBack }) {
  const [studentId, setStudentId]       = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [idFocused, setIdFocused]       = useState(false);
  const [passFocused, setPassFocused]   = useState(false);
  const [shake, setShake]               = useState(false);
  const [error, setError]               = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null); // holds user object on success

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Empty field validation
    if (!studentId || !password) {
      setError("Please fill in all fields.");
      triggerShake();
      return;
    }

    // Simulate network delay, then validate against mockData
    setIsLoading(true);
    setTimeout(() => {
      const user = validateStudent(studentId, password);
      if (user) {
        setLoggedInUser(user); // ✅ success
      } else {
        setError("Invalid Student ID or password."); // ❌ fail
        triggerShake();
      }
      setIsLoading(false);
    }, 1200);
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (loggedInUser) {
    return (
      <Layout>
        <div style={styles.card} className="sl-card">
          <style>{`
            @keyframes fadeSlideUp {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes popIn {
              0%   { transform: scale(0.6); opacity: 0; }
              70%  { transform: scale(1.1); }
              100% { transform: scale(1);   opacity: 1; }
            }
            .sl-card       { animation: fadeSlideUp 0.5s ease both; }
            .sl-check-icon { animation: popIn 0.5s ease both 0.2s; opacity: 0; }
          `}</style>

          <EduCoreLogo size={68} />

          <div style={styles.successBox}>
            <div className="sl-check-icon">
              <CheckIcon />
            </div>
            <h2 style={styles.successTitle}>Login Successful!</h2>
            <p style={styles.successName}>Welcome back, <strong>{loggedInUser.name}</strong>!</p>
            <p style={styles.successSub}>Student dashboard coming soon.</p>
          </div>

          <button className="sl-back" style={styles.backBtn} onClick={onBack}>
            <BackIcon />
            <span style={styles.backLabel}>Back to role selection</span>
          </button>
        </div>
      </Layout>
    );
  }

  // ── Login form ──────────────────────────────────────────────────────────────
  return (
    <Layout>
      <div style={styles.card} className="sl-card">
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes shake {
            0%,100% { transform: translateX(0); }
            20%     { transform: translateX(-8px); }
            40%     { transform: translateX(8px); }
            60%     { transform: translateX(-5px); }
            80%     { transform: translateX(5px); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes errorIn {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .sl-card { animation: fadeSlideUp 0.5s ease both; }
          input::placeholder { color: var(--text-placeholder); }
          input:focus  { outline: none; }
          button:focus { outline: none; }
          .sl-login-btn:hover:not(:disabled) {
            background: var(--primary-hover) !important;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px var(--shadow-btn) !important;
          }
          .sl-back:hover   { opacity: 0.65; }
          .sl-forgot:hover { text-decoration: underline; }
          .sl-eye:hover    { color: var(--text-primary); }
          .sl-error        { animation: errorIn 0.25s ease both; }

          @media (max-width: 500px) {
            .sl-form-card-inner { padding: 28px 20px 24px !important; }
            .sl-card { width: 100% !important; }
          }
        `}</style>

        {/* Brand mark */}
        <div style={styles.header}>
          <EduCoreLogo size={68} />
          <p style={styles.brandName}>EduCore</p>
        </div>

        {/* Form card */}
        <FormCard shake={shake} innerClassName="sl-form-card-inner">
          <div style={styles.formHeader}>
            <StudentIcon />
            <h2 style={styles.formTitle}>Student Login</h2>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>

            {/* Student ID */}
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => { setStudentId(e.target.value); setError(""); }}
              onFocus={() => setIdFocused(true)}
              onBlur={() => setIdFocused(false)}
              style={{
                ...styles.input,
                borderColor: error
                  ? "rgba(220,38,38,0.5)"
                  : idFocused ? "var(--border-focus)" : "var(--border-input)",
                boxShadow: idFocused ? "0 0 0 3px var(--shadow-focus)" : "none",
              }}
            />

            {/* Password */}
            <div style={{
              ...styles.passwordWrapper,
              borderColor: error
                ? "rgba(220,38,38,0.5)"
                : passFocused ? "var(--border-focus)" : "var(--border-input)",
              boxShadow: passFocused ? "0 0 0 3px var(--shadow-focus)" : "none",
            }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
                style={styles.passwordInput}
              />
              <button
                type="button"
                className="sl-eye"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
                title={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="sl-error" style={styles.errorMsg}>
                ⚠ {error}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              className="sl-login-btn"
              style={{ ...styles.loginBtn, opacity: isLoading ? 0.8 : 1 }}
              disabled={isLoading}
            >
              {isLoading ? <span style={styles.spinner} /> : "LOGIN"}
            </button>

            <a href="#" className="sl-forgot" style={styles.forgotLink}>
              Forgot Password?
            </a>
          </form>
        </FormCard>

        {/* Back button */}
        <button className="sl-back" style={styles.backBtn} onClick={onBack}>
          <BackIcon />
          <span style={styles.backLabel}>Back to role selection</span>
        </button>
      </div>
    </Layout>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  card: {
    width: "100%",
    maxWidth: "460px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  brandName: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "21px",
    color: "var(--text-primary)",
    letterSpacing: "0.02em",
    transition: "color 0.25s",
  },
  formHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "24px",
  },
  formTitle: {
    fontSize: "21px",
    fontWeight: 700,
    color: "var(--text-primary)",
    fontFamily: "'DM Serif Display', serif",
    transition: "color 0.25s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    width: "100%",
    height: "46px",
    padding: "0 14px",
    border: "1.5px solid",
    borderRadius: "8px",
    fontSize: "15px",
    color: "var(--text-primary)",
    background: "var(--bg-input)",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.25s, color 0.25s",
  },
  passwordWrapper: {
    display: "flex",
    alignItems: "center",
    height: "46px",
    border: "1.5px solid",
    borderRadius: "8px",
    background: "var(--bg-input)",
    overflow: "hidden",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.25s",
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    padding: "0 14px",
    border: "none",
    background: "transparent",
    fontSize: "15px",
    color: "var(--text-primary)",
    transition: "color 0.25s",
  },
  eyeBtn: {
    width: "42px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "var(--text-secondary)",
    flexShrink: 0,
    transition: "color 0.15s",
  },
  errorMsg: {
    background: "rgba(220,38,38,0.08)",
    border: "1.5px solid rgba(220,38,38,0.25)",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#dc2626",
    textAlign: "center",
    fontWeight: 600,
  },
  loginBtn: {
    width: "100%",
    height: "46px",
    background: "var(--primary)",
    color: "var(--primary-text)",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    cursor: "pointer",
    marginTop: "4px",
    transition: "background 0.2s, transform 0.15s, box-shadow 0.2s, opacity 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
  forgotLink: {
    textAlign: "center",
    fontSize: "13px",
    color: "var(--text-secondary)",
    textDecoration: "none",
    display: "block",
    transition: "color 0.25s",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "8px",
    transition: "opacity 0.15s",
  },
  backLabel: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    fontFamily: "'Source Sans 3', sans-serif",
    transition: "color 0.25s",
  },

  // Success screen
  successBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "36px 40px",
    background: "var(--bg-surface)",
    borderRadius: "16px",
    border: "1.5px solid var(--border-light)",
    boxShadow: "0 4px 32px var(--shadow-card)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  successTitle: {
    fontSize: "22px",
    fontFamily: "'DM Serif Display', serif",
    color: "var(--text-primary)",
    margin: 0,
    transition: "color 0.25s",
  },
  successName: {
    fontSize: "15px",
    color: "var(--text-secondary)",
    margin: 0,
    transition: "color 0.25s",
  },
  successSub: {
    fontSize: "13px",
    color: "var(--text-placeholder)",
    margin: 0,
    transition: "color 0.25s",
  },
};
