import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const DEFAULT_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Contacto", href: "/contacto" },
];

function Navbar({
  brandName = "Mueblería Hermanos",
  links = DEFAULT_LINKS,
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
      <header className="header">
      <nav
        className="nav container"
        aria-label="Navegación principal"
       >
        <Link
          to="/"
          className="logo"
          aria-label={`${brandName} - Ir al inicio`}
         >
          {brandName}
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="toggle"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={toggleMenu}
         >
          <span
            className="bar barTop"
            aria-hidden="true"
          />
          <span
            className="bar barMiddle"
            aria-hidden="true"
          />
          <span
            className="bar barBottom"
            aria-hidden="true"
          />
        </button>

        <div
          id={menuId}
          className={`menuWrapper ${isOpen ? "menuOpen" : ""}`}
         >
          <ul className="menu" role="list">
            {links.map((link) => {
              return (
                <li key={link.href}>
                  <NavLink to={link.href} end={link.href === "/"} className={({ isActive }) => `link ${isActive ? "active" : ""}`} onClick={handleLinkClick(link)}>
                    {link.label}
                  </NavLink>
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
