import axios from 'axios';
import { useEffect, useState } from 'react';
import SliderItem from '../../../Home/Slider/SliderItem';
import styles from '../../../Home/AnimeList/styles.module.scss';
import { AnimeInfo } from '../../../../types/Home';
import { useNavigate } from 'react-router-dom';

type ToWatchAnime = {
  AnimeTitle: string;
  AnimeYear: number;
  AnimePoster: string;
  AnimeGenres: { name: string };
};

const ProfileToWatch = () => {
  const navigate = useNavigate();
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
  const [toWatchAnime, setToWatchAnime] = useState<ToWatchAnime[]>([]);

  useEffect(() => {
    const fetchToWatchAnime = async () => {
      try {
        const response = await axios.get(
          `http://37.114.57.94:3003/getToWatchAnime?userId=${storedUser?._id}`,
        );
        setToWatchAnime(response.data.toWatch);
      } catch (error) {
        console.error('Failed to fetch To Watch anime:', error);
        // Handle error, e.g., display error message to user
      }
    };

    if (storedUser?._id) {
      fetchToWatchAnime();
    }
  }, [storedUser?._id]);

  const handleChooseAnime = (anime: ToWatchAnime) => {
    navigate(`/Video/${anime.AnimeTitle}?image=${anime.AnimePoster}`);
  };

  return (
    <div className={styles.anime_list_container}>
      <h1 style={{ color: 'white', marginBottom: '4rem' }}>Your To Watch Anime:</h1>

      <div className={styles.anime_items_container}>
        {toWatchAnime.map((anime: ToWatchAnime, index: number) => (
          <div key={anime.AnimeTitle} onClick={() => handleChooseAnime(anime)}>
            <SliderItem
              index={index}
              ImagesPoster={anime.AnimePoster}
              ImagesTitle={anime.AnimeTitle}
              AnimeGenres={anime.AnimeGenres ? anime.AnimeGenres.name : 'Unknown'}
              AnimeYear={anime.AnimeYear}
              isParallax={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileToWatch;
