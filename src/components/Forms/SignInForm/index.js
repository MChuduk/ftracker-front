import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./SignInForm.module.scss";

function SignInForm() {
  const { signIn } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    reset,
  } = useForm({ reValidateMode: "onSubmit" });
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fromPage = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    setLoading(true);
    signIn(data, (error, response) => {
      setLoading(false);
      if (error) {
        setError("email", error);
        return;
      }
      console.log("response: ", response);
      navigate(fromPage, { replace: true });
      reset();
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
              minLength: {
                value: 10,
                message: "Email must be longer than or equal to 10 characters",
              },
              maxLength: {
                value: 50,
                message: "Email must be shorter than or equal to 50 characters",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email must be an email",
              },
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
              minLength: {
                value: 10,
                message:
                  "Password must be longer than or equal to 10 characters",
              },
              maxLength: {
                value: 50,
                message:
                  "Password must be shorter than or equal to 50 characters",
              },
              validate: (value) => {
                if (!/[A-Z]/.test(value))
                  return "Password must contains uppercase letters";
                if (!/[a-z]/.test(value))
                  return "Password must contains lowercase letters";
                if (!/[0-9]/.test(value))
                  return "Password must contains digits/number";
                if (!/[!#$%&'()*+,-./:;<=>?@[\]^_{|}~]/.test(value))
                  return "Password must contains special characters";
                return true;
              },
            })}
          />
        </div>
        <input type="submit" value={loading ? "Signing In..." : "Sign In"} />
      </form>
    </div>
  );
}

export default SignInForm;
