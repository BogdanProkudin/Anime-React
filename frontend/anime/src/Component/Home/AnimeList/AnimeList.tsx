import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '../../../redux/hook';
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
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english;
    const AnimeImage = el.images.jpg.image_url;
    console.log(AnimeTitle, 'title', AnimeImage, 'Image');

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }
  return (
    <div ref={AnimeContainerRef} className={styles.anime_list_container}>
      <h1 style={{ color: 'white' }}>Most Popular</h1>
      <div className={styles.anime_items_container}>
        {AnimeItemsList ? (
          AnimeItemsList.map((el: AnimeInfo, index: number) => {
            return (
              <div onClick={() => handleChooseAnime(el)} key={index}>
                {AnimeLoadStatus === 'loading' || AnimeItemsList.length === 0 ? (
                  <AnimeListSkeleton />
                ) : (
                  <SliderItem
                    isParallax={false}
                    index={index}
                    ImagesPoster={el.images.jpg.image_url}
                    ImagesTitle={el.title_english}
                    AnimeGenres={el.genres[1]}
                    AnimeYear={el.year}
                  />
                )}
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
            Slow Down. Now you can choose next Page
          </h1>
        )}
      </div>
      <Pagination AnimeContainerRef={AnimeContainerRef} />
    </div>
  );
};
export default AnimeList;
