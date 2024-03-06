import ProfileEmail from './ProfileInfo/ProfileEmail/ProfileEmail';
import ProfilePassword from './ProfileInfo/ProfilePassword/ProfilePassword';
import ProfileUserNameInfo from './ProfileInfo/ProfileUserName/ProfileUserName';
import ProfileInfo from './ProfileInfo/ProfileUserName/ProfileUserName';
import { useEffect } from 'react';
import styles from '../styles.module.scss';
import { useUserInfo } from '../../../hooks/useUserInfo';
import React from 'react';

const ProfileUserInfo = () => {
  const { userInfo, isLoading, error, refetchUserInfo } = useUserInfo();
  console.log(userInfo?.user.UserName);
  return (
    <div className={styles.profile_settings}>
      <ProfileUserNameInfo userName={userInfo?.user.UserName} refetchUserInfo={refetchUserInfo} />
      <ProfileEmail email={userInfo?.user.Email} refetchUserInfo={refetchUserInfo} />
      <ProfilePassword password={userInfo?.user.Password} refetchUserInfo={refetchUserInfo} />
    </div>
  );
};

export default ProfileUserInfo;
