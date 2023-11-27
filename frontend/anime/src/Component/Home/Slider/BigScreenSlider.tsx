import React, { useEffect } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { PrevButton, NextButton, usePrevNextButtons } from './SliderArrowButtons';
import styles from './styles.module.scss';
//
import SliderItem from './SliderItem';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAnimeThunk } from '../../../redux/slices/Anime';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const Slider: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const dispatch = useAppDispatch();
  const ImagesPoster = useAppSelector((state) => state.getAnime.animePoster);
  const ImagesTitle = useAppSelector((state) => state.getAnime.animeTitle);
  const AnimeGenres: any = useAppSelector((state) => state.getAnime.animeGenres);
  const AnimeYear = useAppSelector((state) => state.getAnime.animeYear);
  useEffect(() => {
    const getAnimeFunc = async () => {
      await dispatch(getAnimeThunk());
    };
    getAnimeFunc();
  }, []);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <div className={styles.slides_container}>
      <h1 style={{ fontSize: '25px', color: 'white' }}>Special For You</h1>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container}>
            {slides.map((index) => (
              <SliderItem
                ImagesPoster={ImagesPoster}
                ImagesTitle={ImagesTitle}
                AnimeGenres={AnimeGenres}
                AnimeYear={AnimeYear}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
