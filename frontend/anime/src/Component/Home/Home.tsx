import axios from 'axios';
import styles from '../Home/Banner/styles.module.scss';
import React, { useRef, useEffect, useState } from 'react';
import BigBanner from './Banner/BigBanner';
import Slider from './Slider/BigScreenSlider';
import { EmblaOptionsType } from 'embla-carousel-react';

const HomePage = () => {
  const [animeList, setAnimeList] = useState<AnimeInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=bypopularity', {
          params: {
            page: 1,
            limit: 25,
          },
        });
        console.log(response.data.data);

        setAnimeList(response.data.data || []);
      } catch (error) {
        console.error('Error fetching anime list:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.Home_Container}>
      <BigBanner />
    </div>
  );
};

export default HomePage;
