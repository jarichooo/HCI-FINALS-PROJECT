import Layout from "../components/Layout";
import Button from "../components/Button";

const roles = [
  { label: "Administrator",       key: "admin",     active: false },
  { label: "Instructor",          key: "instructor", active: false },
  { label: "Student",             key: "student",    active: true  },
  { label: "Parent",              key: "parent",     active: false },
  { label: "Apply for Admission", key: "admission",  active: false },
];

export default function RoleSelection({ onSelectRole }) {
  return (
    <Layout>
      <div style={styles.wrapper} className="rs-wrapper">
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .rs-wrapper { animation: fadeSlideUp 0.45s ease both; }
          .rs-role-btn-active:hover {
            background: var(--primary-hover) !important;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px var(--shadow-btn) !important;
          }
          .rs-role-btn-active:active {
            transform: translateY(0px);
          }
        `}</style>

        {/* Header */}
        <div style={styles.header}>
          <p style={styles.subtitle}>Select your role to continue</p>
          <h1 style={styles.title}>Who are you?</h1>
        </div>

        {/* Role buttons */}
        <div style={styles.roleList}>
          {roles.map((role, i) => (
            <Button
              key={role.key}
              variant={role.active ? "primary" : "secondary"}
              size="lg"
              onClick={() => role.active && onSelectRole(role.key)}
              disabled={!role.active}
              style={{
                width: "100%",
                opacity: role.active ? 1 : 0.5,
                animation: `fadeSlideUp 0.45s ease both`,
                animationDelay: `${i * 0.07}s`,
              }}
            >
              {role.label}
            </Button>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "28px",
    padding: "0 16px",
  },
  header: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  subtitle: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontWeight: 600,
    transition: "color 0.25s",
  },
  title: {
    fontSize: "clamp(24px, 5vw, 34px)",
    color: "var(--text-primary)",
    fontFamily: "'DM Serif Display', serif",
    transition: "color 0.25s",
    margin: 0,
  },
  roleList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
};
