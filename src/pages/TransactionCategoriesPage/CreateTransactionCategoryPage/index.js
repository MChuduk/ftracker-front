import {AccentButton} from "../../../components/AccentButton";
import {AccentTextInput} from "../../../components/AccentTextInput";
import {AccentHorizontalLine} from "../../../components/AccentHorizontalLine";
import styles from "./CreateTransactionCategoryPage.module.scss";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ColorSelector from "../../../components/ColorSelector";
import {TransactionCategoriesService} from "../../../api/transaction-categories-service";

const CreateTransactionCategoryPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm({reValidateMode: "onBlur"});
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await TransactionCategoriesService.createTransactionCategories({
        fields: 'id',
        name: data.name,
        color,
        svgPath: "test",
      });
      reset();
      navigate("/transaction_categories", {replace: true});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onColorSelected = (color) => {
    setColor(color);
  }


  useEffect(() => {
  }, []);


  return (
      <div className={styles.wrapper}>
        <div className={styles.mainColumn}>
          <div>
            <h3>Create transaction category</h3>
            <span>Transaction categories helps you to group by yours transactions.</span>
          </div>
          <form autoCapitalize="off" onSubmit={handleSubmit(onSubmit)}>
            <AccentHorizontalLine spacing="25px"/>
            <AccentTextInput
                label="Name"
                name="name"
                errors={errors}
                invert
                fontWeight="400"
                inputProps={{
                  ...register("name", {
                    required: "Name is required.",
                  }),
                }}
            />
            <AccentHorizontalLine spacing="15px"/>
            <ColorSelector onSelected={onColorSelected}/>
            <AccentButton
                value="Create category"
                width="150px"
                buttonProps={{type: "submit", disabled: loading}}
            />
          </form>
        </div>
      </div>
  );
};

export {CreateTransactionCategoryPage};
