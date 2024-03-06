import React from 'react';
import styles from './styles.module.scss';
const SignUpWelcomeText: React.FC = () => {
  return (
    <div className={styles.SignUpWelcomeTextContainer}>
      <h1 className={styles.SignUpWelcomeText}>Registration</h1>
      <span className={styles.SignUpWelcomeSubText}>Enter your account details</span>
    </div>
  );
};

export default SignUpWelcomeText;
