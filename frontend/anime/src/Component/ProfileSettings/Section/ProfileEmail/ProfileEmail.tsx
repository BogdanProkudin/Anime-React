import { BiPencil } from 'react-icons/bi';
import ProfileInfoButton from '../ProfileUserName/ProfileUserNameButton';

import { useState } from 'react';
import styles from '../ProfileUserName/styles.module.scss';
import stylesEmail from './styles.module.scss';
import ProfileEmailInput from './ProfileEmailInput';
import { useMediaQuery } from 'react-responsive';
import ProfileEmailButton from './ProfileEmailButton';
const ProfileEmail = () => {
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [EmailFirstInputValue, setEmailFirstInputValue] = useState('');
  const [EmailSecondInputValue, setEmailSecondInputValue] = useState('');
  const [ErrorEmail, setErrorEmail] = useState<string>('');
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  function CancelButton() {
    setEmailFirstInputValue('');
    setEmailSecondInputValue('');
  }
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';

  return (
    <div className={styles.profile_info_container}>
      <div
        style={{
          height:
            isChangeEmail && !isSmallScreen && !ErrorEmail
              ? '160px'
              : isChangeEmail && !ErrorEmail && isSmallScreen
              ? '215px'
              : ErrorEmail && !isSmallScreen
              ? '190px'
              : ErrorEmail && isSmallScreen
              ? '235px'
              : '',
        }}
        className={stylesEmail.profile_info_background_items}
      >
        <div className={styles.profile_info_user_container}>
          <p className={styles.profile_info_user_text}>Email : </p>
        </div>
        {!isChangeEmail ? (
          <div className={styles.profile_info_user_change}>
            <p className={styles.profile_info_user_text}>{storedUser.Email}</p>
            <BiPencil
              onClick={() => setIsChangeEmail(true)}
              className={styles.pensil_svg}
              color="white"
            />
          </div>
        ) : (
          <div
            style={{ height: isChangeEmail ? '110px' : '' }}
            className={styles.profile_info_input_container}
          >
            <ProfileEmailInput
              EmailFirstInputValue={EmailFirstInputValue}
              setEmailInputValue={setEmailFirstInputValue}
              setEmailSecondInputValue={setEmailSecondInputValue}
              EmailSecondInputValue={EmailSecondInputValue}
            />
            <span
              style={{ fontSize: '12px', color: 'white', marginLeft: '12px', marginTop: '5px' }}
            >
              Confirm your Email
            </span>
            <ProfileEmailInput
              secondInput={true}
              EmailFirstInputValue={EmailFirstInputValue}
              setEmailInputValue={setEmailFirstInputValue}
              setEmailSecondInputValue={setEmailSecondInputValue}
              EmailSecondInputValue={EmailSecondInputValue}
            />
            {ErrorEmail.length > 0 && (
              <span style={{ color: 'red', fontSize: '12px', marginLeft: '12px', width: '160px' }}>
                {ErrorEmail}
              </span>
            )}
            <div className={styles.profile_info_button_container}>
              <ProfileEmailButton
                EmailFirstInputValue={EmailFirstInputValue}
                EmailSecondInputValue={EmailSecondInputValue}
                CancelFunction={CancelButton}
                text="Save"
                setIsChangeEmail={setIsChangeEmail}
                setErrorEmail={setErrorEmail}
              />
              <ProfileEmailButton
                EmailFirstInputValue={EmailFirstInputValue}
                EmailSecondInputValue={EmailSecondInputValue}
                CancelFunction={CancelButton}
                text="Cancel"
                setIsChangeEmail={setIsChangeEmail}
                setErrorEmail={setErrorEmail}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileEmail;
