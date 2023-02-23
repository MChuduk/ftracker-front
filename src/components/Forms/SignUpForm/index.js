import AcccentButton from "../../AccentButton";
import TextInputField from "../../TextInputField";
import styles from "./SignUpForm.module.scss";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP_MUTATION } from "./mutations/signUp";
import AccentLoader from "../../AccentLoader";
import AccentErrorBox from "../../AccentErrorBox";
import { useForm, useFormState } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
    setValue,
    reset,
  } = useForm({ reValidateMode: "onSubmit" });

  const [signUpMutation, { loading }] =
    useMutation(SIGN_UP_MUTATION);

  const onSubmit = (data) => {
    const { email, password, displayName } = data;
    signUpMutation({
      variables: {
        credentials: { email, password, displayName },
      },
      onError: (error) => setError('email', error),
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
          <label>Display name</label>
          <input
            {...register("displayName", {
              required: "Display name is required",
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
            })}
            type="text"
          />
        </div>
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
        <div className={styles.input}>
          <label>Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Confirm password",
              validate: (value) => {
                if (value !== getValues("password")) return "Password mismatch";
                return true;
              },
            })}
            type="password"
          />
        </div>
        <input type="submit" value={loading ? "Signing Up..." : "Sign Up"} />
      </form>
    </div>
  );
}

export default SignUpForm;
