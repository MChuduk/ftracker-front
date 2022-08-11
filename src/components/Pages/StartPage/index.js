import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import SignUpForm from '../../Forms/SignUpForm';
import styles from './StartPage.module.scss';

function StartPage() {
    console.log(styles.monetizationOnRoundedIcon);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <MonetizationOnRoundedIcon sx={{ fontSize: '60px', color: '#232C47' }} />
        <h3>fintracker</h3>
      </div>
      <div>
        <SignUpForm />
      </div>
    </div>
  );
}

export default StartPage;
