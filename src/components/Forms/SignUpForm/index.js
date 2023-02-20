import AcccentButton from "../../AccentButton";
import TextInputField from "../../TextInputField";
import styles from "./SignUpForm.module.scss";

import { useMutation } from "@apollo/client";
import { SIGN_UP_LOCAL } from "./requests/signUpLocal";

function SignUpForm() {
  const [addTodo, { data, loading, error }] = useMutation(SIGN_UP_LOCAL);

  const click = () => {
    addTodo({
      variables: {
        credentials: {
          email: "123",
          password: "123qweQWE!",
        },
      },
    });
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <svg
            className={styles.logo}
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="512"
            height="512"
          >
            <path d="M9,4c0-2.209,3.358-4,7.5-4s7.5,1.791,7.5,4-3.358,4-7.5,4-7.5-1.791-7.5-4Zm7.5,6c-1.027,0-2.001-.115-2.891-.315-1.359-1.019-3.586-1.685-6.109-1.685-4.142,0-7.5,1.791-7.5,4s3.358,4,7.5,4,7.5-1.791,7.5-4c0-.029-.007-.057-.008-.086h.008v2.086c0,2.209-3.358,4-7.5,4S0,16.209,0,14v2c0,2.209,3.358,4,7.5,4s7.5-1.791,7.5-4v2c0,2.209-3.358,4-7.5,4S0,20.209,0,18v2c0,2.209,3.358,4,7.5,4s7.5-1.791,7.5-4v-.08c.485,.052,.986,.08,1.5,.08,4.142,0,7.5-1.791,7.5-4v-2c0,2.119-3.092,3.849-7,3.987v-2c3.908-.138,7-1.867,7-3.987v-2c0,2.119-3.092,3.849-7,3.987v-2c3.908-.138,7-1.867,7-3.987v-2c0,2.209-3.358,4-7.5,4Z" />
          </svg>
          <p>Sign up to Fintracker</p>
        </div>
        <form>
          <TextInputField label="Display name" />
          <TextInputField label="Email address" />
          <TextInputField label="Password" type="password" />
          <TextInputField label="Confirm password" type="password" />
          <AcccentButton text="Sign up" onClick={click} />
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
