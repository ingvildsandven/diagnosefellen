import React from "react";
import styles from "./Loader.module.css";

export type LoaderSize = "small" | "medium" | "large";

export interface LoaderProps {
  /** Size of the spinner. Defaults to "medium". */
  size?: LoaderSize;
  /** Optional text shown next to the spinner. */
  label?: string;
  /** Extra class name for the wrapper, if you need to nudge layout. */
  className?: string;
}

/**
 * A simple, reusable loading spinner.
 *
 * Usage:
 *   <Loader />
 *   <Loader size="large" label="Loading results…" />
 */
const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  label,
  className,
}) => {
  const sizeClass = styles[size];

  return (
    <div
      className={`${styles.wrapper} ${className ?? ""}`}
      role="status"
      aria-live="polite"
      aria-label={label ?? "Loading"}
    >
      <span className={`${styles.spinner} ${sizeClass}`} aria-hidden="true" />
      {label && (
        <span className={styles.label} aria-hidden="true">
          {label}
        </span>
      )}
    </div>
  );
};

export default Loader;