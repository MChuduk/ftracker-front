import styles from "./BudgetStats.module.scss";
import {Dropdown} from "../Dropdown";
import {useState} from "react";
import {Line} from "react-chartjs-2";
import {Spinner} from "../Spinner";

export const options = {
  responsive: true,
  animation: {
    duration: 0,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};


const BudgetStats = ({
                       report,
                       wallets,
                       selectedWallet,
                       onWalletSelected,
                       currency,
                       selectedCurrency,
                       onSelectedCurrency
                     }) => {
  const [loading, setLoading] = useState(true);

  const labels = report.data.map(x => x.date);
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: report.data.map(x => x.totalAmount),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  setTimeout(() => {
    setLoading(false);
  }, 200)

  if (loading) return (
      <center><Spinner/></center>
  )

  return (
      <div className={styles.wrapper}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <strong className={styles.label}>Your budget</strong>
          <div style={{display: 'flex'}}>
            <Dropdown
                name='Select a wallet'
                width={80}
                contentWidth={150}
                options={wallets.map(x => x.name)}
                selected={selectedWallet}
                onSelected={onWalletSelected}
            />
            <Dropdown
                name='Select currency'
                width={80}
                contentWidth={150}
                options={currency.map(x => x.type)}
                selected={selectedCurrency}
                onSelected={onSelectedCurrency}
            />
          </div>
        </div>
        <Line options={options} data={data}/>
      </div>
  );
}

export {BudgetStats};