import styles from "./WalletsPage.module.scss";
import { AccentButton } from "../../components/AccentButton";
import { AccentTextInput } from "../../components/AccentTextInput";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { WalletsService } from "../../api/wallet-service";
import { AuthService } from "../../api/auth-service";
import { WalletCard } from "../../components/WalletCard";

const WalletsPage = () => {
  const [wallets, setWallets] = useState([]);
  const [walletsLoading, setWalletsLoading] = useState(false);

  const fetchWallets = async () => {
    try {
      setWalletsLoading(true);
      const { currentUser } = await AuthService.getCurrentUser({
        fields: "id",
      });
      const { getAllWallets } = await WalletsService.getAllWallets({
        fields: "id name",
        userId: currentUser.id,
      });
      setWallets(getAllWallets);
    } catch (error) {
      console.log("error", error);
    } finally {
      setWalletsLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainColumn}>
        <div className={styles.header}>
          <AccentTextInput inputProps={{ placeholder: "Find a wallet..." }} />

          <Link className={styles.link} to="/wallets/new">
            <AccentButton value="New" width="60px" margin="0 0 5px 10px" />
          </Link>
        </div>
        <div>
          {wallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { WalletsPage };
