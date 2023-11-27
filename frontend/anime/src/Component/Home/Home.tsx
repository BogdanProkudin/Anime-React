import axios from 'axios';
import styles from '../Home/Banner/styles.module.scss';
import { useEffect, useState } from 'react';
import BigBanner from './Banner/Banner';
import Header from './Header/Header';
import Collection from './Collection/Collection';
import { EmblaOptionsType } from 'embla-carousel-react';
import Slider from './Slider/BigScreenSlider';
import { useAppDispatch } from '../../redux/hook';
import { getAnimeThunk } from '../../redux/slices/Anime';
import AnimeList from './AnimeList/AnimeList';

const HomePage = () => {
  const [animeList, setAnimeList] = useState<AnimeInfo[]>([]);
  const dispatch = useAppDispatch();
  const OPTIONS: EmblaOptionsType = {
    align: 'start',
    dragFree: true,
    loop: false,
  };
  const OPTIONSSmallScreen: EmblaOptionsType = {
    dragFree: true,
  };
  const SLIDE_COUNT = 9;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=bypopularity', {
  //         params: {
  //           page: 1,
  //           limit: 25,
  //         },
  //       });
  //       console.log(response.data.data);

  //       setAnimeList(response.data.data || []);
  //     } catch (error) {
  //       console.error('Error fetching anime list:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // async function getAnime() {
  //   const response = await dispatch(getAnimeThunk());
  //   console.log(response.payload);
  // }
  // getAnime();

  return (
    <div style={{ maxWidth: '100vw' }}>
      <div className={styles.Home_Container}>
        <Header />
        <BigBanner />
        <Slider slides={SLIDES} options={OPTIONS} />
        <Collection />
        <AnimeList />
      </div>
      <h1>qweqwe</h1>
    </div>
  );
};

export default HomePage;
