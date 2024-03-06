import { useMediaQuery } from 'react-responsive';

import styles from './styles.module.scss';
import noPhoto from '../../icons/noimage.webp';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { VscDebugStart } from 'react-icons/vsc';
import { isString } from 'lodash';
import AnimeListSkeleton from '../AnimeList/SkeletonList';
import photo from '../../icons/attack-on-titan-character-poster-uhdpaper.com-4K-8.2105.jpg';
type AnimeGenresProps = {
  name: string;
};
type SliderItemProps = {
  tweenValues?: number[];
  index: number;
  ImagesPoster: string;
  ImagesTitle: string;
  AnimeGenres: AnimeGenresProps | string;
  AnimeYear: number | string;
  isParallax: boolean;
  isBlur?: boolean;
};
const SliderItem: React.FC<SliderItemProps> = ({
  index,
  tweenValues,
  ImagesPoster,
  ImagesTitle,
  AnimeGenres,
  AnimeYear,
  isParallax,
  isBlur,
}) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const AnimeItemsList = useAppSelector((state) => state.getAnime.animeList);
  return (
    <button className={styles.slider_anime_container}>
      <div className={styles.embla_image_shadow_container} style={{ position: 'relative' }}>
        <img
          className={styles.embla__slide__img}
          src={`${ImagesPoster ? ImagesPoster : photo}`}
          alt="Your alt text"
        />

        <div className={styles.embla_image_shadow}></div>
        <VscDebugStart className={styles.play_button} />
      </div>

      <div className={styles.slider_items_container}>
        <h1 className={styles.slider_item_title}>{ImagesTitle ? ImagesTitle : 'Unknown'}</h1>;
        <span className={styles.slider_item_subtext}>
          {AnimeYear ? AnimeYear : 'Unknown'},
          {AnimeGenres && !isString(AnimeGenres) ? AnimeGenres.name : 'Unknown'}
        </span>
      </div>
    </button>
  );
};
export default SliderItem;
