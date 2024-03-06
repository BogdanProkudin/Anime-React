import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';
import React from 'react';
type ProfileInfoInputProps = {
  setEmailInputValue: Dispatch<SetStateAction<string>>;
  setEmailSecondInputValue: Dispatch<SetStateAction<string>>;
  EmailFirstInputValue: string;
  EmailSecondInputValue: string;
  secondInput?: boolean;
};
const ProfileEmailInput: React.FC<ProfileInfoInputProps> = ({
  setEmailInputValue,
  EmailFirstInputValue,
  secondInput,
  EmailSecondInputValue,
  setEmailSecondInputValue,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (secondInput) {
      setEmailInputValue(e.target.value);
    } else {
      setEmailSecondInputValue(e.target.value);
    }
  };
  const storedUserString = localStorage.getItem('CurrentUser');

  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';
  return (
    <input
      style={{ marginTop: secondInput ? '6px' : '' }}
      placeholder={storedUser.Email}
      onChange={(e) => handleInputChange(e)}
      className={styles.profile_info_input}
    ></input>
  );
};

export default ProfileEmailInput;
