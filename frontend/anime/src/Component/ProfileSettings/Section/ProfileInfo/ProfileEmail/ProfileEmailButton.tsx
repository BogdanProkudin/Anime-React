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
  refetchUserInfo?: any;
};

const ProfileEmailButton: React.FC<ProfileInfoButtonProps> = ({
  text,
  setIsChangeEmail,
  CancelFunction,
  EmailFirstInputValue,
  EmailSecondInputValue,
  setErrorEmail,
  refetchUserInfo,
}) => {
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';

  const handleButtonClick = async () => {
    if (text === 'Cancel') {
      CancelFunction();
      setErrorEmail('');
      return setIsChangeEmail(false);
    } else {
      if (EmailFirstInputValue === EmailSecondInputValue) {
        try {
          const response = await axios.post('http://localhost:3003/ChangeEmail', {
            userId: storedUser._id,
            newEmail: EmailFirstInputValue,
          });
          console.log('Email changed', response);

          if (response.data.user) {
            refetchUserInfo && refetchUserInfo(); // Обновляем информацию о пользователе, если передана функция
            setErrorEmail('');
            setIsChangeEmail(false);
          } else {
            setErrorEmail(response.data.message);
          }
        } catch (error) {
          console.error('Error:', error);
          setErrorEmail('Failed to change email');
        }
      } else {
        setErrorEmail('Email should be the same');
      }
    }
  };

  return (
    <button onClick={handleButtonClick} className={styles.profile_info_button}>
      {text}
    </button>
  );
};

export default ProfileEmailButton;
