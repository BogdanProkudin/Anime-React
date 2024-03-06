import { useCallback, useEffect, useState } from 'react';
import Header from '../Home/Header/Header';
import styles from './styles.module.scss';
import ProfileSettingVariant from './ProfileSettiingVariant';
import ProfileInfo from './Section/ProfileInfo/ProfileUserName/ProfileUserName';
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import ProfileUserInfo from './Section/ProfileUserInfo';
import ProfileToWatch from './Section/ProfileToWatch/ProfileToWatch';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
export type Variant = {
  variantName: string;
  urlName: string;
};
const ProfileSetting = () => {
  const [selectedTab, setSelectedTab] = useState<string>('profileInfo');
  const [activeVariant, setActiveVariant] = useState<number>(0);
  const location = useLocation();
  const Variants = [
    { variantName: 'Profile Info', urlName: 'profileInfo' },
    { variantName: 'to Watch', urlName: 'toWatch' },
    { variantName: 'Collection', urlName: 'Collection' },
  ];
  const navigate = useNavigate();

  const handleSelectVariant = useCallback(
    (variant: string, index: number) => {
      setSelectedTab(variant);
      setActiveVariant(index);
      navigate(`/Settings/${variant}`);
    },
    [navigate],
  );

  useEffect(() => {
    const pathname = location.pathname;
    const segments = pathname.split('/');
    const toWatchSegment = segments[segments.length - 1];
    setSelectedTab(toWatchSegment);

    const activeVariantIndex = Variants.findIndex((variant) => variant.urlName === toWatchSegment);
    setActiveVariant(activeVariantIndex);
  }, [location.pathname]);
  console.log(selectedTab, 'TAB');

  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className={styles.profile_setting_container}>
          <div className={styles.profile_setting_variants_wrapper}>
            {Variants.map((variant: Variant, index: number) => (
              <ProfileSettingVariant
                key={variant.urlName}
                activeVariant={activeVariant}
                handleSelectVariant={handleSelectVariant}
                variant={variant}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedTab === 'profileInfo' && <ProfileUserInfo />}
      {selectedTab === 'toWatch' && <ProfileToWatch />}
    </>
  );
};

export default ProfileSetting;
