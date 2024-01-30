import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../Home/Header/Header';
import { getAnimeSeriaThunk } from '../../redux/slices/Anime';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import styles from '../Home/AnimeList/styles.module.scss';
import SliderItem from '../Home/Slider/SliderItem';
import { AnimeInfo } from '../../types/Home';
import AnimeListSkeleton from '../Home/AnimeList/SkeletonList';
const AnimeSearchList = () => {
  const dispatch = useAppDispatch();
  const { AnimeTitle } = useParams();
  const navigate = useNavigate();

  const animeStatus = useAppSelector((state) => state.getAnime.animeStatus);

  const [foundedAnime, setFoundedAnime] = useState([]);

  useEffect(() => {
    async function getAnimeInfo() {
      const paramsForInfo = {
        title: AnimeTitle,
        limit: 'none',
      };

      localStorage.removeItem('hasSearchAnimeDataLoaded123456912');

      const response = (await dispatch(getAnimeSeriaThunk(paramsForInfo))).payload;

      setFoundedAnime(response);
    }
    getAnimeInfo();
  }, [AnimeTitle, dispatch]);

  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english;
    const AnimeImage = el.images.jpg.image_url;

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }

  return (
    <>
      <Header />
      <h1 style={{ color: 'white', alignItems: 'center', marginLeft: '5%' }}>
        Search results for : <span>{AnimeTitle?.toUpperCase()}</span>
      </h1>
      <div style={{ marginTop: '50px' }} className={styles.anime_list_container}>
        <div className={styles.anime_items_container}>
          {foundedAnime ? (
            foundedAnime.length > 0 ? (
              foundedAnime.map((anime: AnimeInfo, index: number) => {
                return (
                  <div onClick={() => handleChooseAnime(anime)}>
                    <SliderItem
                      isParallax={false}
                      index={index}
                      ImagesPoster={anime.images.jpg.image_url}
                      ImagesTitle={anime.title_english ? anime.title_english : anime.title}
                      AnimeGenres={anime.genres[1]}
                      AnimeYear={anime.year}
                    />
                  </div>
                );
              })
            ) : (
              <h1
                style={{
                  color: 'red',
                  fontSize: '20px',
                  marginLeft: '20rem',
                  width: '440px',
                }}
              >
                Slow Down. Now you can reload the Page
              </h1>
            )
          ) : (
            <h1
              style={{
                color: 'red',
                fontSize: '20px',
                marginLeft: '20rem',
                width: '440px',
              }}
            >
              Slow Down. Now you can reload the Page
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default AnimeSearchList;
