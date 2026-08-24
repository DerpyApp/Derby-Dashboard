import { BsBell, BsPersonCircle } from "react-icons/bs";
import styles from "./TopBar.module.css";

/**
 * variant: "checkout" (default) shows the "Cancel Checkout" text button.
 * variant: "app" shows notification/profile icons, matching the
 * confirmation screen in the reference design.
 */
export default function TopBar({ onCancel, cancelLabel = "Cancel Checkout", variant = "checkout" }) {
  return (
    <div className={styles.bar}>
      <span className={styles.brand}>
        <span className={styles.brandIcon}>D</span> DERBY
      </span>

      {variant === "checkout" ? (
        <button type="button" className={styles.cancelTextBtn} onClick={onCancel}>
          {cancelLabel}
        </button>
      ) : (
        <div className={styles.appIcons}>
          <BsBell />
          <BsPersonCircle />
        </div>
      )}

      <div className={styles.spacer} />
    </div>
  );
}
