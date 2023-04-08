import styles from "./DashboardPage.module.scss";
import {AccentHorizontalLine} from "../../components/AccentHorizontalLine";
import {AuthService} from "../../api/auth-service";
import {TransactionCategoryButton} from "../../components/TransactionCategoryButton";
import {useEffect, useState} from "react";
import {TransactionCategoriesService} from "../../api/transaction-categories-service";
import {Link} from "react-router-dom";
import {Spinner} from "../../components/Spinner";
import {TransactionService} from "../../api/transaction-service";
import {AccentList} from "../../components/AccentList";
import {TransactionCategoryTag} from "../../components/TransactionCategoryTag";
import {AccentLightButton} from "../../components/AccentLightButton";
import {getFormattedDate, getRelativeTimeString} from "../../utils/date-utils";
import {AccentGroup} from "../../components/AccentGroup";

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [latestTransactionsPagination, setLatestTransactionsPagination] = useState({
    page: 0,
    limit: 4,
  });
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [transactionCategories, setTransactionCategories] = useState([]);
  const currentDate = new Date();
  const [hours, minutes] = currentDate.toLocaleTimeString().split(':');
  const currentTime = `${hours}:${minutes}`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const [{transactions}, {defaultTransactionCategories}] = await Promise.all([
        TransactionService.getAll({
          fields: 'id description date',
          dateOrder: 'DESC',
          pagination: latestTransactionsPagination
        }),
        TransactionCategoriesService.getDefaultTransactionCategories({fields: 'id name color svgPath'}),
      ]);
      setLatestTransactions(transactions);
      setTransactionCategories(defaultTransactionCategories);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const logoutHandler = async () => {
    await AuthService.logout({fields: 'id'})
  }

  if (loading) return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <center><Spinner/></center>
        </div>
      </div>
  )


  const getLatestTransactionsView = () => {
    return latestTransactions.map(transaction => ({
      groupName: getRelativeTimeString(new Date(transaction.date), 'en'),
      view: <div className={styles.latestTransactionDescription}>{transaction.description}</div>
    }))
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.rightPanel}>
          <p className={styles.label}>Test</p>
          <button onClick={logoutHandler}>logout</button>
        </div>
        <div className={styles.mainColumn}>
          <p className={styles.label}><strong>{currentDate.toDateString()}</strong></p>
          <AccentHorizontalLine/>
          <div className={styles.transactionCategoriesSection}>
            {transactionCategories.map(category =>
                <Link style={{textDecoration: 'none'}}
                      state={{defaultCategory: category.name, defaultDate: currentDate, defaultTime: currentTime}}
                      to="/transactions/new"><TransactionCategoryButton key={category.id} category={category}/>
                </Link>)}
          </div>
        </div>
        <div className={styles.leftColumn}>
          <p className={styles.label}><strong>Latest transactions</strong></p>
          <AccentGroup items={getLatestTransactionsView()}/>
        </div>
      </div>
  );
};

export {DashboardPage};
