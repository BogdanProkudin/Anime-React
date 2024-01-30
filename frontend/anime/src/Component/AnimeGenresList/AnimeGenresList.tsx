import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { AnimeInfo } from '../../types/Home';
import Header from '../Home/Header/Header';
import { useEffect, useRef, useState } from 'react';
import { getAnimeGenresListThunk } from '../../redux/slices/Anime';
import AnimeGenresPagination from './AnimeGenresPagination';
import SliderItem from '../Home/Slider/SliderItem';
import styles from '../Home/AnimeList/styles.module.scss';
import AnimeListSkeleton from '../Home/AnimeList/SkeletonList';
const AnimeGenresList = () => {
  const AnimeContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { AnimeGenres } = useParams();
  const navigate = useNavigate();
  const animeGenresList = useAppSelector((state) => state.getAnime.animeGenresList);
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english ? el.title_english : el.title;
    const AnimeImage = el.images.jpg.image_url;

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }

  return (
    <div ref={AnimeContainerRef}>
      <Header />
      <h1 style={{ color: 'white', alignItems: 'center', marginLeft: '5%' }}>
        Best collection anime for : <span>{AnimeGenres?.toUpperCase()}</span>
      </h1>
      <div style={{ marginTop: '50px' }} className={styles.anime_list_container}>
        <div className={styles.anime_items_container}>
          {animeGenresList ? (
            animeGenresList.length > 0 ? (
              animeGenresList.map((anime: AnimeInfo, index: number) => {
                return (
                  <div onClick={() => handleChooseAnime(anime)}>
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
            ) : (
              [...new Array(18)].map((_) => {
                return <AnimeListSkeleton />;
              })
            )
          ) : (
            <h1
              style={{
                color: 'red',
                fontSize: '20px',
                marginLeft: '20rem',
                width: '440px',
              }}
            >
              Slow Down. Now you can reload the PageGG
            </h1>
          )}
        </div>
      </div>

      <AnimeGenresPagination genresName={AnimeGenres} AnimeContainerRef={AnimeContainerRef} />
    </div>
  );
};

export default AnimeGenresList;
