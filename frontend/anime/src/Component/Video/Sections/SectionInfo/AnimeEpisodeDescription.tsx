import { useAppSelector } from '../../../../redux/hook';
import { AnimeInfo } from '../../../../types/Home';
import styles from './styles.module.scss';
const AnimeEpisodeDescription = () => {
  const AnimeInfo: AnimeInfo = useAppSelector((state) => state.getAnime.animeEpisode);

  return (
    <div className={styles.anime_info_description_container}>
      <h1 className={styles.anime_info_details_title}>Description</h1>
      <p className={styles.anime_info_details_text}>
        {AnimeInfo ? AnimeInfo.synopsis : 'No description'}
      </p>
    </div>
  );
};
export default AnimeEpisodeDescription;
