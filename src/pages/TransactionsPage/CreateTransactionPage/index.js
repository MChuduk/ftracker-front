import styles from './CreateTransactionPage.module.scss';
import {AccentHorizontalLine} from "../../../components/AccentHorizontalLine";
import {AccentTextInput} from "../../../components/AccentTextInput";
import {Dropdown} from "../../../components/Dropdown";
import {AccentButton} from "../../../components/AccentButton";
import {WalletsService} from "../../../api/wallet-service";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {AccentErrorBox} from "../../../components/AccentErrorBox";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Spinner} from "../../../components/Spinner";
import {TransactionCategoriesService} from "../../../api/transaction-categories-service";
import {TransactionService} from "../../../api/transaction-service";
import {getFormattedDate} from "../../../utils/date-utils";
import {AccentToolbar} from "../../../components/AccentToolbar";

const CreateTransactionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {defaultCategory, defaultDate} = location.state;
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
  const [transactionType, setTransactionType] = useState('Expense');


  const onSubmit = async (data) => {
    data.amount = (transactionType === 'Income') ? +data.amount : -+data.amount;
    data.categoryId = transactionCategories.find(category => category.name === selectedTransactionCategory).id;
    data.walletId = wallets.find(wallet => wallet.name === selectedWallet).id;

    try {
      await TransactionService.create({fields: 'id', ...data});
      navigate('/dashboard');
    } catch (error) {
    } finally {
      reset();
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true)
      const [{wallets}, {transactionCategories}] = await Promise.all([
        WalletsService.getAllWallets({fields: "id name currencyId"}),
        TransactionCategoriesService.getTransactionCategories({fields: "id name"}),
      ]);
      setWallets(wallets);
      setTransactionCategories(transactionCategories);
      setSelectedWallet(wallets[0].name);
      setSelectedTransactionCategory(defaultCategory || transactionCategories[0].name);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    reset({
      date: defaultDate ? getFormattedDate(defaultDate) : '',
    });
  }, [reset]);


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
                      pattern:{
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        message: 'Please, enter a number',
                      },
                    }),
                  }}
              />
            </div>
            <AccentToolbar options={['Income', 'Expense']}
                           selectedOption={transactionType}
                           onSelectedOption={(option) => setTransactionType(option)}
            />
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
