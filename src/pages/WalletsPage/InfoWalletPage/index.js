import {useParams, useSearchParams} from "react-router-dom";
import styles from "./InfoWalletsPage.module.scss";
import {AccentHorizontalLine} from "../../../components/AccentHorizontalLine";
import {AccentTextInput} from "../../../components/AccentTextInput";
import {useState} from "react";
import {WalletsService} from "../../../api/wallet-service";
import {Spinner} from "../../../components/Spinner";
import {useForm} from "react-hook-form";
import {AccentLightButton} from "../../../components/AccentLightButton";
import {Dropdown} from "../../../components/Dropdown";
import {CurrencyService} from "../../../api/currency-service";
import {AlertModal} from "../../../modal/AlertModal";
import {IoIosSettings, IoIosStats} from "react-icons/io";

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
    General: <GeneralTab wallet={wallet} currency={currency}/>
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
