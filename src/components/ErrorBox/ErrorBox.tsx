import React from "react";
import styles from "./ErrorBox.module.css";

// generated with claude.ai

export interface ErrorBoxProps {
  /** The error message to display. */
  message: string;
  /** Optional title above the message. Defaults to "Error". */
  title?: string;
  /** Extra class name for the outer box, if you need to nudge layout. */
  className?: string;
}

/**
 * A dismissible error message box.
 *
 * Usage:
 *   const [error, setError] = useState<string | null>("Something went wrong.");
 *   {error && <ErrorBox message={error} onClose={() => setError(null)} />}
 */
const ErrorBox: React.FC<ErrorBoxProps> = ({
  message,
  title = "Error",
  className,
}) => {
  return (
    <div className={`${styles.box} ${className ?? ""}`} role="alert">
      <svg
        className={styles.icon}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          clipRule="evenodd"
        />
      </svg>

      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
      </div>


    </div>
  );
};

export default ErrorBox;
