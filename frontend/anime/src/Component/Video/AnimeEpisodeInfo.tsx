import AnimeEpisodeButton from './AnimeEpisodeButton';
import styles from './styles.module.scss';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegBookmark } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import { useToWatchStatus } from '../../hooks/useUserInfo';
import { CiStar } from 'react-icons/ci';
import { icons } from 'react-icons/lib';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import AnimeEpisodeImageSkeleton from './Skeletons/AnimeEpisodeSkeleton';
import AnimeTitleSkeleton from './Skeletons/AnimeTitleSkeleton';
import { sendAnimeToWatch } from '../../redux/slices/Anime';
import { AnimeInfo } from '../../types/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
type AnimeEpisodeInfoType = {
  AnimePoster: string | null;
  AnimeTitle: string | undefined;
};

const AnimeEpisodeInfo: React.FC<AnimeEpisodeInfoType> = ({ AnimePoster, AnimeTitle }) => {
  const animeStatus: string = useAppSelector((state) => state.getAnime.animeStatus);
  const AnimeInfo: AnimeInfo = useAppSelector((state) => state.getAnime.animeEpisode);
  const [isToWatch, setIsToWatch] = useState(false);
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';
  const dispatch = useAppDispatch();
  const isToWatchStatus = useToWatchStatus(AnimeTitle, storedUser._id);

  useEffect(() => {
    setIsToWatch(isToWatchStatus);
  }, [isToWatchStatus]);
  async function removeFromToWatchList(userId: string, animeTitle: string | undefined) {
    try {
      await axios.put('http://localhost:3003/RemoveFromToWatch', {
        userId: userId,
        animeTitle: animeTitle,
      });
      setIsToWatch(false);
    } catch (error) {
      console.error('Error removing anime from To Watch list:', error);
    }
  }

  const AddToWatchData = {
    userId: storedUser._id,
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

  const ButtonsList = [
    { text: 'Watching', icon: <FaRegEye className={`${styles.icon}`} color="white" /> },
    {
      text: !isToWatch ? 'To Watch' : 'Remove to Watch',
      icon: <FaRegBookmark className={`${styles.icon}`} color="white" />,
    },
    {
      text: 'Add to Collection',
      width: '200px',
      icon: <FaPlus className={`${styles.icon}`} color="white" />,
    },
  ];
  console.log(isToWatch, 'TO WATCH');

  const AddAnimeToWatch = async (text: string) => {
    if (!storedUser._id) {
      toast.error('You are not logged in!', { autoClose: 3000 });
    } else if (!isToWatch) {
      await dispatch(sendAnimeToWatch(AddToWatchData));
      toast.success(`${AnimeTitle} added in list  to Watch!`, {
        autoClose: 3000,
        style: {
          backgroundColor: 'rgb(40, 40, 40)',
          color: '#fff',
          position: 'fixed',
        },
        progressStyle: {
          backgroundColor: '#fff',
        },
      });
      setIsToWatch(true);
    } else {
      removeFromToWatchList(storedUser._id, AnimeTitle);
      toast.error(`Anime "${AnimeTitle}" removed from Watch list!`, {
        autoClose: 3000,
        style: {
          backgroundColor: 'rgb(40, 40, 40)',
          color: '#fff',
          position: 'fixed',
        },
        progressStyle: {
          backgroundColor: '#fff',
        },
      });
      setIsToWatch(false);
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
