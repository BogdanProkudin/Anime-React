import { useMediaQuery } from 'react-responsive';

import './styles.scss';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAnimeThunk } from '../../../redux/slices/Anime';
type AnimeGenresProps = {
  name: string;
};
type SliderItemProps = {
  tweenValues?: number[];
  index: number;
  ImagesPoster: string[];
  ImagesTitle: string[];
  AnimeGenres: AnimeGenresProps[];
  AnimeYear: string[];
};
const SliderItem: React.FC<SliderItemProps> = ({
  index,
  tweenValues,
  ImagesPoster,
  ImagesTitle,
  AnimeGenres,
  AnimeYear,
}) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  const imageByIndex = (index: number): string => ImagesPoster[index % ImagesPoster.length];
  return (
    <>
      {isSmallScreen && tweenValues ? (
        <div className="embla__parallax">
          <div
            className="embla__parallax__layer"
            style={{
              ...(tweenValues.length && {
                transform: `translateX(${tweenValues[index]}%)`,
              }),
            }}
          >
            <img
              className="embla__slide__img embla__parallax__img"
              src={imageByIndex(index)}
              alt="Your alt text"
            />
          </div>
        </div>
      ) : (
        <div
          onClick={() => console.log('ANIME NAME IS ', ImagesTitle[index])}
          className={styles.embla__slide}
        >
          <img className={styles.embla__slide__img} src={imageByIndex(index)} alt="Your alt text" />
          <div className={styles.slider_items_container}>
            <h1 className={styles.slider_item_title}>{ImagesTitle[index]}</h1>;
            <span className={styles.slider_item_subtext}>
              {AnimeYear[index]},{AnimeGenres[index] ? AnimeGenres[index].name : 'Unknown'}
            </span>
          </div>
          <div className={styles.poster_shadow}></div>
        </div>
      )}
    </>
  );
};
export default SliderItem;
