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
import {TransactionCategoriesStats} from "../../components/TransactionCategoriesStats";
import {AccentToolbar} from "../../components/AccentToolbar";

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [latestTransactionsPagination, setLatestTransactionsPagination] = useState({
    page: 0,
    limit: 4,
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [userBudgetReport, setUserBudgetReport] = useState(null);
  const [transactionCategoriesReport, setTransactionCategoriesReport] = useState(null);
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [transactionCategories, setTransactionCategories] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedStats, setSelectedStats] = useState('Budget');
  const currentDate = new Date();
  const [hours, minutes] = currentDate.toLocaleTimeString().split(':');
  const currentTime = `${hours}:${minutes}`;


  const fetchData = async () => {
    try {
      setLoading(true);
      const {currentUser} = await AuthService.getCurrentUser({fields: 'id email displayName'});
      const [{transactions}, {transactionCategories}, {currency}, {wallets}] = await Promise.all([
        TransactionService.getAll({
          fields: 'id description date createdAt',
          dateOrder: 'DESC',
          pagination: latestTransactionsPagination
        }),
        TransactionCategoriesService.getTransactionCategories({
          fields: 'id name color svgPath',
          active: true,
        }),
        CurrencyService.getAll({fields: 'id type rate updatedAt'}),
        WalletsService.getAllWallets({fields: 'id name'}),
      ]);
      setCurrentUser(currentUser);
      setLatestTransactions(transactions);
      setTransactionCategories(transactionCategories);
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
    if (currencyId) {
      const {userBudgetReport} = await StatsService.getUserBudgetReport({
        fields: 'data { date totalAmount }',
        walletId,
        currencyId
      })
      setUserBudgetReport(userBudgetReport);
    }
    const {transactionCategoriesReport} = await StatsService.getTransactionsCategoriesReport({
      fields: 'data { category totalAmount categoryColor }',
      walletId,
    })
    setTransactionCategoriesReport(transactionCategoriesReport);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchReport();
  }, [selectedWallet, selectedCurrency])

  if (loading || !currentUser) return (
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

  const getCurrencyRatesView = () => {
    return [{
      groupName: getRelativeTimeString(new Date(+currency[0].updatedAt), 'en'),
      view:
          <div>
            {currency.map((currency, index) =>
                <div className={styles.currencyRateLabel} key={index}>
                  {currency.type}
                  <span>{currency.rate}</span>
                </div>
            )}
          </div>
    }]
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.rightPanel}>
          <span className={styles.userName}>{currentUser.displayName}</span>
          <AccentHorizontalLine spacing='10px' />
          {wallets.map((wallet, index) => (
              <Link className={styles.walletLink} to={`/wallets/${wallet.id}/settings`} key={index}>
                {wallet.name}
              </Link>
          ))}
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
          <div style={{marginBottom: '10px'}}>
            <AccentToolbar options={['Budget', 'Categories']}
                           selectedOption={selectedStats}
                           onSelectedOption={(option) => setSelectedStats(option)}
            />
          </div>
          {selectedStats === 'Categories' && transactionCategoriesReport && (
              <TransactionCategoriesStats
                  wallets={wallets}
                  selectedWallet={selectedWallet}
                  onWalletSelected={(wallet) => setSelectedWallet(wallet)}
                  report={transactionCategoriesReport}
              />
          )}
          {selectedStats === 'Budget' && userBudgetReport && (
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
          <p className={styles.label}><strong>Currency rates</strong></p>
          <AccentGroup items={getCurrencyRatesView()} />
        </div>
      </div>
  );
};

export {DashboardPage};
