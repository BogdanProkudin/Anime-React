import styles from './styles.module.scss';
const HeaderNavigation: React.FC = () => {
  return (
    <nav className={styles.header_wrapper_items}>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Contact</a>
    </nav>
  );
};

export default HeaderNavigation;
