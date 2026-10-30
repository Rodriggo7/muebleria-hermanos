import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "../styles/Navbar.module.css";

const DEFAULT_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

function Navbar({
  brandName = "Tienda Artesanal",
  links = DEFAULT_LINKS,
  activeHref = "/",
  onNavigate,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef(null);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event) => {
      if (event.matches) setIsOpen(false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleLinkClick = (link) => (event) => {
    setIsOpen(false);
    onNavigate?.(link, event);
  };

  return (
    <header className={styles.header}>
      <nav
        className={`${styles.nav} container`}
        aria-label="Navegación principal"
       >
        <a
          href="/"
          className={styles.logo}
          aria-label={`${brandName} - Ir al inicio`}
         >
          {brandName}
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={toggleMenu}
         >
          <span
            className={`${styles.bar} ${styles.barTop}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.bar} ${styles.barMiddle}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.bar} ${styles.barBottom}`}
            aria-hidden="true"
          />
        </button>

        <div
          id={menuId}
          className={`${styles.menuWrapper} ${isOpen ? styles.menuOpen : ""}`}
         >
          <ul className={styles.menu} role="list">
            {links.map((link) => {
              const isActive = link.href === activeHref;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`${styles.link} ${isActive ? styles.active : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={handleLinkClick(link)}
                   >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;