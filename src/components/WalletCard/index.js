import {Link} from "react-router-dom";
import styles from "./WalletCard.module.scss";
import {AccentHorizontalLine} from "../AccentHorizontalLine";
import {AccentLightButton} from "../AccentLightButton";
import {Line} from "react-chartjs-2";

const options = {
  responsive: false,
  animation: {
    duration: 0,
  },
  hover: {
    mode: null
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
    tooltip: {
      enabled: false
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};
const WalletCard = ({wallet, stats, onRemove}) => {
  const labels = stats.data.map(x => x.date);

  const data = {
    labels,
    datasets: [
      {
        data: stats.data.map(x => x.count),
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
              <AccentLightButton content='Remove' onClick={() => onRemove(wallet)}/>
            </div>
            <div className={styles.graph}>
              <Line width={200} height={50} options={options} data={data}/>
            </div>
          </div>
        </div>
        <AccentHorizontalLine spacing="25px"/>
      </div>
  );
};

export {WalletCard};
