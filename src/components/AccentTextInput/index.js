import styles from "./AccentTextInput.module.scss";

const AccentTextInput = ({ label, inputProps })  => {
  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <input {...inputProps}></input>
    </div>
  );
}

export { AccentTextInput };
