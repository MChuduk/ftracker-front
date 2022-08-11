import { TextField } from "@mui/material";
import styles from "./SignUpForm.module.scss";

function SignUpForm() {
  return (
    <div className={styles.box}>
      <TextField
        label="Email"
        variant="standard"
        sx={{ width: "250px"}}
      />
    </div>
  );
}

export default SignUpForm;
