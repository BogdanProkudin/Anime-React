import React, { useEffect, useState } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { PrevButton, NextButton, usePrevNextButtons } from './SliderArrowButtons';
import styles from './styles.module.scss';
//
import SliderItem from './SliderItem';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';

import { useNavigate } from 'react-router-dom';
import { AnimeInfo } from '../../../types/Home';
import { useGetSliderAnimeAPiQuery } from '../../../redux/slices/AnimeApi';
import AnimeListSkeleton from '../AnimeList/SkeletonList';
import { toast } from 'react-toastify';
import { setSliderItems } from '../../../redux/slices/Anime';
import { useMediaQuery } from 'react-responsive';

type PropType = {
  options?: EmblaOptionsType;
};

const Slider: React.FC<PropType> = (props) => {
  const { options } = props;
  const dispatch = useAppDispatch();
  const { data, isSuccess, isLoading, isError, isFetching } = useGetSliderAnimeAPiQuery();
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 435px)' });
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english ? el.title_english : el.title;
    const AnimeImage = el.images.jpg.image_url;

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }

  useEffect(() => {
    if (isError) {
      toast.error(`Error, try reload the page`, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,

        draggable: true,
        closeButton: <span style={{ color: 'white', fontSize: '24px' }}>×</span>, // Белый крестик
        style: {
          backgroundColor: 'rgb(40, 40, 40)',
          color: '#fff',
        },
        progressStyle: {
          backgroundColor: '#fff',
        },
        className: styles.toast_container,
      });
    }
  }, []);

  return (
    <div className={styles.slides_container}>
      <h1 style={{ fontSize: '25px', color: 'white' }}>Special For You</h1>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div
            style={{
              gap: isLoading || isError ? '12px' : '',
              width: isLoading || isError ? 'max-content' : '',
            }}
            className={styles.embla__container}
          >
            {data !== undefined && !isFetching && !isError
              ? data.data.map((anime: AnimeInfo, index: number) => {
                  return (
                    <div
                      style={{ paddingLeft: !isSmallScreen ? '30px' : '15px' }}
                      className={styles.embla__container}
                      key={index}
                      onClick={() => handleChooseAnime(anime)}
                    >
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
              : [...new Array(12)].map((_, index) => {
                  return (
                    <div key={index}>
                      <AnimeListSkeleton />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
