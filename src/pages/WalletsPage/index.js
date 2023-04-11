import styles from "./WalletsPage.module.scss";
import {AccentButton} from "../../components/AccentButton";
import {AccentTextInput} from "../../components/AccentTextInput";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {WalletsService} from "../../api/wallet-service";
import {WalletCard} from "../../components/WalletCard";
import {Spinner} from "../../components/Spinner";
import {StatsService} from "../../api/stats-service";
import {AccentHorizontalLine} from "../../components/AccentHorizontalLine";

const WalletsPage = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const {wallets} = await WalletsService.getAllWallets({
        fields: "id name currency { type }",
      });
      let stats = {}
      for (const wallet of wallets) {
        const [{walletStats}, {walletStatsByDates}] = await Promise.all([
          StatsService.getWalletStats({fields: 'totalAmount', walletId: wallet.id}),
          StatsService.getWalletStatsByDates({
            fields: 'dates { date amount }',
            walletId: wallet.id,
            fromDate: firstDay.toISOString(),
            toDate: lastDay.toISOString(),
          }),
        ]);

        stats = {
          ...stats,
          [wallet.id]: {...walletStats, ...walletStatsByDates},
        };
      }
      setWallets(wallets);
      setStats(stats);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  const onRemoveHandler = async (wallet) => {
    try {
      await WalletsService.delete({fields: 'id', walletId: wallet.id});
      setWallets(wallets.filter(x => x.id !== wallet.id));
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <center><Spinner/></center>
        </div>
      </div>
  )

  return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <div className={styles.header}>

            <AccentTextInput inputProps={{placeholder: "Find a wallet..."}}/>

            <Link className={styles.link} to="/wallets/new">
              <AccentButton value="New" width="60px" margin="0 0 5px 10px"/>
            </Link>
          </div>
          <AccentHorizontalLine spacing='10px'/>
          <div>
            {wallets.map((wallet) => (
                <WalletCard key={wallet.id} wallet={wallet} stats={stats[wallet.id]} onRemove={onRemoveHandler}/>
            ))}
          </div>
        </div>
      </div>
  );
};

export {WalletsPage};
