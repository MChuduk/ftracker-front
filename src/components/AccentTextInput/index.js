import { ErrorMessage } from "@hookform/error-message";
import styles from "./AccentTextInput.module.scss";

const AccentTextInput = ({ label, invert, inputProps, name, errors = {} }) => {
  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <input
        {...inputProps}
        className={errors[name] ? styles.error : null}
        style={{
          backgroundColor: invert ? "#f3f3f3" : null,
        }}
      ></input>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className={styles.errorSpan}>{message}</span>
        )}
      />
    </div>
  );
};

export { AccentTextInput };
