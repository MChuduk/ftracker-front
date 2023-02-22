import AcccentButton from "../../AccentButton";
import TextInputField from "../../TextInputField";
import styles from "./SignUpForm.module.scss";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP_MUTATION } from "./mutations/signUp";
import AccentLoader from "../../AccentLoader";

function SignUpForm() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpMutation, { data, loading, error }] = useMutation(
    SIGN_UP_MUTATION,
    { errorPolicy: "all" }
  );

  const signUp = (email, password) => {
    console.log(`signUp -> ${email} ${password}`);
    signUpMutation({
      variables: {
        credentials: {
          email,
          password,
        },
      },
    });

    // console.log("apollo error: ", error);
  };

  useEffect(() => console.log("apollo error", error?.graphQLErrors), [error]);

  return (
    <div className={styles.container}>
      <TextInputField
        label="Display name"
        value={displayName}
        setValue={setDisplayName}
      />
      <TextInputField label="Email address" value={email} setValue={setEmail} />
      <TextInputField
        label="Password"
        type="password"
        value={password}
        setValue={setPassword}
      />
      <TextInputField
        label="Confirm password"
        type="password"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
      <AcccentButton
        content={!loading ? "Signing up..." : "Sign Up"}
        disabled={loading}
        onClick={() => signUp(email, password)}
      />
    </div>
  );
}

export default SignUpForm;
