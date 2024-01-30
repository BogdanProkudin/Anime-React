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

const AnimeList: React.FC = () => {
  const navigate = useNavigate();
  const AnimeItemsList = useAppSelector((state) => state.getAnime.animeList);
  const AnimeLoadStatus = useAppSelector((state) => state.getAnime.animeStatus);
  const AnimeContainerRef = useRef<HTMLDivElement>(null);
  const hasDataLoaded = localStorage.getItem('hasDataLoaded09');
  const storedListData = hasDataLoaded !== null ? JSON.parse(hasDataLoaded) : [];
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english ? el.title_english : el.title;
    const AnimeImage = el.images.jpg.image_url;

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }
  return (
    <div ref={AnimeContainerRef} className={styles.anime_list_container}>
      <h1 style={{ color: 'white' }}>Most Popular</h1>
      <div className={styles.anime_items_container}>
        {AnimeItemsList
          ? AnimeItemsList.map((el: AnimeInfo, index: number) => {
              return (
                <div onClick={() => handleChooseAnime(el)} key={index}>
                  {AnimeLoadStatus === 'loading' || AnimeItemsList.length === 0 ? (
                    <AnimeListSkeleton />
                  ) : (
                    <SliderItem
                      isParallax={false}
                      index={index}
                      ImagesPoster={el.images.jpg.image_url}
                      ImagesTitle={el.title_english ? el.title_english : el.title}
                      AnimeGenres={el.genres[1]}
                      AnimeYear={el.year}
                    />
                  )}
                </div>
              );
            })
          : [...new Array(15)].map(() => {
              return <AnimeListSkeleton />;
            })}
      </div>
      <Pagination AnimeContainerRef={AnimeContainerRef} />
    </div>
  );
};
export default AnimeList;
