import { useMediaQuery } from 'react-responsive';

import './styles.scss';
import styles from './styles.module.scss';
import noPhoto from '../../icons/noimage.webp';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';

type AnimeGenresProps = {
  name: string;
};
type SliderItemProps = {
  tweenValues?: number[];
  index: number;
  ImagesPoster: string;
  ImagesTitle: string;
  AnimeGenres: AnimeGenresProps;
  AnimeYear: number;
  isParallax: boolean;
};
const SliderItem: React.FC<SliderItemProps> = ({
  index,
  tweenValues,
  ImagesPoster,
  ImagesTitle,
  AnimeGenres,
  AnimeYear,
  isParallax,
}) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <>
      {isSmallScreen && isParallax ? (
        <div className="embla__parallax">
          <div
            style={{
              ...(tweenValues?.length && {
                transform: `translateX(${tweenValues[index]}%)`,
              }),
            }}
          >
            <img
              className="embla__slide__img embla__parallax__img"
              src={`${ImagesPoster}`}
              alt="Your alt text"
            />
            <div className={styles.slider_items_container}>
              <h1 className={styles.slider_item_title}>{ImagesTitle}</h1>;
              <span className={styles.slider_item_subtext}>
                {AnimeYear},{AnimeGenres ? AnimeGenres.name : 'Unknown'}
              </span>
            </div>
            <div className={'small_screen_shadow'}></div>
          </div>
        </div>
      ) : (
        <div className={styles.embla__slide}>
          <div className={styles.embla_image_shadow_container} style={{ position: 'relative' }}>
            <img
              className={styles.embla__slide__img}
              src={`${ImagesPoster ? ImagesPoster : noPhoto}`}
              alt="Your alt text"
            />
            <div className={styles.poster_shadow}></div>
          </div>

          <div className={styles.slider_items_container}>
            <h1 className={styles.slider_item_title}>{ImagesTitle ? ImagesTitle : 'Unknown'}</h1>;
            <span className={styles.slider_item_subtext}>
              {AnimeYear ? AnimeYear : 'Unknown'},{AnimeGenres ? AnimeGenres.name : 'Unknown'}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
export default SliderItem;
