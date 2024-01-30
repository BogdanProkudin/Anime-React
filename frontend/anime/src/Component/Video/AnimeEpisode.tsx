import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import AnimeEpisodeInfo from './AnimeEpisodeInfo';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../redux/hook';
import { getAnimeSeriaLinkThunk, getAnimeSeriaThunk } from '../../redux/slices/Anime';
import WatchSection from './Sections/AnimeEpisodeWatchSection';
import Header from '../Home/Header/Header';
import { ToastContainer, toast } from 'react-toastify';

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
      console.log(AnimeTitle, 'ANIME EPISODE = title');

      const paramsForInfo = {
        token: ApiToken,
        title: AnimeTitle,
        full_match: true,
        limit: 1,
      };
      const responseForInfo = await dispatch(getAnimeSeriaThunk(paramsForInfo));

      const paramsForLink = {
        token: ApiToken,
        title: AnimeTitle,
        title_orig: responseForInfo.payload ? responseForInfo.payload.title_japanese : 'Unknown',
        full_match: true,
        limit: 1,
      };
      const responseForLink = await dispatch(getAnimeSeriaLinkThunk(paramsForLink));

      setAnimeLink(responseForLink.payload.length > 0 ? responseForLink.payload[0].link : '');
      setAnimeTrailer(responseForInfo.payload ? responseForInfo.payload.trailer.embed_url : '');
    };
    getAnimeInfo();
    window.scrollTo(0, 0);
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
