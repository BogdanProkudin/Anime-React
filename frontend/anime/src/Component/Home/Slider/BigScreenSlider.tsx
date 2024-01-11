import React, { useEffect } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { PrevButton, NextButton, usePrevNextButtons } from './SliderArrowButtons';
import styles from './styles.module.scss';
//
import SliderItem from './SliderItem';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAnimeSliderThunk } from '../../../redux/slices/Anime';
import ImageGrid from '../AnimeList/SkeletonList';
import { useNavigate } from 'react-router-dom';

type PropType = {
  options?: EmblaOptionsType;
};

const Slider: React.FC<PropType> = (props) => {
  const { options } = props;
  const slides = useAppSelector((state) => state.getAnime.animeSlider);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const navigate = useNavigate();
  const AnimeStatusLoader = useAppSelector((state) => state.getAnime.animeStatus);
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english;
    const AnimeImage = el.images.jpg.image_url;
    console.log(AnimeTitle, 'title', AnimeImage, 'Image');

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }
  return (
    <div className={styles.slides_container}>
      <h1 style={{ fontSize: '25px', color: 'white' }}>Special For You</h1>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container}>
            {slides.map((anime: AnimeInfo, index) => {
              return AnimeStatusLoader === 'loader' ? (
                <ImageGrid />
              ) : (
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
