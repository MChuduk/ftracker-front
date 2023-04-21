import {Link} from "react-router-dom";
import styles from "./AccentHeaderVerticalMenu.module.scss";

const AccentHeaderVerticalMenu = () => {
  return <div className={styles.wrapper}>
    <Link className={styles.pageLink} reloadDocument to="dashboard">Dashboard</Link>
    <Link className={styles.pageLink} reloadDocument to="wallets">Wallets</Link>
    <Link className={styles.pageLink} reloadDocument to="Wallets">Transactions</Link>
    <Link className={styles.pageLink} reloadDocument to="Wallets">Categories</Link>
    <Link className={styles.pageLink} reloadDocument to="Wallets">History</Link>
  </div>;
};

export {AccentHeaderVerticalMenu};
