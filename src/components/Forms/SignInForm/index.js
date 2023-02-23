import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { SIGN_IN_MUTATION } from "../SignInForm/mutations/signIn";
import styles from "./SignInForm.module.scss";

function SignInForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    reset,
  } = useForm({ reValidateMode: "onSubmit" });

  const [signInMutation, { loading }] = useMutation(SIGN_IN_MUTATION);

  const onSubmit = (data) => {
    const { email, password } = data;
    signInMutation({
      variables: {
        credentials: { email, password },
      },
      onError: (error) => setError("email", error),
      onCompleted: (data) => {
        console.log("data: ", data);
        reset();
      },
    });
  };

  const getError = () => {
    for (const key of Object.keys(errors)) {
      return (
        <ErrorMessage
          errors={errors}
          name={key}
          render={({ message }) => <p>{message}</p>}
        />
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      {getError()}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input}>
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="text"
          />
        </div>
        <div className={styles.input}>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              onChange: (e) => setValue("password", e.target.value),
              required: "Password is required",
            })}
          />
        </div>
        <input type="submit" value={loading ? "Signing In..." : "Sign In"} />
      </form>
    </div>
  );
}

export default SignInForm;
