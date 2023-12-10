import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';

import HomeButton from './BannerButton';
import Slider from '../Slider/BigScreenSlider';
import { EmblaOptionsType } from 'embla-carousel-react';
import EmblaCarousel from '../Slider/SmallScreemSlider';
import { useEffect } from 'react';
import { getAnimeSliderThunk } from '../../../redux/slices/Anime';
import { useAppDispatch } from '../../../redux/hook';
const BigBanner = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAnimeSliderThunk());
  }, []);
  return (
    <div className={styles.Big_Banner}>
      {isSmallScreen ? (
        <div style={{ width: '100%' }}>
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
                <div>
                  <HomeButton
                    colorText="black"
                    placeholderText="Learn More"
                    backgroundColor="white"
                  />
                </div>
              </div>
              <div style={{ position: 'relative', top: '5rem' }}>
                <h1
                  style={{
                    color: 'white',
                    fontSize: '22px',
                    marginBlockEnd: '0px',
                    marginLeft: '5%',
                    marginTop: '2rem',
                  }}
                >
                  Special For You :
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.Big_Screeen_BannerBig}>
          <video muted loop autoPlay className={styles.Big_Banner_Video}>
            <source src={require('../../icons/Video.mp4')} type="video/mp4" />
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
