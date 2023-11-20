import styles from './styles.module.scss';
interface IBannerButton {
  backgroundColor: string;
  placeholderText: string;
  colorText: string;
}
const BannerButton: React.FC<IBannerButton> = ({ backgroundColor, placeholderText, colorText }) => {
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: colorText }}
      className={styles.Banner_Button}
    >
      <span>{placeholderText}</span>
    </button>
  );
};
export default BannerButton;
