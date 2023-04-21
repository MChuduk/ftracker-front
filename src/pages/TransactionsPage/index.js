import {AccentList} from "../../components/AccentList";
import {useEffect, useState} from "react";
import {TransactionService} from "../../api/transaction-service";
import styles from "./TransactionsPage.module.scss";
import {Spinner} from "../../components/Spinner";
import {AccentLightButton} from "../../components/AccentLightButton";
import {TransactionCategoryTag} from "../../components/TransactionCategoryTag";
import {AccentGroup} from "../../components/AccentGroup";
import {getFormattedDate} from "../../utils/date-utils";

const TransactionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [{transactions}] = await Promise.all([
        TransactionService.getAll({fields: 'id description amount date category { name color } wallet { name currency { type } }'})
      ]);
      console.log(transactions);
      setTransactions(transactions);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const onDeleteTransactionHandler = async (transaction) => {
    try {
      await TransactionService.delete({fields: 'id', transactionId: transaction.id});
      setTransactions(transactions.filter(x => x.id !== transaction.id));
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (loading) return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <center><Spinner/></center>
        </div>
      </div>
  )

  const getTransactionsView = (transactions) => {
    return (
        <AccentList items={transactions.map(transaction => (
            {
              view:
                  <div className={styles.transactionItem}>
                    <div className={styles.transactionItemInfo}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <strong>{transaction.description}</strong>
                        <TransactionCategoryTag category={transaction.category}/>
                      </div>
                      <label>
                        <strong>{transaction.amount} {transaction.wallet.currency.type}</strong>
                        from {transaction.wallet.name}
                      </label>
                    </div>
                    <div className={styles.transactionButtons}>
                      <AccentLightButton content="Remove" onClick={() => onDeleteTransactionHandler(transaction)}/>
                    </div>
                  </div>,
            })
        )}/>
    );
  }

  const getGroupedTransactions = () => {
    let transactionsDates = transactions.map(transaction => getFormattedDate(transaction.date));
    transactionsDates = new Set(transactionsDates);
    transactionsDates = [...transactionsDates];
    transactionsDates = transactionsDates.sort((a, b) => {
      return new Date(b) - new Date(a);
    });
    return transactionsDates.map(date => ({
      groupName: date.toString(),
      view: getTransactionsView(transactions.filter(x => getFormattedDate(x.date) === date))
    }));
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <AccentGroup items={getGroupedTransactions()}/>
        </div>
      </div>
  );
}

export {TransactionsPage};