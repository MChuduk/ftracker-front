import {Link} from "react-router-dom";
import styles from "./AccentHeaderVerticalMenu.module.scss";
import {AuthService} from "../../../api/auth-service";

const AccentHeaderVerticalMenu = () => {
  return <div className={styles.wrapper}>
    <Link className={styles.pageLink} reloadDocument to="dashboard">Dashboard</Link>
    <Link className={styles.pageLink} reloadDocument to="wallets">Wallets</Link>
    <Link className={styles.pageLink} reloadDocument to="transactions">Transactions</Link>
    <Link className={styles.pageLink} reloadDocument to="transaction_categories">Categories</Link>
    <Link className={styles.pageLink} reloadDocument to="" onClick={() => AuthService.logout({fields: 'id'})} >Logout</Link>
  </div>;
};

export {AccentHeaderVerticalMenu};
