import styles from "./DashboardPage.module.scss";
import {AccentHorizontalLine} from "../../components/AccentHorizontalLine";
import {AuthService} from "../../api/auth-service";
import {TransactionCategoryButton} from "../../components/TransactionCategoryButton";
import {useEffect, useState} from "react";
import {TransactionCategoriesService} from "../../api/transaction-categories-service";
import {Link} from "react-router-dom";

const DashboardPage = () => {
  const [transactionCategories, setTransactionCategories] = useState([]);

  const fetchTransactionCategories = async () => {
    const {defaultTransactionCategories} = await TransactionCategoriesService.getDefaultTransactionCategories({fields: 'id name color svgPath'});
    setTransactionCategories(defaultTransactionCategories);
  }

  useEffect(() => {
    fetchTransactionCategories();
  }, []);

  const logoutHandler = async () => {
    await AuthService.logout({fields: 'id'})
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.rightPanel}>
          <p className={styles.label}>Test</p>
          <button onClick={logoutHandler}>logout</button>
        </div>
        <div className={styles.mainColumn}>
          <p className={styles.label}><strong>{new Date().toDateString()}</strong></p>
          <AccentHorizontalLine/>
          <div className={styles.transactionCategoriesSection}>
            {transactionCategories.map(category => <Link style={{textDecoration: 'none'}}
                                                         to="/transactions/new"><TransactionCategoryButton
                key={category.id} category={category}/></Link>)}
          </div>
        </div>
        <div className={styles.leftColumn}>
          <p className={styles.label}><strong>Latest transactions</strong></p>
        </div>
      </div>
  );
};

export {DashboardPage};
