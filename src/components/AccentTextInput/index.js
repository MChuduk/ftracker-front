import {ErrorMessage} from "@hookform/error-message";
import styles from "./AccentTextInput.module.scss";

const AccentTextInput = ({label, type = 'text', width, inputProps, name, value, fontWeight, onChange, errors = {}}) => {
  return (
      <div className={styles.wrapper} style={{width}}>
        <label>{label}</label>
        <input
            {...inputProps}
            className={errors[name] ? styles.error : null}
            style={{
              fontWeight,
            }}
            value={value}
            onChange={e => onChange(e.target.value)}
            type={type}
        ></input>
        <ErrorMessage
            errors={errors}
            name={name}
            render={({message}) => (
                <span className={styles.errorSpan}>{message}</span>
            )}
        />
      </div>
  );
};

export {AccentTextInput};
