import { TextField } from "@mui/material";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import styles from "./StartPage.module.scss";

function StartPage() {
  console.log(styles.monetizationOnRoundedIcon);

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.header}>
          <MonetizationOnRoundedIcon sx={{ fontSize: "50px" }} />
          <p>Sign up to fintracker</p>
        </div>
        <div className={styles.content}>
          <TextField label="Email" variant="standard" />
          <TextField
            label="Password"
            variant="standard"
            inputProps={{
              type: "password",
              autoComplete: "new-password",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StartPage;
