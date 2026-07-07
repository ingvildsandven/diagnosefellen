import React, { useEffect, useState } from "react";
import styles from "./SuccessBox.module.css";

// generated with claude.ai

export interface SuccessBoxProps {
  /** The success message to display. */
  message: string;
  /** How long the box stays visible, in ms. Defaults to 5000. */
  duration?: number;
  /** Called after the box has finished its exit animation and disappeared. */
  onClose?: () => void;
  /** Extra class name for the outer box, if you need to nudge layout. */
  className?: string;
}

/**
 * A success message box with a green check icon that shows itself,
 * waits, then dismisses on its own.
 *
 * Usage:
 *   {showSuccess && (
 *     <SuccessBox message="Changes saved." onClose={() => setShowSuccess(false)} />
 *   )}
 */
const EXIT_ANIMATION_MS = 200;

const SuccessBox: React.FC<SuccessBoxProps> = ({
  message,
  duration = 5000,
  onClose,
  className,
}) => {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      setLeaving(true);
    }, duration);

    return () => clearTimeout(dismissTimer);
  }, [duration]);

  useEffect(() => {
    if (!leaving) return;

    const removeTimer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, EXIT_ANIMATION_MS);

    return () => clearTimeout(removeTimer);
  }, [leaving, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.box} ${leaving ? styles.leaving : ""} ${
        className ?? ""
      }`}
      role="status"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
        <path
          d="M8 12.5l2.5 2.5L16 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default SuccessBox;