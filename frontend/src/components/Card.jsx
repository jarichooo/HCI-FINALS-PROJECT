/**
 * Unified Card Component
 * Consistent styling for all card containers
 */
export default function Card({ children, className = "", style = {}, onClick, interactive = false }) {
  return (
    <div
      className={`unified-card ${className}`}
      onClick={onClick}
      style={{
        background: "var(--bg-surface)",
        borderRadius: "12px",
        border: "1px solid var(--border-light)",
        padding: "20px",
        boxShadow: "0 2px 8px var(--shadow-card)",
        transition: "all 0.25s ease",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={(e) =>
        interactive &&
        Object.assign(e.currentTarget.style, {
          borderColor: "var(--border-focus)",
          boxShadow: "0 4px 16px var(--shadow-card)",
          transform: "translateY(-2px)",
        })
      }
      onMouseLeave={(e) =>
        interactive &&
        Object.assign(e.currentTarget.style, {
          borderColor: "var(--border-light)",
          boxShadow: "0 2px 8px var(--shadow-card)",
          transform: "translateY(0)",
        })
      }
    >
      {children}
    </div>
  );
}
