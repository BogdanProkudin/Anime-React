import { useState } from 'react';
import styles from './styles.module.scss';
import { BiPencil } from 'react-icons/bi';
import ProfileInfoButton from './ProfileUserNameButton';
import ProfileInfoInput from './ProfileUserNameInput';
import { useMediaQuery } from 'react-responsive';

const ProfileUserNameInfo = () => {
  const [isChangeUserName, setIsChangeUserName] = useState(false);
  const [userNameFirstInputValue, setUserNameFirstInputValue] = useState('');
  const [ErrorUserName, setErrorUserName] = useState<string>('');
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  console.log('first', userNameFirstInputValue);
  function CancelButton() {
    setUserNameFirstInputValue('');
  }
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';
  console.log(storedUser);

  return (
    <div style={{ marginTop: '50px' }} className={styles.profile_info_container}>
      <div
        style={{
          height:
            isChangeUserName && !isSmallScreen
              ? '120px'
              : isChangeUserName && isSmallScreen
              ? '160px'
              : !isSmallScreen && ErrorUserName
              ? '190px'
              : ErrorUserName && isSmallScreen
              ? '240px'
              : '',
        }}
        className={styles.profile_info_background_items}
      >
        <div className={styles.profile_info_user_container}>
          <p className={styles.profile_info_user_text}>UserName : </p>
        </div>
        {!isChangeUserName ? (
          <div className={styles.profile_info_user_change}>
            <p className={styles.profile_info_user_text}>{storedUser.UserName}</p>
            <BiPencil
              onClick={() => setIsChangeUserName(true)}
              className={styles.pensil_svg}
              color="white"
            />
          </div>
        ) : (
          <div
            style={{ height: isChangeUserName ? '110px' : '' }}
            className={styles.profile_info_input_container}
          >
            <ProfileInfoInput
              userNameInputValue={userNameFirstInputValue}
              setUserNameInputValue={setUserNameFirstInputValue}
            />
            {ErrorUserName.length > 0 && (
              <span style={{ color: 'red', fontSize: '12px', marginLeft: '12px', width: '150px' }}>
                {ErrorUserName}
              </span>
            )}
            <div className={styles.profile_info_button_container}>
              <ProfileInfoButton
                userNameInputValue={userNameFirstInputValue}
                CancelFunction={CancelButton}
                text="Save"
                setIsChangeUserName={setIsChangeUserName}
                setErrorUserName={setErrorUserName}
              />
              <ProfileInfoButton
                userNameInputValue={userNameFirstInputValue}
                CancelFunction={CancelButton}
                text="Cancel"
                setIsChangeUserName={setIsChangeUserName}
                setErrorUserName={setErrorUserName}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileUserNameInfo;
