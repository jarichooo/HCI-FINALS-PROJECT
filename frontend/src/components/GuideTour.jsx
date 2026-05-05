import { useState, useEffect } from "react";
import { guideSteps } from "../data/guideSteps";

function getBubblePosition(rect, position) {
  if (!rect) {
    return {
      position: "fixed",
      zIndex: 10001,
      animation: "bubblePop 0.25s ease both",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    };
  }

  const GAP = 20;
  const BUBBLE_WIDTH = 300;
  const ARROW_SIZE = 8;

  // Get viewport dimensions
  const viewportWidth = window.innerWidth;

  // Element center coordinates
  const elementCenterX = rect.left + rect.width / 2;
  const elementCenterY = rect.top + rect.height / 2;

  let bubbleTop, bubbleLeft, arrowStyle;

  switch (position) {
    case "bottom-left":
      // Position bubble below element, aligned to element's left edge
      bubbleTop = rect.bottom + GAP;
      bubbleLeft = Math.max(16, rect.left);

      // If bubble would go off-screen to the right, adjust
      if (bubbleLeft + BUBBLE_WIDTH > viewportWidth - 16) {
        bubbleLeft = viewportWidth - BUBBLE_WIDTH - 16;
      }

      arrowStyle = {
        position: "absolute",
        top: `-${ARROW_SIZE * 2}px`,
        left: `${Math.min(20, rect.width / 2)}px`,
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth: `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor: `transparent transparent var(--bg-surface) transparent`,
      };
      break;

    case "bottom-right":
      // Position bubble below element, aligned to element's right edge
      bubbleTop = rect.bottom + GAP;
      bubbleLeft = Math.max(16, rect.right - BUBBLE_WIDTH);

      arrowStyle = {
        position: "absolute",
        top: `-${ARROW_SIZE * 2}px`,
        right: `${Math.min(20, rect.width / 2)}px`,
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth: `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor: `transparent transparent var(--bg-surface) transparent`,
      };
      break;

    case "right":
      // Position bubble to the right of element, vertically centered
      bubbleLeft = rect.right + GAP;
      bubbleTop = Math.max(16, elementCenterY - 100); // Approximate half bubble height

      // If bubble would go off-screen to the right, position to the left instead
      if (bubbleLeft + BUBBLE_WIDTH > viewportWidth - 16) {
        bubbleLeft = rect.left - BUBBLE_WIDTH - GAP;
        arrowStyle = {
          position: "absolute",
          top: "50%",
          right: `-${ARROW_SIZE * 2}px`,
          transform: "translateY(-50%)",
          width: "0",
          height: "0",
          borderStyle: "solid",
          borderWidth: `${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px 0`,
          borderColor: `transparent var(--bg-surface) transparent transparent`,
        };
      } else {
        arrowStyle = {
          position: "absolute",
          top: "50%",
          left: `-${ARROW_SIZE * 2}px`,
          transform: "translateY(-50%)",
          width: "0",
          height: "0",
          borderStyle: "solid",
          borderWidth: `${ARROW_SIZE}px 0 ${ARROW_SIZE}px ${ARROW_SIZE}px`,
          borderColor: `transparent transparent transparent var(--bg-surface)`,
        };
      }
      break;

    case "left":
      // Position bubble to the left of element, vertically centered
      bubbleLeft = rect.left - BUBBLE_WIDTH - GAP;
      bubbleTop = Math.max(16, elementCenterY - 100); // Approximate half bubble height

      // If bubble would go off-screen to the left, position to the right instead
      if (bubbleLeft < 16) {
        bubbleLeft = rect.right + GAP;
        arrowStyle = {
          position: "absolute",
          top: "50%",
          left: `-${ARROW_SIZE * 2}px`,
          transform: "translateY(-50%)",
          width: "0",
          height: "0",
          borderStyle: "solid",
          borderWidth: `${ARROW_SIZE}px 0 ${ARROW_SIZE}px ${ARROW_SIZE}px`,
          borderColor: `transparent transparent transparent var(--bg-surface)`,
        };
      } else {
        arrowStyle = {
          position: "absolute",
          top: "50%",
          right: `-${ARROW_SIZE * 2}px`,
          transform: "translateY(-50%)",
          width: "0",
          height: "0",
          borderStyle: "solid",
          borderWidth: `${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px 0`,
          borderColor: `transparent var(--bg-surface) transparent transparent`,
        };
      }
      break;

    default:
      // Default to bottom positioning
      bubbleTop = rect.bottom + GAP;
      bubbleLeft = Math.max(16, elementCenterX - BUBBLE_WIDTH / 2);

      arrowStyle = {
        position: "absolute",
        top: `-${ARROW_SIZE * 2}px`,
        left: `${BUBBLE_WIDTH / 2 - ARROW_SIZE}px`,
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth: `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor: `transparent transparent var(--bg-surface) transparent`,
      };
  }

  return {
    position: "fixed",
    zIndex: 10001,
    animation: "bubblePop 0.25s ease both",
    top: `${bubbleTop}px`,
    left: `${bubbleLeft}px`,
    arrowStyle,
  };
}

export default function GuideTour({ onFinish }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  // Small delay so layout paints before we show the tour
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const current = guideSteps[step];
  const isLast = step === guideSteps.length - 1;

  const handleNext = () => {
    if (isLast) {
      handleFinish();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleFinish = () => {
    setVisible(false);
    // Immediately call onFinish to remove the component
    onFinish();
  };

  if (!visible || !current) return null;

  // Get the anchor element's bounding rect for positioning
  const anchor = document.querySelector(`[data-guide="${current.id}"]`);
  const rect = anchor ? anchor.getBoundingClientRect() : null;

  // Debug logging
  console.log(`Guide step ${step}:`, current.id, 'anchor found:', !!anchor, 'rect:', rect);

  const bubblePosition = getBubblePosition(rect, current.position);

  return (
    <>
      {/* Dark overlay */}
      <div style={{...styles.overlay, background: 'rgba(0,0,0,0.1)'}} onClick={handleFinish} />

      {/* Debug overlay to show element positions */}
      {rect && (
        <div
          style={{
            position: 'fixed',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            background: 'rgba(255, 0, 0, 0.2)',
            border: '2px solid red',
            zIndex: 10002,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Tooltip bubble */}
      <div style={{ ...styles.bubble, ...bubblePosition, border: '2px solid red' }}>
        {/* Arrow pointer */}
        {bubblePosition.arrowStyle && <div style={{...bubblePosition.arrowStyle, borderColor: 'red transparent transparent transparent'}} />}

        {/* Step indicator dots */}
        <div style={styles.dots}>
          {guideSteps.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                background: i === step ? "var(--primary)" : "var(--border-input)",
                width: i === step ? "20px" : "7px",
              }}
            />
          ))}
        </div>

        {current && (
          <>
            <h3 style={styles.bubbleTitle}>{current.title}</h3>
            <p style={styles.bubbleDesc}>{current.description}</p>
          </>
        )}

        <div style={styles.bubbleActions}>
          <button style={styles.skipBtn} onClick={handleFinish}>
            Skip tour
          </button>
          <button style={styles.nextBtn} onClick={handleNext}>
            {isLast ? "Done ✓" : "Next →"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bubblePop {
          from { opacity: 0; transform: scale(0.92) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes highlightPulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(74,114,204,0.3), 0 0 0 9999px rgba(0,0,0,0.55); }
          50%       { box-shadow: 0 0 0 8px rgba(74,114,204,0.15), 0 0 0 9999px rgba(0,0,0,0.55); }
        }
      `}</style>
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 10000,
    background: "transparent",
    cursor: "pointer",
  },
  highlight: {
    position: "fixed",
    zIndex: 10001,
    borderRadius: "10px",
    pointerEvents: "none",
    animation: "highlightPulse 2s ease infinite",
    boxShadow: "0 0 0 4px rgba(74,114,204,0.4), 0 0 0 9999px rgba(0,0,0,0.55)",
  },
  bubble: {
    background: "var(--bg-surface)",
    border: "1.5px solid var(--border-light)",
    borderRadius: "14px",
    padding: "20px 22px",
    width: "300px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  },
  dots: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginBottom: "12px",
  },
  dot: {
    height: "7px",
    borderRadius: "4px",
    background: "var(--border-input)",
    transition: "width 0.3s, background 0.3s",
  },
  bubbleTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--text-primary)",
    fontFamily: "'DM Serif Display', serif",
    marginBottom: "10px",
    marginTop: "0",
    transition: "color 0.25s",
    lineHeight: 1.3,
    wordWrap: "break-word",
  },
  bubbleDesc: {
    fontSize: "14px",
    fontWeight: 400,
    color: "var(--text-primary)",
    lineHeight: 1.6,
    marginBottom: "18px",
    marginTop: "0",
    transition: "color 0.25s",
    wordWrap: "break-word",
  },
  bubbleActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skipBtn: {
    background: "none",
    border: "none",
    fontSize: "12px",
    color: "var(--text-secondary)",
    cursor: "pointer",
    padding: "4px 0",
    transition: "opacity 0.15s",
  },
  nextBtn: {
    background: "var(--primary)",
    color: "var(--primary-text)",
    border: "none",
    borderRadius: "8px",
    padding: "8px 18px",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.2s",
  },
};
