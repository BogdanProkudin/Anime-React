import AnimeEpisodeButton from './AnimeEpisodeButton';
import styles from './styles.module.scss';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegBookmark } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';

import { CiStar } from 'react-icons/ci';
import { icons } from 'react-icons/lib';
import { useAppSelector } from '../../redux/hook';
import AnimeEpisodeImageSkeleton from './Skeletons/AnimeEpisodeSkeleton';
import AnimeTitleSkeleton from './Skeletons/AnimeTitleSkeleton';
type AnimeEpisodeInfo = {
  AnimeImage: string | null;
  AnimeTitle: string | undefined;
};

const AnimeEpisodeInfo: React.FC<AnimeEpisodeInfo> = ({ AnimeImage, AnimeTitle }) => {
  const animeStatus = useAppSelector((state) => state.getAnime.animeStatus);
  const ButtonsList = [
    { text: 'Watching', icon: <FaRegEye className={`${styles.icon}`} color="white" /> },
    { text: 'To Watch', icon: <FaRegBookmark className={`${styles.icon}`} color="white" /> },
    {
      text: 'Add to Collection',
      width: '200px',
      icon: <FaPlus className={`${styles.icon}`} color="white" />,
    },
  ];
  return (
    <div className={styles.anime_info_container}>
      {animeStatus === 'pending' ? (
        <AnimeEpisodeImageSkeleton />
      ) : (
        <img className={styles.anime_episode_image} src={`${AnimeImage}`} />
      )}
      {animeStatus === 'pending' ? (
        <AnimeTitleSkeleton />
      ) : (
        <div className={styles.anime_info_text_container}>
          <h1 className={styles.anime_info_text}>{AnimeTitle}</h1>
          <span className={styles.anime_info_subtext}>
            <CiStar /> 8.51
          </span>
          <div className={styles.anime_episode_conainer_button}>
            {ButtonsList.map((button: { text: string; width?: string | undefined; icon: any }) => {
              return (
                <div key={button.text}>
                  <AnimeEpisodeButton text={button.text} icon={button.icon} width={button.width} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeEpisodeInfo;
