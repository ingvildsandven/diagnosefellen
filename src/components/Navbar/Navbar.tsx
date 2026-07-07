import { Link } from "react-router";
import { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            <li>
              <Link to="/" className={styles.navLink}>
                Hjem
              </Link>
            </li>
            <li>
              <Link to="/about/" className={styles.navLink}>
                Om Henriette
              </Link>
            </li>
             <li>
              <Link to="/posts/" className={styles.navLink}>
                Medieoppslag
              </Link>
            </li>
            <li>
              <Link to="/booking/" className={styles.navLink}>
                Booking
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile/Tablet Header */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.menuButton}
        aria-label="Toggle menu"
      >
        <svg
          className={styles.menuIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarContent}>
          <h2 className={styles.sidebarTitle}>Navigasjon</h2>
          <ul className={styles.sidebarList}>
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={styles.sidebarLink}
              >
                Hjem
              </Link>
            </li>
            <li>
              <Link
                to="/about/"
                onClick={() => setIsOpen(false)}
                className={styles.sidebarLink}
              >
                Om Henriette
              </Link>
            </li>
            <li>
              <Link
                to="/posts/"
                onClick={() => setIsOpen(false)}
                className={styles.sidebarLink}
              >
                Medieoppslag
              </Link>
            </li>
            <li>
              <Link
                to="/booking/"
                onClick={() => setIsOpen(false)}
                className={styles.sidebarLink}
              >
                Booking
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
