import styles from './CreateTransactionPage.module.scss';
import {AccentHorizontalLine} from "../../../components/AccentHorizontalLine";
import {AccentTextInput} from "../../../components/AccentTextInput";
import {Dropdown} from "../../../components/Dropdown";
import {AccentButton} from "../../../components/AccentButton";
import {WalletsService} from "../../../api/wallet-service";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {AccentErrorBox} from "../../../components/AccentErrorBox";
import {Link} from "react-router-dom";
import {Spinner} from "../../../components/Spinner";
import {TransactionCategoriesService} from "../../../api/transaction-categories-service";
import {TransactionService} from "../../../api/transaction-service";

const CreateTransactionPage = () => {
  const [loading, setLoading] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [transactionCategories, setTransactionCategories] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedTransactionCategory, setSelectedTransactionCategory] = useState(null);
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm({reValidateMode: "onBlur"});
  const onSubmit = async (data) => {
    console.log(selectedWallet);
    data.walletId = wallets.find(wallet => wallet.name === selectedWallet).id;
    data.amount = +data.amount;
    console.log(data);

    await TransactionService.create({fields: 'id', ...data});
  };

  const fetchData = async () => {
    try {
      setLoading(true)
      const {wallets} = await WalletsService.getAllWallets({fields: "id name currencyId"})
      const {transactionCategories} = await TransactionCategoriesService.getTransactionCategories({fields: "id name"});
      setWallets(wallets);
      setTransactionCategories(transactionCategories);
      setSelectedWallet(wallets[0].name);
      setSelectedTransactionCategory(transactionCategories[0].name);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (loading) return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <center><Spinner/></center>
        </div>
      </div>
  )

  if (wallets.length === 0)
    return (
        <div className={styles.wrapper}>
          <div className={styles.mainColumn}>
            <AccentErrorBox
                content={
                  <label>You can't create a transaction, because of you haven't wallet.
                    <Link to="/wallets/new">Create one.</Link>
                  </label>
                }/>
          </div>
        </div>
    );

  return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <div>
            <h3>Create new transaction</h3>
            <span>Register transaction about your payment.</span>
          </div>
          <form autoCapitalize="off" onSubmit={handleSubmit(onSubmit)}>
            <AccentHorizontalLine spacing="25px"/>
            <AccentTextInput
                label="Description"
                name="description"
                errors={errors}
                fontWeight="400"
                inputProps={{
                  ...register("description", {
                    required: "Description is required.",
                  }),
                }}
            />
            <div style={{display: 'flex'}}>
              <Dropdown label="Wallet" width="150px"
                        options={wallets.map(wallet => wallet.name)}
                        selected={selectedWallet}
                        onSelected={(item) => setSelectedWallet(item)}
              />
              <span style={{margin: '0 10px 0 10px', alignSelf: 'center'}}>/</span>
              <AccentTextInput
                  label="Amount"
                  name="amount"
                  errors={errors}
                  width="150px"
                  fontWeight="400"
                  inputProps={{
                    ...register("amount", {
                      required: "Amount is required.",
                    }),
                  }}
              />
            </div>
            <AccentHorizontalLine spacing="25px"/>
            <AccentTextInput
                label="Date"
                name="date"
                type="date"
                errors={errors}
                width="150px"
                fontWeight="400"
                inputProps={{
                  ...register("date", {
                    required: "Date is required.",
                  }),
                }}
            />
            <Dropdown label="Category" width="150px"
                      options={transactionCategories.map(category => category.name)}
                      selected={selectedTransactionCategory}
                      onSelected={(item) => setSelectedTransactionCategory(item)}
            />
            <AccentHorizontalLine spacing="25px"/>
            <AccentButton
                value="Create transaction"
                width="150px"
                buttonProps={{type: "submit", disabled: loading}}
            />
          </form>
        </div>
      </div>
  );
}

export {CreateTransactionPage}