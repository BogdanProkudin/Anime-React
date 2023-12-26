import AnimeEpisodeDescription from './AnimeEpisodeDescription';
import AnimeEpisodeDetails from './AnimeEpisodeDetails';
import styles from './styles.module.scss';
const InfoSection = () => {
  return (
    <div className={styles.info_section_container}>
      <AnimeEpisodeDetails />
      <AnimeEpisodeDescription />
    </div>
  );
};
export default InfoSection;
