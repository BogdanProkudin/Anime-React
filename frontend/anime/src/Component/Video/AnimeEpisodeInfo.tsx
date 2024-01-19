import AnimeEpisodeButton from './AnimeEpisodeButton';
import styles from './styles.module.scss';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegBookmark } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';

import { CiStar } from 'react-icons/ci';
import { icons } from 'react-icons/lib';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import AnimeEpisodeImageSkeleton from './Skeletons/AnimeEpisodeSkeleton';
import AnimeTitleSkeleton from './Skeletons/AnimeTitleSkeleton';
import { sendAnimeToWatch } from '../../redux/slices/Anime';
import { AnimeInfo } from '../../types/Home';
type AnimeEpisodeInfo = {
  AnimePoster: string | null;
  AnimeTitle: string | undefined;
};

const AnimeEpisodeInfo: React.FC<AnimeEpisodeInfo> = ({ AnimePoster, AnimeTitle }) => {
  const animeStatus = useAppSelector((state) => state.getAnime.animeStatus);
  const AnimeInfo: AnimeInfo = useAppSelector((state) => state.getAnime.animeEpisode);
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';
  console.log(AnimeInfo, 'QWGG');

  const AddToWatchData = {
    CurrentUser: storedUser.UserName,
    ToWatch: {
      AnimeTitle,
      AnimePoster,
      AnimeGenres:
        animeStatus === 'finished' && AnimeInfo && AnimeInfo.genres
          ? AnimeInfo.genres[1]
          : 'Unknown',
      AnimeYear: AnimeInfo ? AnimeInfo.year : 'Unknown',
    },
  };
  const dispatch = useAppDispatch();
  const ButtonsList = [
    { text: 'Watching', icon: <FaRegEye className={`${styles.icon}`} color="white" /> },
    { text: 'To Watch', icon: <FaRegBookmark className={`${styles.icon}`} color="white" /> },
    {
      text: 'Add to Collection',
      width: '200px',
      icon: <FaPlus className={`${styles.icon}`} color="white" />,
    },
  ];
  const AddAnimeToWatch = async (text: string) => {
    if (text === 'To Watch') {
      const response = await dispatch(sendAnimeToWatch(AddToWatchData));
      console.log('RESPONSE FRO  TO WATCH', response);
    }
  };
  return (
    <div className={styles.anime_info_container}>
      {animeStatus !== 'finished' || !AnimeInfo ? (
        <AnimeEpisodeImageSkeleton />
      ) : (
        <img className={styles.anime_episode_image} src={`${AnimePoster}`} />
      )}
      {animeStatus !== 'finished' || !AnimeInfo ? (
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
                <div onClick={() => AddAnimeToWatch(button.text)} key={button.text}>
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
