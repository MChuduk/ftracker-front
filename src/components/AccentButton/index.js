import styles from "./AccentButton.module.scss";

const AcccentButton = ({ value, buttonProps }) => {
  return (
    <div className={styles.wrapper}>
      <input className={styles.button} {...buttonProps} value={value} />
    </div>
  );
};

export { AcccentButton };
