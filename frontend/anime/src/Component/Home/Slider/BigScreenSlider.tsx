import React, { useEffect, useState } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { PrevButton, NextButton, usePrevNextButtons } from './SliderArrowButtons';
import styles from './styles.module.scss';
//
import SliderItem from './SliderItem';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAnimeSliderThunk } from '../../../redux/slices/Anime';
import ImageGrid from '../AnimeList/SkeletonList';
import { useNavigate } from 'react-router-dom';
import { AnimeInfo } from '../../../types/Home';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';

type PropType = {
  options?: EmblaOptionsType;
};

const Slider: React.FC<PropType> = (props) => {
  const { options } = props;
  const dispatch = useAppDispatch();

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const navigate = useNavigate();
  const AnimeStatusLoader = useAppSelector((state) => state.getAnime.animeSliderStatus);
  const hasDataLoaded = localStorage.getItem('hasDataLoadedz');
  const storedSliderData = hasDataLoaded !== null ? JSON.parse(hasDataLoaded) : [];
  const [slides, setSlides] = useState([]);
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english ? el.title_english : el.title;
    const AnimeImage = el.images.jpg.image_url;

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }

  useEffect(() => {
    async function getSliderAnime() {
      if (!hasDataLoaded) {
        const response = (await dispatch(getAnimeSliderThunk())).payload;

        const sliderDataStrig = JSON.stringify(response);
        localStorage.setItem('hasDataLoadedz', sliderDataStrig);
        setSlides(response);
      }
    }
    getSliderAnime();
  }, [dispatch]);

  return (
    <div className={styles.slides_container}>
      <h1 style={{ fontSize: '25px', color: 'white' }}>Special For You</h1>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container}>
            {storedSliderData !== null ? (
              storedSliderData.length === 0 ? (
                slides
              ) : (
                storedSliderData.map((anime: AnimeInfo, index: number) => {
                  return (
                    <div key={index} onClick={() => handleChooseAnime(anime)}>
                      <SliderItem
                        isParallax={false}
                        index={index}
                        ImagesPoster={anime ? anime.images.jpg.image_url : 'Unknown'}
                        ImagesTitle={anime ? anime.title_english : ": 'Unknown'"}
                        AnimeGenres={anime ? anime.genres[1] : ": 'Unknown'"}
                        AnimeYear={anime ? anime.year : "Unknown'"}
                      />
                    </div>
                  );
                })
              )
            ) : (
              <ImageGrid />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
