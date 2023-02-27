import styles from "./AccentInfoBox.module.scss";

const AccentInfoBox = ({ content }) => {
  return (
    <div className={styles.wrapper}>
      <div>{content}</div>
    </div>
  );
};

export { AccentInfoBox };
