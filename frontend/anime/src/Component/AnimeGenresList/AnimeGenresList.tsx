import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { AnimeInfo } from '../../types/Home';
import Header from '../Home/Header/Header';
import { useEffect, useRef, useState } from 'react';

import AnimeGenresPagination from './AnimeGenresPagination';
import SliderItem from '../Home/Slider/SliderItem';
import styles from '../Home/AnimeList/styles.module.scss';
import AnimeListSkeleton from '../Home/AnimeList/SkeletonList';
import { ToastContainer } from 'react-toastify';
import {
  useGetAnimeGenresList2Query,
  useGetAnimeGenresListQuery,
} from '../../redux/slices/AnimeApi';
const AnimeGenresList = () => {
  const AnimeContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { AnimeGenres } = useParams();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page') || '1', 10);
  const [animeGenresList, setAnimeGenresList] = useState<any>([]);
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english ? el.title_english : el.title;
    const AnimeImage = el.images.jpg.image_url;

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }
  const { data, isError, isLoading } = useGetAnimeGenresListQuery({
    page: currentPage,
    genresName: AnimeGenres ? AnimeGenres : '',
  });
  const {
    data: data2,
    isError: isError2,
    isLoading: isLoading2,
    isFetching,
  } = useGetAnimeGenresList2Query({
    page: currentPage,
    genresName: AnimeGenres ? AnimeGenres : '',
  });
  console.log(data, '!', data2, '2');

  useEffect(() => {
    if (data && data2) {
      setAnimeGenresList(() => [...data, ...data2]);
    } else if (data) {
      setAnimeGenresList(() => [...data]);
    } else if (data2) {
      setAnimeGenresList(() => [...data2]);
    }
  }, [data, data2]);

  return (
    <div ref={AnimeContainerRef}>
      <Header />
      <h1 style={{ color: 'white', alignItems: 'center', marginLeft: '5%' }}>
        Best collection anime for : <span>{AnimeGenres?.toUpperCase()}</span>
      </h1>
      <ToastContainer />
      <div style={{ marginTop: '50px' }} className={styles.anime_list_container}>
        <div className={styles.anime_items_container}>
          {!isLoading && !isLoading2
            ? animeGenresList.map((anime: AnimeInfo, index: number) => {
                return (
                  <div key={index} onClick={() => handleChooseAnime(anime)}>
                    <SliderItem
                      isParallax={false}
                      index={index}
                      ImagesPoster={anime.images.jpg.image_url}
                      ImagesTitle={anime.title_english}
                      AnimeGenres={anime.genres[1]}
                      AnimeYear={anime.year}
                    />
                  </div>
                );
              })
            : [...new Array(18)].map((_) => {
                return <AnimeListSkeleton />;
              })}
        </div>
      </div>

      <AnimeGenresPagination genresName={AnimeGenres} AnimeContainerRef={AnimeContainerRef} />
    </div>
  );
};

export default AnimeGenresList;
