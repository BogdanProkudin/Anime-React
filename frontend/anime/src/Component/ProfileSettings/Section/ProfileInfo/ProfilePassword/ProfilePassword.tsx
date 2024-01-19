import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from '../ProfileUserName/styles.module.scss';
import stylesPassowrd from './styles.module.scss';
import { BiPencil } from 'react-icons/bi';
import ProfilePasswordButton from './ProfilePasswordButton';
import ProfilePasswordInput from './ProfilePasswordInput';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
const ProfilePassword = () => {
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [PasswordFirstInputValue, setPasswordFirstInputValue] = useState<string>('');
  const [PasswordSecondInputValue, setPasswordSecondInputValue] = useState<string>('');
  const [ErrorPassword, setErrorPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  function CancelButton() {
    setPasswordFirstInputValue('');
    setPasswordSecondInputValue('');
  }
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';

  return (
    <div className={styles.profile_info_container}>
      <div
        style={{
          height:
            isChangePassword && !isSmallScreen && !ErrorPassword
              ? '160px'
              : isChangePassword && !ErrorPassword && isSmallScreen
              ? '215px'
              : ErrorPassword && !isSmallScreen
              ? '190px'
              : ErrorPassword && isSmallScreen
              ? '235px'
              : '',
        }}
        className={stylesPassowrd.profile_info_background_items}
      >
        <div className={styles.profile_info_user_container}>
          <p className={styles.profile_info_user_text}>Password : </p>
        </div>
        {!isChangePassword ? (
          <div className={styles.profile_info_user_change}>
            <input
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                userSelect: 'none',
                fontSize: isPasswordVisible ? '20px' : '25px',
              }}
              readOnly
              value={storedUser.Password}
              type={isPasswordVisible ? 'text' : 'password'}
              className={styles.profile_info_user_text}
            />
            <div style={{ display: 'flex', width: isSmallScreen ? '62px' : '' }}>
              {isPasswordVisible ? (
                <FaRegEyeSlash
                  onClick={() => setIsPasswordVisible(false)}
                  className={styles.pensil_svg}
                  style={{ marginRight: '5px' }}
                  color="white"
                />
              ) : (
                <FaRegEye
                  onClick={() => setIsPasswordVisible(true)}
                  className={styles.pensil_svg}
                  style={{ marginRight: '5px' }}
                  color="white"
                />
              )}
              <BiPencil
                onClick={() => setIsChangePassword(true)}
                className={styles.pensil_svg}
                color="white"
              />
            </div>
          </div>
        ) : (
          <div
            style={{ height: isChangePassword ? '110px' : '' }}
            className={styles.profile_info_input_container}
          >
            <ProfilePasswordInput
              PasswordFirstInputValue={PasswordFirstInputValue}
              setPasswordFirstnputValue={setPasswordFirstInputValue}
              setPasswordSecondInputValue={setPasswordSecondInputValue}
              PasswordSecondInputValue={PasswordSecondInputValue}
            />
            <span
              style={{ fontSize: '12px', color: 'white', marginLeft: '12px', marginTop: '5px' }}
            >
              Confirm your Password
            </span>
            <ProfilePasswordInput
              secondInput={true}
              PasswordFirstInputValue={PasswordFirstInputValue}
              setPasswordFirstnputValue={setPasswordFirstInputValue}
              setPasswordSecondInputValue={setPasswordSecondInputValue}
              PasswordSecondInputValue={PasswordSecondInputValue}
            />
            {ErrorPassword.length > 0 && (
              <span style={{ color: 'red', fontSize: '12px', marginLeft: '12px', width: '190px' }}>
                {ErrorPassword}
              </span>
            )}
            <div className={styles.profile_info_button_container}>
              <ProfilePasswordButton
                PasswordFirstInputValue={PasswordFirstInputValue}
                PasswordSecondInputValue={PasswordSecondInputValue}
                CancelFunction={CancelButton}
                text="Save"
                setIsChangePassword={setIsChangePassword}
                setErrorPassword={setErrorPassword}
              />
              <ProfilePasswordButton
                PasswordFirstInputValue={PasswordFirstInputValue}
                PasswordSecondInputValue={PasswordSecondInputValue}
                CancelFunction={CancelButton}
                text="Cancel"
                setIsChangePassword={setIsChangePassword}
                setErrorPassword={setErrorPassword}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePassword;
