import styles from './styles.module.scss';
type HeaderButtonProps = {
  placeholderText: string;
  backgroundColor: string;
  width: string;
  textColor: string;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({
  placeholderText,
  backgroundColor,
  textColor,
  width,
}) => {
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: textColor, width: width }}
      className={styles.header_button}
    >
      {placeholderText}
    </button>
  );
};

export default HeaderButton;
