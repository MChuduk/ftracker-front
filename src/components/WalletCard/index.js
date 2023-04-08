import {Link} from "react-router-dom";
import styles from "./WalletCard.module.scss";
import {AccentHorizontalLine} from "../AccentHorizontalLine";
import {AccentLightButton} from "../AccentLightButton";
import {
  CategoryScale,
  Chart as ChartJS, Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import {Line} from "react-chartjs-2";
import {useState} from "react";
import {Spinner} from "../Spinner";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
  responsive: false,
  animation: {
    duration: 0,
  },
  scales: {
    y: {
      display: false
    },
    x: {
      display: false
    }
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
const WalletCard = ({wallet, stats}) => {
  const labels = stats.dates.map(x => x.date);

  const data = {
    labels,
    datasets: [
      {
        data: stats.dates.map(x => x.amount),
        borderColor: 'rgb(12,155,24)',
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
      <div className={styles.wrapper}>
        <div>
          <div className={styles.info}>
            <Link className={styles.name}>{wallet.name}</Link>
            <div>{stats.totalAmount} {wallet.currency.type}</div>
          </div>
          <div className={styles.rightSide}>
            <div>
              <AccentLightButton content='Remove'/>
            </div>
            <div className={styles.graph}>
              <Line height={50} options={options} data={data}/>
            </div>
          </div>
        </div>
        <AccentHorizontalLine spacing="25px"/>
      </div>
  );
};

export {WalletCard};
