import styles from "./TextInputField.module.scss";

function TextInputField({ label, type = "text", value, setValue }) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input type={type} value={value} onChange={(e) => setValue(e.target.value)} ></input>
    </div>
  );
}

export default TextInputField;
