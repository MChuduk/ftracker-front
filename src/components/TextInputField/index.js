import styles from "./TextInputField.module.scss";

function TextInputField({ label, type = "text" }) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input type={type}></input>
    </div>
  );
}

export default TextInputField;
