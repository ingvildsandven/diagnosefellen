import { useMemo } from "react";
import styles from "./Pagination.module.css";

//This component was generated using claude.ai

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  totalItems: number;
  pageSizeOptions?: number[];
}

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

// Builds a compact page list like: 1, 2, 3, …, 8, 9
function getPageRange(
  page: number,
  totalPages: number,
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const siblings = 1;

  const start = Math.max(2, page - siblings);
  const end = Math.min(totalPages - 1, page + siblings);

  pages.push(1);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("ellipsis");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

function Pagination({
  page,
  setPage,
  pageSize,
  setPageSize,
  totalItems,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pageRange = useMemo(
    () => getPageRange(page, totalPages),
    [page, totalPages],
  );

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextSize = Number(e.target.value);
    setPageSize(nextSize);
    // Keep viewing roughly the same records after a size change
    const newTotalPages = Math.max(1, Math.ceil(totalItems / nextSize));
    if (page > newTotalPages) setPage(newTotalPages);
  }

  return (
    <section className={styles.pagination}>
      <article className={styles.pageSizeSelect}>
        {" "}
        <p className={styles.select_description}>Antall per side </p>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          aria-label="Antall per side"
          className={styles.select}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <svg
          className={styles.chevron}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </article>

      <nav className={styles.pager} aria-label="Sidenavigasjon">
        <button
          type="button"
          className={styles.navButton}
          onClick={() => setPage(page - 1)}
          disabled={!canGoPrev}
          aria-label="Forrige side"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8.5 3L4.5 7L8.5 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <ul className={styles.pageList}>
          {pageRange.map((entry, idx) =>
            entry === "ellipsis" ? (
              <li
                key={`ellipsis-${idx}`}
                className={styles.ellipsis}
                aria-hidden="true"
              >
                …
              </li>
            ) : (
              <li key={entry}>
                <button
                  type="button"
                  className={`${styles.pageButton} ${
                    entry === page ? styles.pageButtonActive : ""
                  }`}
                  onClick={() => setPage(entry)}
                  aria-current={entry === page ? "page" : undefined}
                  aria-label={`Side ${entry}`}
                >
                  {entry}
                </button>
              </li>
            ),
          )}
        </ul>

        <button
          type="button"
          className={styles.navButton}
          onClick={() => setPage(page + 1)}
          disabled={!canGoNext}
          aria-label="Neste side"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5.5 3L9.5 7L5.5 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>
    </section>
  );
}
export default Pagination;
