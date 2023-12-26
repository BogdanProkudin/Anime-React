import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import EpisodeVideo from './EpisodeVideo';
import AnimeEpisodeInfo from './AnimeEpisodeInfo';
import styles from './styles.module.scss';

import { useAppDispatch } from '../../redux/hook';
import { getAnimeSeriaLinkThunk, getAnimeSeriaThunk } from '../../redux/slices/Anime';
import WatchSection from './Sections/AnimeEpisodeWatchSection';
import Header from '../Home/Header/Header';
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
      console.log(AnimeTitle, 'title');

      const params1 = {
        token: ApiToken,
        title: AnimeTitle,
        full_match: true,
        limit: 1,
      };
      const response1 = await dispatch(getAnimeSeriaThunk(params1));

      const params2 = {
        token: ApiToken,
        title: AnimeTitle,
        title_orig: response1.payload.title_japanese,
        full_match: true,
        limit: 1,
      };
      const response = await dispatch(getAnimeSeriaLinkThunk(params2));

      setAnimeLink(response.payload.length > 0 ? response.payload[0].link : '');
      setAnimeTrailer(response1.payload.trailer.embed_url);
      console.log(response1, 'respnse1');

      console.log(animeLink, 'linkk');
    };
    getAnimeInfo();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      <Header />
      <div>{<AnimeEpisodeInfo AnimeTitle={AnimeTitle} AnimeImage={animeImage} />}</div>
      <WatchSection animeLink={animeLink.length === 0 ? animeTrailer : animeLink} />
    </div>
  );
};

export default AnimeEpisode;
