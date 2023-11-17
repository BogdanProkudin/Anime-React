import styles from "./styles.module.scss";
function SignUpButton() {
  return (
    <div>
      <button type="submit" className={styles.SignUpButton}>
        Create new account
      </button>
    </div>
  );
}
export default SignUpButton;
