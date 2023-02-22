import styles from "./AccentButton.module.scss";

function AcccentButton({ content, onClick, disabled }) {
  return (
    <button className={styles.container} onClick={onClick} disabled={disabled}>
      <p>{content}</p>
    </button>
  );
}

export default AcccentButton;

