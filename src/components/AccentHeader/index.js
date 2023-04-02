import {useState} from "react";
import {Link} from "react-router-dom";
import styles from "./AccentHeader.module.scss";
import {AccentHeaderVerticalMenu} from "./AccentHeaderVerticalMenu";
import {AccentSearchInput} from "../AccentSearchInput";

const AccentHeader = () => {
  const [verticalMenu, showVerticalMenu] = useState(false);

  return (
      <header>
        <div className={styles.menuButton} onClick={() => showVerticalMenu(!verticalMenu)}>
          <svg
              height="30"
              width="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
          </svg>
        </div>
        <div className={styles.menu}>
          <div className={styles.logo}>
            <Link reloadDocument to="dashboard">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="white"
              >
                <path
                    d="M9,4c0-2.209,3.358-4,7.5-4s7.5,1.791,7.5,4-3.358,4-7.5,4-7.5-1.791-7.5-4Zm7.5,6c-1.027,0-2.001-.115-2.891-.315-1.359-1.019-3.586-1.685-6.109-1.685-4.142,0-7.5,1.791-7.5,4s3.358,4,7.5,4,7.5-1.791,7.5-4c0-.029-.007-.057-.008-.086h.008v2.086c0,2.209-3.358,4-7.5,4S0,16.209,0,14v2c0,2.209,3.358,4,7.5,4s7.5-1.791,7.5-4v2c0,2.209-3.358,4-7.5,4S0,20.209,0,18v2c0,2.209,3.358,4,7.5,4s7.5-1.791,7.5-4v-.08c.485,.052,.986,.08,1.5,.08,4.142,0,7.5-1.791,7.5-4v-2c0,2.119-3.092,3.849-7,3.987v-2c3.908-.138,7-1.867,7-3.987v-2c0,2.119-3.092,3.849-7,3.987v-2c3.908-.138,7-1.867,7-3.987v-2c0,2.209-3.358,4-7.5,4Z"/>
              </svg>
            </Link>
          </div>
          <div className={styles.search}>
            <AccentSearchInput placeholder='Jump to...'/>
          </div>
          <Link className={styles.pageLink} to="wallets">
            Wallets
          </Link>
          <Link className={styles.pageLink}>Transactions</Link>
          <Link className={styles.pageLink}>Categories</Link>
          <Link className={styles.pageLink}>History</Link>
        </div>
        <div className={styles.profileButton}></div>
        {verticalMenu ? <AccentHeaderVerticalMenu className={styles.verticalMenu}/> : null}
      </header>
  );
};

export {AccentHeader};
