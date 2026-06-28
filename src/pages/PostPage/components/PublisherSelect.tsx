import { useEffect, useRef, useState } from "react";
import { useFetchPublishers } from "../../../hooks/useFetchPublishers";
import styles from "./PublisherSelect.module.css";
import type { Publisher } from "../../../types/post.types";
import { ChevronDown } from "lucide-react";

interface PublisherSelectProps {
  onChange: (p: Publisher | undefined) => void;
}

function PublisherSelect({ onChange }: PublisherSelectProps) {
  const [open, setOpen] = useState(false);
  const { publishers, isError, isLoading } = useFetchPublishers();

  console.log(publishers);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const allOptions: (Publisher | undefined)[] = [
    undefined,
    ...(publishers ?? []),
  ];
  return (
    <div
      ref={wrapperRef}
      className={`${styles.selectWrapper} ${styles.publisherWrapper}`}
    >
      <button
        type="button"
        className={styles.publisherDisplay}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>Alle utgivere</span>
        <span className={styles.chevron}>
          <ChevronDown />
        </span>
      </button>

      
      <div
        className={styles.publisherDisplay}
        onClick={() => setOpen((o) => !o)}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Filtrer etter utgiver"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <span className={styles.chevron}>
          <ChevronDown />
        </span>
      </div>

      {open && (
        <ul className={styles.publisherDropdown} role="listbox">
          {allOptions.map((p) => (
            <li
              key={p?.id ?? "__all__"}
              role="option"
              className={styles.publisherOption}
              onClick={() => {
                onChange(p);
                setOpen(false);
              }}
            >
              {p?.logo ? (
                <img
                  src={p.logo}
                  alt=""
                  className={styles.publisherOptionLogo}
                />
              ) : (
                <span className={styles.publisherLogoPlaceholder} />
              )}
              {p ? p.title : "Alle utgivere"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default PublisherSelect;
