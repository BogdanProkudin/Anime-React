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
  refetchUserInfo?: any;
};

const ProfilePasswordButton: React.FC<ProfileInfoButtonProps> = ({
  text,
  setIsChangePassword,
  CancelFunction,
  PasswordFirstInputValue,
  PasswordSecondInputValue,
  setErrorPassword,
  refetchUserInfo,
}) => {
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';

  const handleButtonClick = async () => {
    if (text === 'Cancel') {
      CancelFunction();
      setErrorPassword('');
      return setIsChangePassword(false);
    } else {
      if (PasswordFirstInputValue === PasswordSecondInputValue) {
        try {
          const response = await axios.post('http://localhost:3003/ChangePassword', {
            userId: storedUser._id,
            newPassword: PasswordFirstInputValue,
          });
          console.log('Password changed', response);

          if (response.data.user) {
            refetchUserInfo && refetchUserInfo(); // Обновляем информацию о пользователе, если передана функция
            setErrorPassword('');
            setIsChangePassword(false);
          } else {
            setErrorPassword(response.data.message);
          }
        } catch (error) {
          console.error('Error:', error);
          setErrorPassword('Failed to change password');
        }
      } else {
        setErrorPassword('Password should be the same');
      }
    }
  };

  return (
    <button onClick={handleButtonClick} className={styles.profile_info_button}>
      {text}
    </button>
  );
};

export default ProfilePasswordButton;
