import { AccentButton } from "../../../components/AccentButton";
import { AccentTextInput } from "../../../components/AccentTextInput";
import { AccentHorizontalLine } from "../../../components/AccentHorizontalLine";
import styles from "./CreateWalletPage.module.scss";
import { useForm } from "react-hook-form";
import { AuthService } from "../../../api/auth-service";
import { WalletsService } from "../../../api/wallet-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../../components/Dropdown";

const CreateWalletPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ reValidateMode: "onBlur" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { currentUser } = await AuthService.getCurrentUser({
        fields: "id",
      });
      data.userId = currentUser.id;

      const { createWallet } = await WalletsService.create({
        fields: "id name",
        ...data,
      });
      reset();
      navigate("/wallets", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onItemSelected = (item) => {
    console.log("selected item: ", item);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainColumn}>
        <div>
          <h3>Create a new wallet</h3>
          <span>A wallet using to make transactions in various currency.</span>
        </div>
        <form autoCapitalize="off" onSubmit={handleSubmit(onSubmit)}>
          <AccentHorizontalLine spacing="25px" />
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
          <Dropdown label="Currency" options={['option 1', 'option 2']} width="90px" setSelected={onItemSelected} />
          <AccentHorizontalLine spacing="15px" />
          <AccentButton
            value="Create wallet"
            width="150px"
            buttonProps={{ type: "submit", disabled: loading }}
          />
        </form>
      </div>
    </div>
  );
};

export { CreateWalletPage };
