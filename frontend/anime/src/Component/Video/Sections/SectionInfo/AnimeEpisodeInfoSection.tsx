import { useAppSelector } from '../../../../redux/hook';
import AnimeDescSkeleton from '../../Skeletons/AnimeDescSkeleton';
import AnimeInfoSkeleton from '../../Skeletons/AnimeInfoSkeleton';
import AnimeTitleSkeleton from '../../Skeletons/AnimeTitleSkeleton';
import AnimeEpisodeDescription from './AnimeEpisodeDescription';
import AnimeEpisodeDetails from './AnimeEpisodeDetails';
import styles from './styles.module.scss';
const InfoSection = () => {
  const animeStatus = useAppSelector((state) => state.getAnime.animeStatus);
  return (
    <div
      style={{ alignItems: animeStatus === 'pending' ? 'center' : '' }}
      className={styles.info_section_container}
    >
      {<AnimeEpisodeDetails />}

      {animeStatus === 'pending' ? <AnimeDescSkeleton /> : <AnimeEpisodeDescription />}
    </div>
  );
};
export default InfoSection;
