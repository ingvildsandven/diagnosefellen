import { useRef } from "react";
import styles from "./SearchBar.module.css";

interface ActivitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Søk etter medieoppslag...",
}: ActivitySearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.searchWrapper}>
      {/* Search icon */}
      <span className={styles.icon} aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="6.5"
            cy="6.5"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 10L13.5 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <input
        ref={inputRef}
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Søk"
        autoComplete="off"
      />

      {/* Clear button — only shown when there's a value */}
      {value.length > 0 && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          aria-label="Tøm søk"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}