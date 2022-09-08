import styles from "./AccentButton.module.scss";

function AcccentButton({ text }) {
  return (
    <div className={styles.container}>
      <p>{text}</p>
    </div>
  );
}

export default AcccentButton;

