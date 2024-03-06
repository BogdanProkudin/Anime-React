import styles from '../Home/Banner/styles.module.scss';

import BigBanner from './Banner/Banner';
import Header from './Header/Header';
import Collection from './Collection/Collection';
import { EmblaOptionsType } from 'embla-carousel-react';
import Slider from './Slider/BigScreenSlider';
import { useEffect, useRef } from 'react';
import AnimeList from './AnimeList/AnimeList';

import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '../../redux/hook';

const HomePage = () => {
  const OPTIONSSmallScreen: EmblaOptionsType = {
    dragFree: true,
  };

  const AnimeSearchValue = useAppSelector((state) => state.getAnime.animeSearchInput);
  return (
    <div style={{ maxWidth: '100vw' }}>
      <div className={styles.Home_Container}>
        <Header />
        <BigBanner />

        <Slider options={OPTIONSSmallScreen} />

        <Collection />

        <AnimeList />
      </div>
    </div>
  );
};

export default HomePage;
