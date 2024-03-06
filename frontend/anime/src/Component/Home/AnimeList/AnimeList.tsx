import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import SliderItem from '../Slider/SliderItem';
import Pagination from './Pagination';
import styles from './styles.module.scss';
import { useEffect, useRef } from 'react';

import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import ImageGrid from './SkeletonList';
import { useNavigate } from 'react-router-dom';
import AnimeListSkeleton from './SkeletonList';
import { AnimeInfo } from '../../../types/Home';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import { VscDebugStart } from 'react-icons/vsc';
import { useGetAnimeListQuery } from '../../../redux/slices/AnimeApi';

const AnimeList: any = () => {
  const navigate = useNavigate();
  const AnimeItemsList = useAppSelector((state) => state.getAnime.animeList);
  const AnimeLoadStatus = useAppSelector((state) => state.getAnime.animeStatus);
  const AnimeContainerRef = useRef<HTMLDivElement>(null);
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 461px)' }); // замените на свою логику для определения размера экрана
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const urlParams = new URLSearchParams(window.location.search);
  const hasDataLoaded = localStorage.getItem('CollectionList0000');
  const limit = isPhoneScreen ? 18 : isSmallScreen ? 24 : 18;
  const currentPage = parseInt(urlParams.get('page') || '1', 10);

  const { data, error, isLoading, isSuccess, isFetching, isError } = useGetAnimeListQuery({
    currPage: currentPage,
    limit: limit,
  });
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english ? el.title_english : el.title;
    const AnimeImage = el.images.jpg.image_url;

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }

  if (isError) {
    toast.error(`Error, try reload the page with AnimeList`, {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,

      draggable: true,
      closeButton: <span style={{ color: 'white', fontSize: '24px' }}>×</span>, // Белый крестик
      style: {
        backgroundColor: 'rgb(40, 40, 40)',
        color: '#fff',
      },
      progressStyle: {
        backgroundColor: '#fff',
      },
      className: styles.toast_container,
    });
  }
  if (isFetching || isError) {
    return (
      <div className={styles.anime_list_container}>
        <h1 style={{ color: 'white' }}>Most Popular</h1>
        <div className={styles.anime_items_container}>
          {[...new Array(limit)].map((_, index) => {
            return <AnimeListSkeleton />;
          })}
        </div>
        <Pagination AnimeContainerRef={AnimeContainerRef} />
      </div>
    );
  }
  if (isLoading) {
    return null; // Ожидаем загрузки данных
  }
  return (
    <div ref={AnimeContainerRef} className={styles.anime_list_container}>
      <ToastContainer />
      <h1 style={{ color: 'white' }}>Most Popular</h1>
      <div className={styles.anime_items_container}>
        {data.data.map((el: AnimeInfo, index: number) => {
          return (
            <div onClick={() => handleChooseAnime(el)} key={index}>
              <SliderItem
                isParallax={false}
                index={index}
                ImagesPoster={el.images.jpg.image_url}
                ImagesTitle={el.title_english ? el.title_english : el.title}
                AnimeGenres={el.genres[1]}
                AnimeYear={el.year}
              />
            </div>
          );
        })}
      </div>
      <Pagination AnimeContainerRef={AnimeContainerRef} />
    </div>
  );
};
export default AnimeList;
