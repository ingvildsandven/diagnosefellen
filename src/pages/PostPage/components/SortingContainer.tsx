import styles from "./SortingComponent.module.css";
import PublisherSelect from "./PublisherDropdown";
import { ARTICLE_TYPES, type ArticleType, type Publisher } from "../../../types/post.types";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import SearchBar from "./SearchBar";

interface SortingContainerProps {
  filterType: ArticleType | undefined;
  setFilterType: (type: ArticleType | undefined) => void;
  filterPublisher: string | undefined;
  setFilterPublisher: (publisher: string | undefined) => void;
  sort: "newest" | "oldest";
  setSort: (sort: "newest" | "oldest") => void;
  search: string;
  setSearch: (type: string) => void;
}

function SortingContainer({
  filterType,
  setFilterType,
  filterPublisher,
  setFilterPublisher,
  sort,
  setSort,
  search,
  setSearch,
}: SortingContainerProps) {
  const toggleSort = () => setSort(sort === "newest" ? "oldest" : "newest");

  return (
    <section className={styles.sorting_section}>
      <article>
        <SearchBar value={search} onChange={setSearch} />
      </article>

      <article
        className={styles.filterBar}
        role="group"
        aria-label="Filtrer aktiviteter"
      >

        {/* Type filter */}
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            onChange={(e) =>
              setFilterType(
                e.target.value === ""
                  ? undefined
                  : (e.target.value as ArticleType),
              )
            }
            aria-label="Filtrer etter type"
          >
            <option value="">Alle typer</option>
            {ARTICLE_TYPES.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
          <span className={styles.chevron}>
            <ChevronDown />
          </span>
        </div>

        {/* Publisher filter */}
        <PublisherSelect
          value={filterPublisher}
          onChange={setFilterPublisher}
        />

        {/* Sort toggle */}
        <button
          type="button"
          className={styles.sortButton}
          onClick={toggleSort}
          aria-label={
            sort === "newest"
              ? "Sorterer: Nyeste først"
              : "Sorterer: Eldste først"
          }
        >
          <span className={styles.sortIcon}>
            {sort === "newest" ? <ArrowUp /> : <ArrowDown />}
          </span>
          <span className={styles.sortLabel}>
            {sort === "newest" ? "Nyeste" : "Eldste"}
          </span>
        </button>
      </article>
    </section>
  );
}
export default SortingContainer;
