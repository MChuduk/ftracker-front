import {useParams, useSearchParams} from "react-router-dom";
import styles from "./InfoWalletsPage.module.scss";
import {AccentHorizontalLine} from "../../../components/AccentHorizontalLine";
import {AccentTextInput} from "../../../components/AccentTextInput";
import {useEffect, useState} from "react";
import {WalletsService} from "../../../api/wallet-service";
import {Spinner} from "../../../components/Spinner";
import {useForm} from "react-hook-form";
import {AccentLightButton} from "../../../components/AccentLightButton";
import {Dropdown} from "../../../components/Dropdown";
import {CurrencyService} from "../../../api/currency-service";
import {AlertModal} from "../../../modal/AlertModal";
import {IoIosSettings, IoIosStats} from "react-icons/io";
import {AccentButton} from "../../../components/AccentButton";
import ExcelJS from 'exceljs';
import {getFormattedDate} from "../../../utils/date-utils";
import {TransactionService} from "../../../api/transaction-service";

const GeneralTab = ({wallet, currency}) => {
  const [name, setName] = useState(wallet.name);
  const [modalActive, setModalActive] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(wallet.currency.type);
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm({reValidateMode: "onBlur", defaultValues: {
    name,
  }});

  const updateCurrency = async (answer) => {
    try {
      if (!answer) return;
      const currencyId = currency.find(currency => currency.type === selectedCurrency).id;
      await WalletsService.update({
        fields: 'id',
        walletId: wallet.id,
        currencyId
      });
    } catch (error) {
      console.log("currency update error");
    } finally {
      setModalActive(false);
    }
  }

  const onSubmit = async (data) => {
    if (wallet.currency.type !== selectedCurrency) {
      setModalActive(true);
    }
    try {
      setName(data.name);
      await WalletsService.update({
        fields: 'id',
        walletId: wallet.id,
        name: data.name,
      });
    } catch (error) {
      console.log("update error", error);
    }
  };

  return (
      <div>
        <AlertModal content={`Do you want to change currency from ${wallet.currency.type} to ${selectedCurrency}?`}
                    active={modalActive}
                    setActive={setModalActive}
                    onSubmit={updateCurrency}
        />
        <span className={styles.tabTitle}>General</span>
        <AccentHorizontalLine spacing='10px' />
        <form autoCapitalize="off" onSubmit={handleSubmit(onSubmit)}>
          <AccentTextInput
              label="Name"
              name="name"
              errors={errors}
              invert
              fontWeight="400"
              inputProps={{
                ...register("name", {
                  required: "Name is required.",
                  minLength: {
                    value: 3,
                    message: "Name must be longer than or equal to 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message:
                        "Name must be shorter than or equal to 30 characters",
                  },
                }),
              }}
          />
          <Dropdown label="Currency" options={currency.map(currency => currency.type)}
                    width="90px"
                    selected={selectedCurrency}
                    onSelected={(item) => setSelectedCurrency(item)}/>
          <AccentLightButton content='Change' />
        </form>
      </div>
  );
}

const StatsTab = ({ wallet }) => {
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm({reValidateMode: "onBlur"});

  useEffect(() => {
    reset({
      fromDate: getFormattedDate(new Date()),
      toDate: getFormattedDate(new Date()),
    });
  }, [reset]);

  const downloadReport = async (data) => {
    const {transactions} = await TransactionService.getAll({
      fields: 'id description date amount createdAt category { name } wallet { currency { rate type } }',
      dateOrder: 'DESC',
      walletId: wallet.id,
      fromDate: data.fromDate,
      toDate: data.toDate,
    });

    if(transactions.length <= 0) {
      return;
    }
    const currency = transactions[0].wallet.currency;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    let totalAmount = 0;
    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 10;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.addRow(['ID', 'Description', 'Amount', 'Date', 'Category']);
    for (let i = 0; i < transactions.length; i++) {
      totalAmount = transactions[i].amount;
      const {description, amount, date} = transactions[i];
      const categoryName = transactions[i].category.name;
      worksheet.addRow([i, description, amount, date, categoryName]);
    }
    worksheet.addRow();
    const totalAmountWithRate = totalAmount * currency.rate;
    worksheet.addRow(['', 'TOTAL AMOUNT', `${totalAmountWithRate} ${currency.type}`]);

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'test.xlsx';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
      <div>
        <form autoCapitalize="off" onSubmit={handleSubmit(downloadReport)}>
          <div style={{display: 'flex', columnGap: '10px'}}>
            <AccentTextInput
                label="From Date"
                name="fromDate"
                type="date"
                errors={errors}
                width="150px"
                fontWeight="400"
                inputProps={{
                  ...register("fromDate", {
                    required: "FromDate is required.",
                  }),
                }}
            />
            <AccentTextInput
                label="To Date"
                name="toDate"
                type="date"
                errors={errors}
                width="150px"
                fontWeight="400"
                inputProps={{
                  ...register("toDate", {
                    required: "ToDate is required.",
                  }),
                }}
            />
          </div>
          <AccentHorizontalLine spacing='10px'/>
          <AccentButton value="Download report" width="150px"  buttonProps={{type: "submit" }}/>
        </form>
      </div>
  )
}


const InfoWalletPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {walletId} = useParams();
  const [wallet, setWallet] = useState(null);
  const [currency, setCurrency] = useState(null);
  const tab = searchParams.get('tab') || 'General';

  const fetchData = async () => {
    try {
      setLoading(true);
      const [{wallets}, {currency}] = await Promise.all([
          WalletsService.getAllWallets({
            fields: 'id name currency { id type }',
            walletId,
          }),
          CurrencyService.getAll({
            fields: 'id type'
          })
      ]);
      setWallet(wallets[0]);
      setCurrency(currency);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  useState(() => {
    fetchData();
  }, [])

  const Tab = ({tabName, icon}) => {
    return (
        <div className={tab === tabName ? styles.navItemActive : ''} onClick={() => setSearchParams({tab: tabName})}>
          <div>{icon}</div>
          <span>{tabName}</span>
        </div>
    );
  }

  if (loading) return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <center><Spinner/></center>
        </div>
      </div>
  )

  const tabs = {
    General: <GeneralTab wallet={wallet} currency={currency}/>,
    Stats: <StatsTab wallet={wallet} />,
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.menuColumn}>
          <div className={styles.navMenu} >
            <Tab icon={<IoIosSettings size={30} color="#404040"/>} tabName='General' />
            <Tab icon={<IoIosStats size={30} color="#404040"/>} tabName='Stats' />
          </div>
          <AccentHorizontalLine spacing='10px'/>
        </div>
        <div className={styles.mainColumn}>
          {tabs[tab]}
        </div>
      </div>
  )
}

export {InfoWalletPage}
