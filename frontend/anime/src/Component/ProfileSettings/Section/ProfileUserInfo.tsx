import ProfileEmail from './ProfileInfo/ProfileEmail/ProfileEmail';
import ProfilePassword from './ProfileInfo/ProfilePassword/ProfilePassword';
import ProfileUserNameInfo from './ProfileInfo/ProfileUserName/ProfileUserName';
import ProfileInfo from './ProfileInfo/ProfileUserName/ProfileUserName';

const ProfileUserInfo = () => {
  return (
    <>
      <ProfileUserNameInfo />
      <ProfileEmail />
      <ProfilePassword />
    </>
  );
};

export default ProfileUserInfo;
