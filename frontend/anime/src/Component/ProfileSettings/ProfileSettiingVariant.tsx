import React from 'react';
import { Variant } from './ProfileSetting';
import styles from './styles.module.scss';
type ProfileSettingVariantProps = {
  index: number;
  variant: Variant;
  handleSelectVariant: (variant: string, index: number) => void;
  activeVariant: number;
};
const ProfileSettingVariant: React.FC<ProfileSettingVariantProps> = ({
  index,
  handleSelectVariant,
  variant,
  activeVariant,
}) => {
  return (
    <span
      style={{
        background: activeVariant === index ? 'aliceblue' : '',
        color: activeVariant === index ? 'black' : '',
      }}
      onClick={() => {
        handleSelectVariant(variant.urlName, index);
      }}
      className={styles.profile_setting_variants_item}
    >
      {variant.variantName}
    </span>
  );
};
export default ProfileSettingVariant;
