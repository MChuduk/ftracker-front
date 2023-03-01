import styles from "./WalletsPage.module.scss";
import { AccentButton } from "../../components/AccentButton";
import { AccentTextInput } from "../../components/AccentTextInput";
import { Link } from "react-router-dom";

const WalletsPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainColumn}>
        <div className={styles.header}>
          <AccentTextInput inputProps={{ placeholder: "Find a wallet..." }} />

          <Link className={styles.link} to="/wallets/new">
            <AccentButton value="New" width="60px" margin="0 0 5px 10px" />
          </Link>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export { WalletsPage };
