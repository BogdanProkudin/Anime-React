import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';
type ProfileInfoInputProps = {
  setUserNameInputValue: Dispatch<SetStateAction<string>>;
  userNameInputValue: string;
};
const ProfileInfoInput: React.FC<ProfileInfoInputProps> = ({
  setUserNameInputValue,
  userNameInputValue,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserNameInputValue(e.target.value);
  };
  const storedUserString = localStorage.getItem('CurrentUser');

  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';
  return (
    <input
      value={userNameInputValue}
      placeholder={storedUser.UserName}
      onChange={(e) => handleInputChange(e)}
      style={{ marginTop: '12px' }}
      className={styles.profile_info_input}
    ></input>
  );
};

export default ProfileInfoInput;
