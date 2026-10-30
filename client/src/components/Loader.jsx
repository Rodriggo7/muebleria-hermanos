
const SIZES = ["sm", "md", "lg"];

function Loader({
  label = "Cargando…",
  size = "md",
  showLabel = false,
  fullScreen = false,
  className = "",
}) {
  const safeSize = SIZES.includes(size) ? size : "md";

  const classes = ["loader-wrapper", fullScreen && "loader-fullScreen", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="status" aria-live="polite">
      <span
        className={`loader-spinner loader-${safeSize}`}
        aria-hidden="true"
      />
      <span className={showLabel ? "loader-label" : "sr-only"}>{label}</span>
    </div>
  );
}

export default Loader;
