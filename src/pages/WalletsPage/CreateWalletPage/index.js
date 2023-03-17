import { AccentButton } from "../../../components/AccentButton";
import { AccentTextInput } from "../../../components/AccentTextInput";
import { AccentHorizontalLine } from "../../../components/AccentHorizontalLine"  
import styles from "./CreateWalletPage.module.scss";
import { useEffect } from "react";
import { WalletService } from "./../../../api/wallet-service";

const CreateWalletPage = () => {

  // async function test() {
  //   const result = await WalletService.create({ name: '213', userId: 'b9b8de2d-4daa-4f00-aac2-8e971d13b2fc' }, "id")
  //   console.log("CREATE WALLET RESULT: ", result);
  // }

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
        <AccentButton value="Create wallet" width="150px" onClick={() => test()}/>
      </div>
    </div>
  );
};

export { CreateWalletPage };
