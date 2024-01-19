import { useEffect, useState } from 'react';
import Header from '../Home/Header/Header';
import styles from './styles.module.scss';
import ProfileSettingVariant from './ProfileSettiingVariant';
import ProfileInfo from './Section/ProfileInfo/ProfileUserName/ProfileUserName';
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import ProfileUserInfo from './Section/ProfileUserInfo';
import ProfileToWatch from './Section/ProfileToWatch/ProfileToWatch';
const ProfileSetting = () => {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const Variants = ['Profile Info', 'To Watch', 'Collection'];
  const [activeVariant, setActiveVariant] = useState<number>(0);
  function handleSelectVariant(variant: string, index: number) {
    setSelectedTab(variant);
    setActiveVariant(index);
  }
  console.log(selectedTab, activeVariant);
  useEffect(() => {
    setSelectedTab('Profile Info');
  }, []);
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className={styles.profile_setting_container}>
          {
            <div className={styles.profile_setting_variants_wrapper}>
              {Variants.map((variant: string, index: number) => {
                return (
                  <ProfileSettingVariant
                    activeVariant={activeVariant}
                    handleSelectVariant={handleSelectVariant}
                    variant={variant}
                    index={index}
                  />
                );
              })}
            </div>
          }
          ;
        </div>
      </div>
      {selectedTab === 'Profile Info' && <ProfileUserInfo />}
      {selectedTab === 'To Watch' && <ProfileToWatch />}
    </div>
  );
};

export default ProfileSetting;
