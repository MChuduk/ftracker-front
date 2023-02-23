import styles from "./AccentButton.module.scss";

function AcccentButton({ content, onClick, disabled }) {
  return (
    <div className={styles.container}>
      <button onClick={onClick} disabled={disabled}>
        <p>{content}</p>
      </button>
    </div>
  );
}

export default AcccentButton;
