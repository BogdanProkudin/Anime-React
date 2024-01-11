import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
type ProfileInfoButtonProps = {
  text: string;
  setIsChangeUserName: React.Dispatch<React.SetStateAction<boolean>>;
  CancelFunction: () => void;
  userNameInputValue: string;
  setErrorUserName: Dispatch<SetStateAction<string>>;
};
const ProfileInfoButton: React.FC<ProfileInfoButtonProps> = ({
  text,
  setIsChangeUserName,
  CancelFunction,
  userNameInputValue,
  setErrorUserName,
}) => {
  const storedUserString = localStorage.getItem('CurrentUser');

  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';

  console.log(storedUser);

  async function handleButtonClick() {
    if (text === 'Cancel') {
      CancelFunction();
      setErrorUserName('');
      return setIsChangeUserName(false);
    } else {
      console.log('here');

      const response = await axios.post('http://localhost:3003/ChangeUserName', {
        UserName: storedUser.UserName,
        newUserName: userNameInputValue,
      });
      console.log('Nick changed', response);

      if (response.data.user) {
        const NewUserString = JSON.stringify(response.data.user);
        localStorage.setItem('CurrentUser', NewUserString);
        setErrorUserName('');
        setIsChangeUserName(false);
      } else {
        setErrorUserName(response.data.message);
      }
    }
  }

  return (
    <button onClick={handleButtonClick} className={styles.profile_info_button}>
      {text}
    </button>
  );
};

export default ProfileInfoButton;
