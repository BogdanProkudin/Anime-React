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
import { ToastContainer, toast } from 'react-toastify';
import { useGetAnimeSearchSeriaDataQuery } from '../../redux/slices/AnimeApi';
const AnimeSearchList = () => {
  const dispatch = useAppDispatch();
  const { AnimeTitle } = useParams();
  const navigate = useNavigate();

  const animeStatus = useAppSelector((state) => state.getAnime.animeStatus);

  const {
    data: foundedAnime,
    error,
    isLoading,
    isFetching,
  } = useGetAnimeSearchSeriaDataQuery({ title: AnimeTitle });
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english ? el.title_english : el.title;
    const AnimeImage = el.images.jpg.image_url;

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <h1 style={{ color: 'white', alignItems: 'center', marginLeft: '5%' }}>
        Search results for : <span>{AnimeTitle?.toUpperCase()}</span>
      </h1>
      <ToastContainer />
      <div style={{ marginTop: '50px' }} className={styles.anime_list_container}>
        <div className={styles.anime_items_container}>
          {!isFetching
            ? foundedAnime.data.map((anime: AnimeInfo, index: number) => {
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
            : [...new Array(18)].map((_) => {
                return <AnimeListSkeleton />;
              })}
        </div>
      </div>
    </>
  );
};

export default AnimeSearchList;
