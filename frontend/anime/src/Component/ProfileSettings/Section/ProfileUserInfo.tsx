import ProfileEmail from './ProfileEmail/ProfileEmail';
import ProfilePassword from './ProfilePassword/ProfilePassword';
import ProfileUserNameInfo from './ProfileUserName/ProfileUserName';
import ProfileInfo from './ProfileUserName/ProfileUserName';

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
