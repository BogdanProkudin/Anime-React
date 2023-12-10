import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '../../../redux/hook';
import SliderItem from '../Slider/SliderItem';
import Pagination from './Pagination';
import styles from './styles.module.scss';
import { useEffect } from 'react';

import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import ImageGrid from './SkeletonList';

const AnimeList = () => {
  const AnimeItemsList = useAppSelector((state) => state.getAnime.animeList);
  const AnimeLoadStatus = useAppSelector((state) => state.getAnime.animeStatus);
  return (
    <div className={styles.anime_list_container}>
      <h1 style={{ color: 'white' }}>Most Popular</h1>
      <div className={styles.anime_items_container}>
        {AnimeItemsList ? (
          AnimeItemsList.map((el: AnimeInfo, index) => {
            return (
              <div key={index}>
                {AnimeLoadStatus === 'loading' || AnimeItemsList.length === 0 ? (
                  <ImageGrid />
                ) : (
                  <SliderItem
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
      <Pagination />
    </div>
  );
};
export default AnimeList;
function dispatch(
  arg0: AsyncThunkAction<
    any,
    { limit?: number | undefined; currPage?: number | undefined },
    {
      state?: unknown;
      dispatch?: Dispatch<AnyAction> | undefined;
      extra?: unknown;
      rejectValue?: unknown;
      serializedErrorType?: unknown;
      pendingMeta?: unknown;
      fulfilledMeta?: unknown;
      rejectedMeta?: unknown;
    }
  >,
) {
  throw new Error('Function not implemented.');
}
