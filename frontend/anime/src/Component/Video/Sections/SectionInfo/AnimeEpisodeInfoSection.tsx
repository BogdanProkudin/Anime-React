import React from 'react';
import { useAppSelector } from '../../../../redux/hook';
import AnimeDescSkeleton from '../../Skeletons/AnimeDescSkeleton';
import AnimeInfoSkeleton from '../../Skeletons/AnimeInfoSkeleton';
import AnimeTitleSkeleton from '../../Skeletons/AnimeTitleSkeleton';
import AnimeEpisodeDescription from './AnimeEpisodeDescription';
import AnimeEpisodeDetails from './AnimeEpisodeDetails';
import styles from './styles.module.scss';
const InfoSection = () => {
  const animeStatus = useAppSelector((state) => state.getAnime.animeStatus);
  const AnimeInfo = useAppSelector((state) => state.getAnime.animeEpisode);
  return (
    <div
      style={{
        alignItems: animeStatus === 'pending' || !AnimeInfo ? 'center' : '',
        marginLeft: animeStatus === 'pending' || !AnimeInfo ? '0px' : '',
      }}
      className={styles.info_section_container}
    >
      {<AnimeEpisodeDetails />}

      {animeStatus !== 'finished' || !AnimeInfo ? (
        <AnimeDescSkeleton />
      ) : (
        <AnimeEpisodeDescription />
      )}
    </div>
  );
};
export default InfoSection;
