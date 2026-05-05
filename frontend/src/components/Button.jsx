/**
 * Unified Button Component
 * Supports multiple variants: primary, secondary, ghost, destructive
 * Consistent styling, padding, and hover states
 */
export default function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  style = {},
  title,
}) {
  const variants = {
    primary: {
      default: {
        background: "var(--primary)",
        color: "var(--primary-text)",
        border: "none",
      },
      hover: {
        background: "var(--primary-hover)",
        transform: "translateY(-1px)",
        boxShadow: "0 6px 20px var(--shadow-btn)",
      },
      active: {
        transform: "translateY(0px)",
      },
      disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
    secondary: {
      default: {
        background: "var(--bg-secondary)",
        color: "var(--text-primary)",
        border: "1.5px solid var(--border-light)",
      },
      hover: {
        background: "var(--bg-input)",
        borderColor: "var(--border-focus)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 16px var(--shadow-card)",
      },
      active: {
        transform: "translateY(0px)",
      },
      disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
    ghost: {
      default: {
        background: "transparent",
        color: "var(--text-secondary)",
        border: "none",
      },
      hover: {
        color: "var(--text-primary)",
        opacity: 0.8,
      },
      active: {},
      disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
    destructive: {
      default: {
        background: "rgba(220, 38, 38, 0.12)",
        color: "#dc2626",
        border: "1.5px solid rgba(220, 38, 38, 0.3)",
      },
      hover: {
        background: "rgba(220, 38, 38, 0.2)",
        borderColor: "#dc2626",
      },
      active: {},
      disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
  };

  const sizes = {
    sm: {
      padding: "8px 12px",
      fontSize: "13px",
      fontWeight: 600,
      borderRadius: "6px",
    },
    md: {
      padding: "12px 20px",
      fontSize: "14px",
      fontWeight: 600,
      borderRadius: "8px",
    },
    lg: {
      padding: "14px 28px",
      fontSize: "15px",
      fontWeight: 700,
      borderRadius: "8px",
      letterSpacing: "0.05em",
    },
  };

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} btn-${size} ${className}`}
      title={title}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        transition: "all 0.2s ease",
        cursor: disabled ? "not-allowed" : "pointer",
        ...sizeStyles,
        ...variantStyles.default,
        ...(disabled && variantStyles.disabled),
        ...style,
      }}
      onMouseEnter={(e) => !disabled && Object.assign(e.currentTarget.style, variantStyles.hover)}
      onMouseLeave={(e) => !disabled && Object.assign(e.currentTarget.style, variantStyles.default)}
      onMouseDown={(e) => !disabled && Object.assign(e.currentTarget.style, variantStyles.active)}
      onMouseUp={(e) => !disabled && Object.assign(e.currentTarget.style, variantStyles.hover)}
    >
      {loading ? <span style={{ animation: "spin 1s linear infinite" }}>⟳</span> : children}
    </button>
  );
}
