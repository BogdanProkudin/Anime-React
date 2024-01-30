import axios from 'axios';
import { useEffect, useState } from 'react';
import SliderItem from '../../../Home/Slider/SliderItem';
import styles from '../../../Home/AnimeList/styles.module.scss';
import { log } from 'console';
import { AnimeInfo } from '../../../../types/Home';
import { useNavigate } from 'react-router-dom';
type ToWatchAnimeTypes = {
  AnimeTitle: string;
  AnimeYear: number;
  AnimePoster: string;
  AnimeGenres: { name: string };
};
const ProfileToWatch = () => {
  const navigate = useNavigate();
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';
  const [toWatchAnime, setToWatchAnime] = useState([]);
  useEffect(() => {
    async function getAnimeToWatch() {
      const response = await axios.get(
        `http://localhost:3003/getToWatchAnime?username=${storedUser.UserName}`,
      );
      setToWatchAnime(response.data.toWatch);
      console.log(response);
    }
    getAnimeToWatch();
  }, []);

  function handleChooseAnime(el: ToWatchAnimeTypes) {
    const AnimeTitle = el.AnimeTitle;
    const AnimeImage = el.AnimePoster;

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }
  return (
    <div className={styles.anime_list_container}>
      <h1 style={{ color: 'white', marginBottom: '4rem' }}>Your To Watch Anime:</h1>

      <div className={styles.anime_items_container}>
        {toWatchAnime.map((anime: ToWatchAnimeTypes, index) => {
          return (
            <div onClick={() => handleChooseAnime(anime)} key={index}>
              <SliderItem
                index={index}
                ImagesPoster={anime.AnimePoster}
                ImagesTitle={anime.AnimeTitle}
                AnimeGenres={anime.AnimeGenres ? anime.AnimeGenres.name : 'Unknown'}
                AnimeYear={anime.AnimeYear}
                isParallax={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileToWatch;
