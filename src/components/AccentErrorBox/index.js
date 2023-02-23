import styles from "./AccentErrorBox.module.scss";

function AccentErrorBox({ message }) {
  return <div className={styles.container}>{message}</div>;
}

export default AccentErrorBox;
