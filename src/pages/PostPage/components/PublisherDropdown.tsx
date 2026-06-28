import { useState, useRef, useEffect } from "react";
import styles from "./PublisherDropdown.module.css";
import { useFetchPublishers } from "../../../hooks/useFetchPublishers";

interface PublisherDropdownProps {
  value?: string | undefined;
  onChange?: (publisherId: string | undefined) => void;
}

export default function PublisherDropdown({
  value,
  onChange,
}: PublisherDropdownProps) {
  const { publishers, isError, isLoading } = useFetchPublishers();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (isError) return <div>Error</div>;
  if (isLoading || !publishers) return <div>Laster…</div>;

  const selected = publishers.find((p) => p.id === value) ?? null;

  const handleSelect = (id: string | undefined) => {
    onChange?.(id);
    setOpen(false);
  };

  const label = isLoading
    ? "Laster…"
    : isError
      ? "Feil"
      : (selected?.title ?? "Alle utgivere");

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={isLoading || isError}
      >
        <span className={styles.triggerLabel}>{label}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {/* "All publishers" option */}
          <li
            className={`${styles.option} ${!selected ? styles.optionSelected : ""}`}
            role="option"
            aria-selected={!selected}
            onClick={() => handleSelect("")}
          >
            <span className={styles.logoSlot}>
              <span className={styles.allIcon} />
            </span>
            <span className={styles.optionLabel}>Alle utgivere</span>
          </li>

          {publishers.map((pub) => (
            <li
              key={pub.id}
              className={`${styles.option} ${selected?.id === pub.id ? styles.optionSelected : ""}`}
              role="option"
              aria-selected={selected?.id === pub.id}
              onClick={() => handleSelect(pub.id)}
            >
              <span className={styles.logoSlot}>
                <img
                  src={pub.logo}
                  alt={pub.title}
                  className={styles.logo}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              </span>
              <span className={styles.optionLabel}>{pub.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
