import axios from 'axios';
import styles from './styles.module.scss';
import React, { useRef, useEffect, useState } from 'react';
import BigBanner from './BigBanner';
import AnimeList from './AnimeList';

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
      <AnimeList />
    </div>
  );
};

export default HomePage;
