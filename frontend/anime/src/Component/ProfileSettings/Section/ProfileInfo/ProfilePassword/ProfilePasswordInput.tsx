import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';
import React from 'react';
type ProfileInfoInputProps = {
  setPasswordFirstnputValue: Dispatch<SetStateAction<string>>;
  setPasswordSecondInputValue: Dispatch<SetStateAction<string>>;
  PasswordFirstInputValue: string;
  PasswordSecondInputValue: string;
  secondInput?: boolean;
};
const ProfilePasswordInput: React.FC<ProfileInfoInputProps> = ({
  setPasswordFirstnputValue,

  secondInput,

  setPasswordSecondInputValue,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (secondInput) {
      setPasswordFirstnputValue(e.target.value);
    } else {
      setPasswordSecondInputValue(e.target.value);
    }
  };
  const storedUserString = localStorage.getItem('CurrentUser');

  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';
  return (
    <input
      style={{ marginTop: secondInput ? '6px' : '' }}
      placeholder={secondInput ? 'Confirm password' : 'Enter new password'}
      onChange={(e) => handleInputChange(e)}
      className={styles.profile_info_input}
    ></input>
  );
};

export default ProfilePasswordInput;
