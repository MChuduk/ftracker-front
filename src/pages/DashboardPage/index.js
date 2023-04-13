import styles from "./DashboardPage.module.scss";
import {AccentHorizontalLine} from "../../components/AccentHorizontalLine";
import {AuthService} from "../../api/auth-service";
import {TransactionCategoryButton} from "../../components/TransactionCategoryButton";
import {useEffect, useState} from "react";
import {TransactionCategoriesService} from "../../api/transaction-categories-service";
import {Link} from "react-router-dom";
import {Spinner} from "../../components/Spinner";
import {TransactionService} from "../../api/transaction-service";
import {getRelativeTimeString} from "../../utils/date-utils";
import {AccentGroup} from "../../components/AccentGroup";
import {BudgetStats} from "../../components/BudgetStats";
import {CurrencyService} from "../../api/currency-service";
import {StatsService} from "../../api/stats-service";
import {WalletsService} from "../../api/wallet-service";

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [latestTransactionsPagination, setLatestTransactionsPagination] = useState({
    page: 0,
    limit: 4,
  });
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [userBudgetReport, setUserBudgetReport] = useState(null);
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [transactionCategories, setTransactionCategories] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const currentDate = new Date();
  const [hours, minutes] = currentDate.toLocaleTimeString().split(':');
  const currentTime = `${hours}:${minutes}`;


  const fetchData = async () => {
    try {
      setLoading(true);
      const [{transactions}, {defaultTransactionCategories}, {currency}, {wallets}] = await Promise.all([
        TransactionService.getAll({
          fields: 'id description date createdAt',
          dateOrder: 'DESC',
          pagination: latestTransactionsPagination
        }),
        TransactionCategoriesService.getDefaultTransactionCategories({fields: 'id name color svgPath'}),
        CurrencyService.getAll({fields: 'id type'}),
        WalletsService.getAllWallets({fields: 'id name'}),
      ]);
      setLatestTransactions(transactions);
      setTransactionCategories(defaultTransactionCategories);
      setCurrency(currency)
      setWallets(wallets);
      setSelectedWallet(wallets[0].name);
      setSelectedCurrency(currency[0].type);
      await fetchReport();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const fetchReport = async () => {
    const walletId = wallets.find(wallet => wallet.name === selectedWallet)?.id;
    const currencyId = currency.find(currency => currency.type === selectedCurrency)?.id;
    if (walletId && currencyId) {
      const {userBudgetReport} = await StatsService.getUserBudgetReport({
        fields: 'data { date totalAmount }',
        walletId,
        currencyId
      })
      setUserBudgetReport(userBudgetReport);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchReport();
  }, [selectedWallet, selectedCurrency])

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
      groupName: getRelativeTimeString(new Date(+transaction.createdAt), 'en'),
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
          <AccentHorizontalLine spacing='20px'/>
          {userBudgetReport && (
              <BudgetStats
                  currency={currency}
                  selectedCurrency={selectedCurrency}
                  onSelectedCurrency={(currency) => setSelectedCurrency(currency)}
                  wallets={wallets}
                  selectedWallet={selectedWallet}
                  onWalletSelected={(wallet) => setSelectedWallet(wallet)}
                  report={userBudgetReport}
              />
          )}
        </div>
        <div className={styles.leftColumn}>
          <p className={styles.label}><strong>Latest transactions</strong></p>
          <AccentGroup items={getLatestTransactionsView()}/>
        </div>
      </div>
  );
};

export {DashboardPage};
