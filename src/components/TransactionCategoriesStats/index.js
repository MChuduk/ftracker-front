import styles from './TransactionCategoriesStats.module.scss'
import {Pie} from "react-chartjs-2";
import {Dropdown} from "../Dropdown";

const TransactionCategoriesStats = ({ report, selectedWallet, onWalletSelected, wallets}) => {
  const data = {
    labels: report.data.map(x => x.category),
    datasets: [
      {
        label: 'Total amount',
        data: report.data.map(x => x.totalAmount),
        backgroundColor: report.data.map(x => x.categoryColor),
        borderColor: 'rgb(40,40,40)'
        ,
        borderWidth: 1,
      },
    ],
  };


  return (
      <div className={styles.wrapper}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <strong className={styles.label}>Your transactions by categories</strong>
          <div style={{display: 'flex'}}>
            <Dropdown
                name='Select a wallet'
                width={80}
                contentWidth={150}
                options={['All', ...wallets.map(x => x.name)]}
                selected={selectedWallet}
                onSelected={onWalletSelected}
            />
          </div>
        </div>
        <Pie data={data}/>
      </div>
  );
}

export { TransactionCategoriesStats }
