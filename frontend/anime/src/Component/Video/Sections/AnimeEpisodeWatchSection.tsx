import React from 'react';
import { useAppSelector } from '../../../redux/hook';
import EpisodeVideo from '../EpisodeVideo';
import AnimeVideoSkeleton from '../Skeletons/AnimeVideoSkeleton';
import InfoSection from './SectionInfo/AnimeEpisodeInfoSection';
import styles from './styles.module.scss';
type WatchSectionProps = {
  animeLink: string;
};
const WatchSection: React.FC<WatchSectionProps> = ({ animeLink }) => {
  return (
    <>
      <InfoSection />
      <EpisodeVideo animeLink={animeLink} />
    </>
  );
};
export default WatchSection;
