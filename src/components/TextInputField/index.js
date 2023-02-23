import styles from "./TextInputField.module.scss";

function TextInputField({ register, label, validation, type = "text", value, setValue }) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input {...register(label, validation)}></input>
    </div>
  );
}

export default TextInputField;
