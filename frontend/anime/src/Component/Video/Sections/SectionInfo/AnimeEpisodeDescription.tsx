import { useAppSelector } from '../../../../redux/hook';
import styles from './styles.module.scss';
const AnimeEpisodeDescription = () => {
  const AnimeInfo = useAppSelector((state) => state.getAnime.animeEpisode) as AnimeInfo;
  return (
    <div className={styles.anime_info_description_container}>
      <h1 className={styles.anime_info_details_title}>Description</h1>
      <p className={styles.anime_info_details_text}>{AnimeInfo.synopsis}</p>
    </div>
  );
};
export default AnimeEpisodeDescription;
