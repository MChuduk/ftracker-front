import styles from "./SignUpForm.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AccentTextInput } from "../../AccentTextInput";
import { AcccentButton } from "../../AccentButton";
import { AccentErrorBox } from "../../AccentErrorBox";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
    setValue,
    reset,
    clearErrors,
  } = useForm({ reValidateMode: "onSubmit" });

  const onSubmit = (data) => {
    setLoading(true);
    signUp(data, (error, response) => {
      setLoading(false);
      if (error) {
        setError("email", error);
        return;
      }
      console.log("response: ", response);
      navigate("/signIn", { replace: true });
      reset();
    });
  };

  const getError = () => {
    for (const key of Object.keys(errors)) {
      return (
        <div>
          <ErrorMessage
            errors={errors}
            name={key}
            render={({ message }) => <AccentErrorBox content={message} onClose={() => clearErrors()} />}
          />
          <br />
        </div>
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      {getError()}
      <form onSubmit={handleSubmit(onSubmit)}>
        <AccentTextInput
          label="Display name"
          inputProps={{
            ...register("displayName", {
              required: "Display name is required.",
              minLength: {
                value: 3,
                message:
                  "Display name must be longer than or equal to 3 characters",
              },
              maxLength: {
                value: 50,
                message:
                  "Display name must be shorter than or equal to 50 characters",
              },
            }),
          }}
        />
        <AccentTextInput
          label="Email"
          inputProps={{
            ...register("email", {
              required: "Email is required.",
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
            }),
          }}
        />
        <AccentTextInput
          label="Password"
          inputProps={{
            ...register("password", {
              onChange: (e) => setValue("password", e.target.value),
              required: "Password is required.",
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
            }),
            type: "password",
          }}
        />
        <AccentTextInput
          label="Confirm password"
          inputProps={{
            ...register("confirmPassword", {
              required: "Confirm password.",
              validate: (value) => {
                if (value !== getValues("password")) return "Password mismatch";
                return true;
              },
            }),
            type: "password",
          }}
        />
        <AcccentButton
          value={loading ? "Signing Up..." : "Sign Up"}
          buttonProps={{ type: "submit", disabled: loading }}
        />
      </form>
    </div>
  );
};

export { SignUpForm };
