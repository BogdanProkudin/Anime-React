import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';
import AnimeImagePoster from '../../icons/377937214fb2132ebdb424f25ce28725.jpg';
import HomeButton from './BannerButton';

import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../../redux/hook';
import { useNavigate } from 'react-router-dom';
const BigBanner = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();
  const handleVideoError = () => {
    setVideoError(true);
  };
  const handleOffVideo = () => {
    setVideoError(!videoError);
  };
  const dispatch = useAppDispatch();

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
                <div
                  onClick={() =>
                    navigate(
                      '/Video/Attack%20on%20Titan?image=https://cdn.myanimelist.net/images/anime/10/47347.jpg',
                    )
                  }
                >
                  <HomeButton
                    colorText="black"
                    placeholderText="Learn More"
                    backgroundColor="white"
                  />
                </div>
              </div>
              <div style={{ position: 'relative', top: '5rem' }}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.Big_Screeen_BannerBig}>
          <video
            style={{ display: !videoError ? 'block' : 'none' }}
            onError={handleVideoError}
            muted
            loop
            autoPlay
            className={styles.Big_Banner_Video}
          >
            <source src={require('../../icons/Video.mp4')} type="video/mp4" />
          </video>

          <img
            style={{ display: videoError ? 'block' : 'none' }}
            className={styles.Big_Banner_Video}
            src={AnimeImagePoster}
          />

          <div className={styles.big_banner_text_container}>
            <h1 className={styles.big_banner_text_header_video}>Attack on Titan</h1>

            <p className={styles.big_banner_subtext_header_video}>
              Centuries ago, mankind was slaughtered to near
            </p>

            <div className={styles.BannerButton_Container}>
              <div
                onClick={() =>
                  navigate(
                    '/Video/Attack%20on%20Titan?image=https://cdn.myanimelist.net/images/anime/10/47347.jpg',
                  )
                }
              >
                <HomeButton
                  colorText="black"
                  placeholderText="Learn More"
                  backgroundColor="white"
                />
              </div>
              <HomeButton colorText="white" placeholderText="To Watch" backgroundColor="black" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BigBanner;
