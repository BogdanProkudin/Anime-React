import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
type ProfileInfoButtonProps = {
  text: string;
  setIsChangeEmail: React.Dispatch<React.SetStateAction<boolean>>;
  CancelFunction: () => void;
  EmailFirstInputValue: string;
  EmailSecondInputValue: string;
  setErrorEmail: Dispatch<SetStateAction<string>>;
};
const ProfileEmailButton: React.FC<ProfileInfoButtonProps> = ({
  text,
  setIsChangeEmail,
  CancelFunction,
  EmailFirstInputValue,
  EmailSecondInputValue,
  setErrorEmail,
}) => {
  const storedUserString = localStorage.getItem('CurrentUser');

  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';

  console.log(storedUser);

  async function handleButtonClick() {
    if (text === 'Cancel') {
      CancelFunction();
      setErrorEmail('');
      return setIsChangeEmail(false);
    } else {
      if (EmailFirstInputValue === EmailSecondInputValue) {
        const response = await axios.post('http://localhost:3003/ChangeEmail', {
          Email: storedUser.Email,
          newEmail: EmailFirstInputValue,
        });
        console.log('Email changed', response);

        if (response.data.user) {
          const NewUserString = JSON.stringify(response.data.user);
          localStorage.setItem('CurrentUser', NewUserString);
          setErrorEmail('');
          setIsChangeEmail(false);
        } else {
          setErrorEmail(response.data.message);
        }
      } else {
        setErrorEmail('Email should be the same');
      }
    }
  }

  return (
    <button onClick={handleButtonClick} className={styles.profile_info_button}>
      {text}
    </button>
  );
};

export default ProfileEmailButton;
