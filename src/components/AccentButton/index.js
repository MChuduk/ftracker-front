import styles from "./AccentButton.module.scss";

function AcccentButton(props) {
    return (<div className={styles.box}>{props.text}</div>);
}

export default AcccentButton;
