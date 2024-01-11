import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Home/Header/Header';
import { getAnimeSeriaThunk } from '../../redux/slices/Anime';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hook';
import styles from '../Home/AnimeList/styles.module.scss';
import SliderItem from '../Home/Slider/SliderItem';

const AnimeSearchList = () => {
  const dispatch = useAppDispatch();
  const { AnimeTitle } = useParams();
  const navigate = useNavigate();
  console.log(AnimeTitle);
  const [foundAnime, setFoundedAnime] = useState([]);
  useEffect(() => {
    const getAnimeInfo = async () => {
      const ApiToken = '205cbb1f38375f91b405169fa2da91a8';
      console.log(AnimeTitle, 'ANIME EPISODE = title');

      const paramsForInfo = {
        token: ApiToken,
        title: AnimeTitle,
        limit: 'none',
      };
      const response1 = await dispatch(getAnimeSeriaThunk(paramsForInfo));
      setFoundedAnime(response1.payload);
    };
    getAnimeInfo();
  }, [AnimeTitle]);
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english;
    const AnimeImage = el.images.jpg.image_url;
    console.log(AnimeTitle, 'title', AnimeImage, 'Image');

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }
  return (
    <div>
      <Header />
      <h1 style={{ color: 'white', alignItems: 'center', marginLeft: '5%' }}>
        Search results for : <span>{AnimeTitle?.toUpperCase()}</span>
      </h1>
      <div style={{ marginTop: '50px' }} className={styles.anime_list_container}>
        <div className={styles.anime_items_container}>
          {foundAnime.map((anime: AnimeInfo, index) => {
            return (
              <div onClick={() => handleChooseAnime(anime)}>
                <SliderItem
                  isParallax={false}
                  index={index}
                  ImagesPoster={anime.images.jpg.image_url}
                  ImagesTitle={anime.title_english}
                  AnimeGenres={anime.genres[1]}
                  AnimeYear={anime.year}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnimeSearchList;
