import styles from "../styles/Loader.module.css";

const SIZES = ["sm", "md", "lg"];

function Loader({
  label = "Cargando…",
  size = "md",
  showLabel = false,
  fullScreen = false,
  className = "",
}) {
  const safeSize = SIZES.includes(size) ? size : "md";

  const classes = [styles.wrapper, fullScreen && styles.fullScreen, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="status" aria-live="polite">
      <span
        className={`${styles.spinner} ${styles[safeSize]}`}
        aria-hidden="true"
      />
      <span className={showLabel ? styles.label : styles.srOnly}>{label}</span>
    </div>
  );
}

export default Loader;