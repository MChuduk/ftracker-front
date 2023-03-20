import { Link } from "react-router-dom";
import styles from "./WalletCard.module.scss";

const WalletCard = ({ wallet }) => {
  return (
    <div className={styles.wrapper}>
      <Link to={`/wallets/${wallet.id}`}>{wallet.name}</Link>
    </div>
  );
};

export { WalletCard };
