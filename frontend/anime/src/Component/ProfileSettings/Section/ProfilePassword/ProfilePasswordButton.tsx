import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
type ProfileInfoButtonProps = {
  text: string;
  setIsChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  CancelFunction: () => void;
  PasswordFirstInputValue: string;
  PasswordSecondInputValue: string;
  setErrorPassword: Dispatch<SetStateAction<string>>;
};
const ProfilePasswordButton: React.FC<ProfileInfoButtonProps> = ({
  text,
  setIsChangePassword,
  CancelFunction,
  PasswordFirstInputValue,
  PasswordSecondInputValue,
  setErrorPassword,
}) => {
  const storedUserString = localStorage.getItem('CurrentUser');

  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';

  console.log(storedUser);

  async function handleButtonClick() {
    if (text === 'Cancel') {
      CancelFunction();
      setErrorPassword('');
      return setIsChangePassword(false);
    } else {
      if (PasswordFirstInputValue === PasswordSecondInputValue) {
        const response = await axios.post('http://localhost:3003/ChangePassword', {
          Password: storedUser.Password,
          newPassword: PasswordFirstInputValue,
        });
        console.log('Password changed', response);

        if (response.data.user) {
          const NewUserString = JSON.stringify(response.data.user);
          localStorage.setItem('CurrentUser', NewUserString);
          setErrorPassword('');
          setIsChangePassword(false);
        } else {
          setErrorPassword(response.data.message);
        }
      } else {
        setErrorPassword('Password should be the same');
      }
    }
  }

  return (
    <button onClick={handleButtonClick} className={styles.profile_info_button}>
      {text}
    </button>
  );
};

export default ProfilePasswordButton;
