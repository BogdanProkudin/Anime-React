import styles from '../Home/Banner/styles.module.scss';

import BigBanner from './Banner/Banner';
import Header from './Header/Header';
import Collection from './Collection/Collection';
import { EmblaOptionsType } from 'embla-carousel-react';
import Slider from './Slider/BigScreenSlider';
import { useEffect } from 'react';
import AnimeList from './AnimeList/AnimeList';
import EmblaCarousel from './Slider/SmallScreemSlider';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '../../redux/hook';

const HomePage = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const OPTIONSSmallScreen: EmblaOptionsType = {
    dragFree: true,
  };
  const AnimeSearchValue = useAppSelector((state) => state.getAnime.animeSearchInput);
  return (
    <div style={{ maxWidth: '100vw' }}>
      <div className={styles.Home_Container}>
        <Header />
        <BigBanner />
        {isSmallScreen ? (
          <EmblaCarousel options={OPTIONSSmallScreen} />
        ) : (
          <Slider options={OPTIONSSmallScreen} />
        )}
        <Collection />
        <AnimeList />
      </div>
      <h1>qweqwe</h1>
    </div>
  );
};

export default HomePage;
