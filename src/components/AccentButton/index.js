import styles from "./AccentButton.module.scss";

const AccentButton = ({ value, width, margin, onClick, buttonProps }) => {
  return (
    <div className={styles.wrapper} style={{ width, margin }}>
      <input type="button" className={styles.button} {...buttonProps} value={value} onClick={onClick}/>
    </div>
  );
};

export { AccentButton };
