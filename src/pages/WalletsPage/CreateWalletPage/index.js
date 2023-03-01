import { AccentButton } from "../../../components/AccentButton";
import { AccentTextInput } from "../../../components/AccentTextInput";
import { AccentHorizontalLine } from "../../../components/AccentHorizontalLine"  
import styles from "./CreateWalletPage.module.scss";

const CreateWalletPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainColumn}>
        <div>
          <h3>Create a new wallet</h3>
          <span>A wallet using to make transactions in various currency.</span>
        </div>
        <AccentHorizontalLine spacing="25px"/>
        <AccentTextInput label="Name" invert />
        <AccentHorizontalLine spacing="15px"/>
        <AccentButton value="Create wallet" width="150px"/>
      </div>
    </div>
  );
};

export { CreateWalletPage };
