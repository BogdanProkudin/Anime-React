import styles from "./styles.module.scss";
const WelcomeText: React.FC = () => {
  return (
    <div className={styles.SignInWelcomeTextContainer}>
      <h1 className={styles.SignInWelcomeText}>Login</h1>
      <span className={styles.SignInWelcomeSubText}>
        Enter your account details
      </span>
    </div>
  );
};

export default WelcomeText;
