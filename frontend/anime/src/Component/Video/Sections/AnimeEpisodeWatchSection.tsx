import EpisodeVideo from '../EpisodeVideo';
import InfoSection from './SectionInfo/AnimeEpisodeInfoSection';
import styles from './styles.module.scss';
type WatchSectionProps = {
  animeLink: string;
};
const WatchSection: React.FC<WatchSectionProps> = ({ animeLink }) => {
  return (
    <div className={styles.watch_section_container}>
      <InfoSection />
      <EpisodeVideo animeLink={animeLink} />
    </div>
  );
};
export default WatchSection;
