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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 2, -10, 4, 7, 8, 1],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

const BudgetStats = ({currency}) => {
  const [loading, setLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState(currency[0]?.type);

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
          <Dropdown
              name='Select currency'
              width={80}
              contentWidth={150}
              options={currency.map(x => x.type)}
              selected={selectedCurrency}
              onSelected={(item) => setSelectedCurrency(item)}
          />
        </div>
        <Line options={options} data={data}/>
      </div>
  );
}

export {BudgetStats};