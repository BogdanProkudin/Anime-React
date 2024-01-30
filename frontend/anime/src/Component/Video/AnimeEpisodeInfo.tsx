import AnimeEpisodeButton from './AnimeEpisodeButton';
import styles from './styles.module.scss';
import { FaRegEye } from 'react-icons/fa6';
import { FaRegBookmark } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';

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
type AnimeEpisodeInfo = {
  AnimePoster: string | null;
  AnimeTitle: string | undefined;
};

const AnimeEpisodeInfo: React.FC<AnimeEpisodeInfo> = ({ AnimePoster, AnimeTitle }) => {
  const animeStatus = useAppSelector((state) => state.getAnime.animeStatus);
  const AnimeInfo: AnimeInfo = useAppSelector((state) => state.getAnime.animeEpisode);
  const [isToWatch, setIsToWatch] = useState(false);
  const storedUserString = localStorage.getItem('CurrentUser');
  const storedUser = storedUserString !== null ? JSON.parse(storedUserString) : 'NOT FOUND';
  async function removeFromToWatchList(userName: string, animeTitle: string | undefined) {
    try {
      const response = await axios.put('http://localhost:3003/RemoveFromToWatch', {
        userName: userName,
        animeTitle: animeTitle,
      });

      setIsToWatch(false);
    } catch (error) {
      console.error('Error removing anime from To Watch list:', error);
    }
  }

  useEffect(() => {
    async function getIsToWatch() {
      const response = await axios.get(
        `http://localhost:3003/CheckIsToWatch?animeTitle=${AnimeTitle}&userName=${storedUser.UserName}`,
      );
      console.log(response, 'RESPONSE');
      setIsToWatch(response.data.isInToWatchList);
    }
    getIsToWatch();
  }, []);
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
  const AddAnimeToWatch = async (text: string) => {
    if (text === 'To Watch') {
      const response = await dispatch(sendAnimeToWatch(AddToWatchData));

      toast.success(`Anime "${AnimeTitle}" added in list  to Watch!`, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,

        draggable: true,
        closeButton: <span style={{ color: 'white', fontSize: '24px' }}>×</span>, // Белый крестик
        style: {
          backgroundColor: 'rgb(40, 40, 40)', // Черный фон
          color: '#fff', // Белый текст
          position: 'fixed',
        },
        progressStyle: {
          backgroundColor: '#fff',
        },
        className: styles.toast_container,
      });
      setIsToWatch(true);
    }
    if (text === 'Remove to Watch') {
      removeFromToWatchList(storedUser.UserName, AnimeTitle);
      toast.error(`Anime "${AnimeTitle}" deleted from list to Watch!`, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,

        draggable: true,
        closeButton: <span style={{ color: 'white', fontSize: '24px' }}>×</span>,
        style: {
          backgroundColor: 'rgb(40, 40, 40)', // Красный фон для успешного удаления
          color: '#fff',
          position: 'fixed',
        },
        progressStyle: {
          backgroundColor: '#fff',
        },

        className: styles.toast_container,
      });
    }
  };
  console.log('ANIMEEEEEEE', AnimeTitle);

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
