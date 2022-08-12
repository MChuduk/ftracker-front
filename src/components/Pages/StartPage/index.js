import { TextField } from "@mui/material";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import styles from "./StartPage.module.scss";
import AcccentButton from "../../AccentButton";

function StartPage() {
  return (
    <div className={styles.wrapper}>
      <div>
        <AccountBalanceWalletRoundedIcon
          sx={{ fontSize: "60px", color: "#323C47" }}
        />
      </div>
      <h3>Sign up to fintracker</h3>
      <div>
        <form>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="First name"
              size="small"
              sx={{ width: "170px", margin: "5px 5px 10px 5px" }}
            />
            <TextField
              label="Last name"
              size="small"
              sx={{ width: "170px", margin: "5px 5px 10px 5px" }}
            />
          </div>
          <TextField
            label="Email"
            size="small"
            sx={{ margin: "5px 5px 10px 5px" }}
          />
          <TextField
            label="Password"
            size="small"
            inputProps={{
              type: "password",
              autoComplete: "new-password",
            }}
            sx={{ margin: "5px 5px 10px 5px" }}
          />
          <TextField
            label="Confirm password"
            size="small"
            inputProps={{
              type: "password",
              autoComplete: "new-password",
            }}
            sx={{ margin: "5px 5px 10px 5px" }}
          />
          <AcccentButton text="Sign Up" />
        </form>
        <p className={styles.questionLink}>Already have an account? <a href="/">Sign in</a></p>
      </div>
    </div>
  );
}

export default StartPage;
