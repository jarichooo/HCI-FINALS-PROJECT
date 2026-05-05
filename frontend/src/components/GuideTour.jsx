import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { guideSteps } from "../data/guideSteps";

function getBubblePosition(rect, position) {
  if (!rect) {
    return {
      position: "fixed",
      zIndex: 1000001,
      animation: "bubblePop 0.25s ease both",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  }

  const GAP = 20;
  const BUBBLE_WIDTH = 300;
  const BUBBLE_HEIGHT = 220;
  const ARROW_SIZE = 8;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const elementCenterX = rect.left + rect.width / 2;
  const elementCenterY = rect.top + rect.height / 2;

  let bubbleTop, bubbleLeft, arrowStyle;

  switch (position) {
    case "bottom-left": {
      bubbleTop = rect.bottom + GAP;
      bubbleLeft = Math.max(16, rect.left);
      if (bubbleLeft + BUBBLE_WIDTH > viewportWidth - 16) {
        bubbleLeft = viewportWidth - BUBBLE_WIDTH - 16;
      }
      if (bubbleTop + BUBBLE_HEIGHT > viewportHeight - 16) {
        bubbleTop = Math.max(16, viewportHeight - BUBBLE_HEIGHT - 16);
      }
      const arrowLeftPos = Math.max(
        16,
        Math.min(elementCenterX - bubbleLeft, BUBBLE_WIDTH - 16)
      );
      arrowStyle = {
        position: "absolute",
        top: `-${ARROW_SIZE * 2}px`,
        left: `${arrowLeftPos}px`,
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth: `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor: `transparent transparent var(--bg-surface) transparent`,
      };
      break;
    }

    case "bottom-right": {
      bubbleTop = rect.bottom + GAP;
      bubbleLeft = Math.max(16, rect.right - BUBBLE_WIDTH);
      if (bubbleTop + BUBBLE_HEIGHT > viewportHeight - 16) {
        bubbleTop = Math.max(16, viewportHeight - BUBBLE_HEIGHT - 16);
      }
      const arrowRightPos = Math.max(
        16,
        Math.min(bubbleLeft + BUBBLE_WIDTH - elementCenterX, BUBBLE_WIDTH - 16)
      );
      arrowStyle = {
        position: "absolute",
        top: `-${ARROW_SIZE * 2}px`,
        right: `${arrowRightPos}px`,
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth: `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor: `transparent transparent var(--bg-surface) transparent`,
      };
      break;
    }

    case "right": {
      bubbleLeft = rect.right + GAP;
      bubbleTop = elementCenterY - BUBBLE_HEIGHT / 2;
      bubbleTop = Math.max(16, Math.min(bubbleTop, viewportHeight - BUBBLE_HEIGHT - 16));
      if (bubbleLeft + BUBBLE_WIDTH > viewportWidth - 16) {
        bubbleLeft = rect.left - BUBBLE_WIDTH - GAP;
        arrowStyle = {
          position: "absolute",
          top: `${elementCenterY - bubbleTop}px`,
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
          top: `${elementCenterY - bubbleTop}px`,
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
    }

    case "left": {
      bubbleLeft = rect.left - BUBBLE_WIDTH - GAP;
      bubbleTop = elementCenterY - BUBBLE_HEIGHT / 2;
      bubbleTop = Math.max(16, Math.min(bubbleTop, viewportHeight - BUBBLE_HEIGHT - 16));
      if (bubbleLeft < 16) {
        bubbleLeft = rect.right + GAP;
        arrowStyle = {
          position: "absolute",
          top: `${elementCenterY - bubbleTop}px`,
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
          top: `${elementCenterY - bubbleTop}px`,
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
    }

    default: {
      bubbleTop = rect.bottom + GAP;
      bubbleLeft = Math.max(16, elementCenterX - BUBBLE_WIDTH / 2);
      if (bubbleLeft + BUBBLE_WIDTH > viewportWidth - 16) {
        bubbleLeft = viewportWidth - BUBBLE_WIDTH - 16;
      }
      if (bubbleTop + BUBBLE_HEIGHT > viewportHeight - 16) {
        bubbleTop = Math.max(16, viewportHeight - BUBBLE_HEIGHT - 16);
      }
      arrowStyle = {
        position: "absolute",
        top: `-${ARROW_SIZE * 2}px`,
        left: `${Math.max(16, Math.min(elementCenterX - bubbleLeft, BUBBLE_WIDTH - 16))}px`,
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth: `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor: `transparent transparent var(--bg-surface) transparent`,
      };
    }
  }

  return {
    position: "fixed",
    zIndex: 1000001,
    animation: "bubblePop 0.25s ease both",
    top: `${bubbleTop}px`,
    left: `${bubbleLeft}px`,
    arrowStyle,
  };
}

export default function GuideTour({ onFinish }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const current = guideSteps[step];
  const isLast = step === guideSteps.length - 1;

  const handleNext = () => {
    if (isLast) handleFinish();
    else setStep((s) => s + 1);
  };

  const handleFinish = () => {
    setVisible(false);
    onFinish();
  };

  if (!visible || !current) return null;

  const anchor = document.querySelector(`[data-guide="${current.id}"]`);
  const rect = anchor ? anchor.getBoundingClientRect() : null;
  const bubblePosition = getBubblePosition(rect, current.position);

  const HIGHLIGHT_PADDING = 12;
  const highlightRect = rect
    ? {
        top: rect.top - HIGHLIGHT_PADDING,
        left: rect.left - HIGHLIGHT_PADDING,
        width: rect.width + HIGHLIGHT_PADDING * 2,
        height: rect.height + HIGHLIGHT_PADDING * 2,
      }
    : null;

  const content = (
    <>
      {/* Dark overlay */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 999998,
          background: "rgba(0,0,0,0.78)", cursor: "pointer", pointerEvents: "auto",
        }}
        onClick={handleFinish}
      />

      {/* Spotlight cutout */}
      {highlightRect && (
        <div
          style={{
            position: "fixed",
            top: `${highlightRect.top}px`,
            left: `${highlightRect.left}px`,
            width: `${highlightRect.width}px`,
            height: `${highlightRect.height}px`,
            zIndex: 999999,
            borderRadius: "12px",
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.78)",
            pointerEvents: "none",
            animation: "highlightPulse 2s ease infinite",
          }}
        />
      )}

      {/* Tooltip bubble */}
      <div style={{ ...styles.bubble, ...bubblePosition }}>
        {bubblePosition.arrowStyle && <div style={bubblePosition.arrowStyle} />}

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

        <h3 style={styles.bubbleTitle}>{current.title}</h3>
        <p style={styles.bubbleDesc}>{current.description}</p>

        <div style={styles.bubbleActions}>
          <button style={styles.skipBtn} onClick={handleFinish}>Skip tour</button>
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
          0%, 100% { box-shadow: 0 0 0 9999px rgba(0,0,0,0.78), 0 0 20px rgba(74,114,204,0.8) inset; }
          50%       { box-shadow: 0 0 0 9999px rgba(0,0,0,0.78), 0 0 35px rgba(74,114,204,1) inset; }
        }
      `}</style>
    </>
  );

  return createPortal(content, document.body);
}

const styles = {
  bubble: {
    background: "var(--bg-surface)", border: "1.5px solid var(--border-light)",
    borderRadius: "14px", padding: "20px 22px", width: "300px",
    boxShadow: "0 12px 48px rgba(0,0,0,0.35)", wordWrap: "break-word", overflowWrap: "break-word",
  },
  dots: { display: "flex", alignItems: "center", gap: "5px", marginBottom: "12px" },
  dot:  { height: "7px", borderRadius: "4px", transition: "width 0.3s, background 0.3s" },
  bubbleTitle: { fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Serif Display', serif", marginBottom: "10px", marginTop: "0", transition: "color 0.25s", lineHeight: 1.3 },
  bubbleDesc:  { fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.6, marginBottom: "18px", marginTop: "0", transition: "color 0.25s" },
  bubbleActions: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  skipBtn: { background: "none", border: "none", fontSize: "12px", color: "var(--text-secondary)", cursor: "pointer", padding: "4px 0" },
  nextBtn: { background: "var(--primary)", color: "var(--primary-text)", border: "none", borderRadius: "8px", padding: "8px 18px", fontSize: "13px", fontWeight: 700, cursor: "pointer", transition: "background 0.2s" },
};
