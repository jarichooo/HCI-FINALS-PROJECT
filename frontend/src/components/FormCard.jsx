export default function FormCard({ children, shake = false, className = "", innerClassName = "", style = {} }) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        background: "var(--bg-surface)",
        borderRadius: "16px",
        border: "1.5px solid var(--border-light)",
        padding: "32px 36px 28px",
        boxShadow: "0 4px 32px var(--shadow-card)",
        transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
        animation: shake ? "shake 0.4s ease" : "none",
        ...style,
      }}
    >
      <div className={innerClassName}>
        {children}
      </div>
    </div>
  );
}
