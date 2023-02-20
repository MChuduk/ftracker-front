import styles from "./AccentButton.module.scss";

function AcccentButton({ text, onClick }) {
  return (
    <div className={styles.container} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}

export default AcccentButton;

