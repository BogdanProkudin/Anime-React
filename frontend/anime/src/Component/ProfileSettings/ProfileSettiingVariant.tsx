import styles from './styles.module.scss';
type ProfileSettingVariantProps = {
  index: number;
  variant: string;
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
        handleSelectVariant(variant, index);
      }}
      className={styles.profile_setting_variants_item}
    >
      {variant}
    </span>
  );
};
export default ProfileSettingVariant;
