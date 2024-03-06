import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import AnimeEpisodeInfo from './AnimeEpisodeInfo';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../redux/hook';
import { getAnimeSeriaLinkThunk, getAnimeSeriaThunk } from '../../redux/slices/Anime';
import WatchSection from './Sections/AnimeEpisodeWatchSection';
import Header from '../Home/Header/Header';
import { ToastContainer, toast } from 'react-toastify';

import styles from './styles.module.scss';
const AnimeEpisode = () => {
  const { AnimeTitle } = useParams();
  const location = useLocation();
  const animeImage = new URLSearchParams(location.search).get('image');

  const [animeLink, setAnimeLink] = useState('');
  const [animeTrailer, setAnimeTrailer] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAnimeInfo = async () => {
      const ApiToken = '205cbb1f38375f91b405169fa2da91a8';

      const paramsForInfo = {
        token: ApiToken,
        title: AnimeTitle,
        full_match: true,
        limit: 1,
      };
      const responseForInfo = await dispatch(getAnimeSeriaThunk(paramsForInfo));

      if (responseForInfo.payload) {
        if (responseForInfo.payload.trailer.youtube_id) {
          setAnimeTrailer(responseForInfo.payload.trailer.youtube_id);
        } else {
          toast.error(`Youtube player is not found!`, {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,

            draggable: true,
            closeButton: <span style={{ color: 'white', fontSize: '24px' }}>×</span>, // Белый крестик
            style: {
              backgroundColor: 'rgb(40, 40, 40)',
              color: '#fff',
              position: 'fixed',
            },
            progressStyle: {
              backgroundColor: '#fff',
            },
            className: styles.toast_container,
          });
        }
      }
    };
    window.scrollTo(0, 0);
    getAnimeInfo();
  }, [AnimeTitle]);

  return (
    <div style={{ maxHeight: '100px' }}>
      <Header />
      <ToastContainer />

      {<AnimeEpisodeInfo AnimeTitle={AnimeTitle} AnimePoster={animeImage} />}

      <WatchSection animeLink={animeLink.length === 0 ? animeTrailer : animeLink} />
    </div>
  );
};

export default AnimeEpisode;
