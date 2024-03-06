import React, { Dispatch, SetStateAction, useEffect, useCallback } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';

type ProfileInfoButtonProps = {
  text: string;
  setIsChangeUserName: Dispatch<SetStateAction<boolean>>;
  CancelFunction: () => void;
  userNameInputValue: string;
  setErrorUserName: Dispatch<SetStateAction<string>>;
  refetchUserInfo?: () => void; // Типизируем функцию обновления информации о пользователе
};

const ProfileInfoButton: React.FC<ProfileInfoButtonProps> = ({
  text,
  setIsChangeUserName,
  CancelFunction,
  userNameInputValue,
  setErrorUserName,
  refetchUserInfo,
}) => {
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

  const handleButtonClick = useCallback(async () => {
    if (text === 'Cancel') {
      CancelFunction();
      setErrorUserName('');
      setIsChangeUserName(false);
    } else {
      try {
        const response = await axios.post('http://localhost:3003/ChangeUserName', {
          userId: storedUser?._id,
          newUserName: userNameInputValue,
        });

        if (response.data.user) {
          refetchUserInfo?.(); // Вызываем функцию обновления информации о пользователе, если она передана
          setErrorUserName('');
          setIsChangeUserName(false);
        } else {
          setErrorUserName(response.data.message);
        }
      } catch (error) {
        setErrorUserName('Failed to change username');
        console.error('Error:', error);
      }
    }
  }, [
    text,
    setIsChangeUserName,
    CancelFunction,
    userNameInputValue,
    setErrorUserName,
    storedUser,
    refetchUserInfo,
  ]);

  return (
    <button onClick={handleButtonClick} className={styles.profile_info_button}>
      {text}
    </button>
  );
};

export default ProfileInfoButton;
