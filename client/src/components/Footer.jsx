import styles from "../styles/Footer.module.css";

const DEFAULT_USEFUL_LINKS = [
  { label: "Envíos y entregas", href: "/envios" },
  { label: "Cambios y devoluciones", href: "/devoluciones" },
  { label: "Preguntas frecuentes", href: "/faq" },
  { label: "Términos y condiciones", href: "/terminos" },
];

const DEFAULT_SOCIAL_LINKS = [
  { name: "instagram", label: "Instagram", href: "https://instagram.com" },
];

const DEFAULT_CONTACT = {
  address: "Av. San Juan 2847, CABA, Argentina",
  email: "ventas@hermanosjota.com.ar",
  whatsapp: "+54 11 4567-8900",
};

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

function SocialIcon({ name }) {
  switch (name) {
    case "instagram":
      return (
        <svg {...ICON_PROPS}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...ICON_PROPS}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...ICON_PROPS}>
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      );
    default:
      return null;
  }
}

function Footer({
  storeName = "HERMANOS JOTA",
  description = "Cada pieza cuenta la historia de manos expertas y materiales nobles",
  contact = DEFAULT_CONTACT,
  usefulLinks = DEFAULT_USEFUL_LINKS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
}) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <section className={styles.brand}>
          <p className={styles.brandName}>{storeName}</p>
          <p className={styles.description}>{description}</p>

          <ul className={styles.social} role="list">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                 >
                  <SocialIcon name={social.name} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label="Links útiles">
          <h2 className={styles.heading}>Links útiles</h2>
          <ul className={styles.list} role="list">
            {usefulLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section>
          <h2 className={styles.heading}>Contacto</h2>
          <address className={styles.contact}>
            {contact.address && <span>{contact.address}</span>}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className={styles.link}>
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className={styles.link}
               >
                {contact.phone}
              </a>
            )}
          </address>
        </section>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {storeName} Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;