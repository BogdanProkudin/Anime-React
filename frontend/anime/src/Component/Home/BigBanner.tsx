import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';
import AnimeBanner from '../icons/attack-on-titan-character-poster-uhdpaper.com-4K-8.2105.jpg';
import HomeButton from './BannerButton';
const BigBanner = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div className={styles.Big_Banner}>
      {isSmallScreen ? (
        <div style={{ width: '100%', height: '130vw' }}>
          <div className={styles.shadow}></div>
          <div className={styles.small_screen_bg}>
            <div style={{ position: 'relative', top: '40%', zIndex: '2' }}>
              <div className={styles.home_page_trailer_info}>
                <span className={styles.small_screen_title}>Attack on titan</span>
                <p>
                  <span className={styles.small_screen_info}>7.21</span>
                  <span className={styles.separator}>|</span>
                  <span className={styles.small_screen_info}>24 episodes</span>
                  <span className={styles.separator}>|</span>
                  <span className={styles.small_screen_info}>Drama,Movies,Gay</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.Big_Screeen_BannerBig}>
          <video muted loop autoPlay className={styles.Big_Banner_Video}>
            <source
              src="https://v1.pinimg.com/videos/mc/720p/64/ec/ec/64ecec5f32799e85346dd0dafecf8646.mp4"
              type="video/mp4"
            />
          </video>
          <div className={styles.big_banner_text_container}>
            <h1 className={styles.big_banner_text_header_video}>Attack on Titan</h1>
            <p className={styles.big_banner_subtext_header_video}>
              Centuries ago, mankind was slaughtered to near
            </p>

            <div className={styles.BannerButton_Container}>
              <HomeButton colorText="black" placeholderText="Learn More" backgroundColor="white" />
              <HomeButton colorText="white" placeholderText="To Watch" backgroundColor="black" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BigBanner;
