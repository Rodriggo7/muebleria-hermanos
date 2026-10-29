import { forwardRef } from "react";
import styles from "../styles/Button.module.css";

const VARIANTS = ["primary", "secondary", "outline", "danger"];

const Button = forwardRef(function Button(
  {
    variant = "primary",
    type = "button",
    disabled = false,
    loading = false,
    icon = null,
    fullWidth = false,
    className = "",
    children,
    ...rest
  },
  ref,
) {
  const safeVariant = VARIANTS.includes(variant) ? variant : "primary";

  const classes = [
    styles.button,
    styles[safeVariant],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
     >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )
      )}
      <span>{children}</span>
    </button>
  );
});

export default Button;