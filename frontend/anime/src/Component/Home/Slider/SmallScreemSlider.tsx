import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { flushSync } from 'react-dom';
import ImageGrid from '../AnimeList/SkeletonList';
import './styles.scss';
import SliderItem from './SliderItem';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { useNavigate } from 'react-router-dom';
import { AnimeInfo } from '../../../types/Home';
import { getAnimeSliderThunk } from '../../../redux/slices/Anime';
const TWEEN_FACTOR = 1.2;

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props;

  const hasDataLoaded = localStorage.getItem('hasDataLoadedz');
  const storedSliderData = hasDataLoaded !== null ? JSON.parse(hasDataLoaded) : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [slides, setSlides] = useState([]);
  const [tweenValues, setTweenValues] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * (-1 / TWEEN_FACTOR) * 100;
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', () => {
      flushSync(() => onScroll());
    });
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);
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
  function handleChooseAnime(el: AnimeInfo) {
    const AnimeTitle = el.title_english ? el.title_english : el.title;
    const AnimeImage = el.images.jpg.image_url;
    console.log(AnimeTitle, 'title', AnimeImage, 'Image');

    navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
  }
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {storedSliderData !== null ? (
            storedSliderData.length === 0 ? (
              slides
            ) : (
              storedSliderData.map((anime: AnimeInfo, index: number) => {
                return (
                  <div key={index} onClick={() => handleChooseAnime(anime)}>
                    <SliderItem
                      isParallax={true}
                      index={index}
                      ImagesPoster={anime ? anime.images.jpg.image_url : 'Unknown'}
                      ImagesTitle={anime ? anime.title_english : ": 'Unknown'"}
                      AnimeGenres={anime ? anime.genres[1] : ": 'Unknown'"}
                      AnimeYear={anime ? anime.year : "Unknown'"}
                      tweenValues={tweenValues}
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
  );
};

export default EmblaCarousel;
