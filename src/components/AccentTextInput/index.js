import styles from "./AccentTextInput.module.scss";

const AccentTextInput = ({ label, invert, inputProps }) => {
  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <input
        {...inputProps}
        style={{ backgroundColor: invert ? "#f3f3f3" : null }}
      ></input>
    </div>
  );
};

export { AccentTextInput };
