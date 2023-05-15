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
import {AuthService} from "../../api/auth-service";

const WalletsPage = () => {
  const [_, setCurrentUser] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});

  const fetchData = async (searchByName) => {
    try {
      if(!searchByName) {
        setLoading(true);
      }
      const {currentUser} = await AuthService.getCurrentUser({fields: 'id'});
      const {wallets} = await WalletsService.getAllWallets({
        fields: "id name currency { type }",
        userId: currentUser.id,
        searchByName,
      });
      let stats = {}
      for (const wallet of wallets) {
        const [{walletStats}, {walletActivityReport}] = await Promise.all([
            StatsService.getWalletStats({fields: 'totalAmount', walletId: wallet.id}),
            StatsService.getWalletActivityReport({
              fields: 'data { date count }',
              walletId: wallet.id
            }),
        ]);

        stats = {
          ...stats,
          [wallet.id]: {...walletStats, ...walletActivityReport},
        };
      }
      setCurrentUser(currentUser);
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

  const onChangeSearch = async (value) => {
    await fetchData(value);
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
            <AccentTextInput inputProps={{placeholder: "Find a wallet..."}} onChange={onChangeSearch}/>
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
