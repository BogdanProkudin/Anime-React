import React from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { PrevButton, NextButton, usePrevNextButtons } from './SliderArrowButtons';
import styles from './styles.module.scss';
import imageByIndex from './CurrentImage';
import { useMediaQuery } from 'react-responsive';
type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const Slider: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <div>
      <div className={styles.slides_container}>
        <h1 style={{ fontSize: '25px', color: 'white' }}>Special For You</h1>
        <div className={styles.embla}>
          <div className={styles.embla__viewport} ref={emblaRef}>
            <div className={styles.embla__container}>
              {slides.map((index) => (
                <div className={styles.embla__slide} key={index}>
                  <div className={styles.embla__slide__number}>
                    <span>{index + 1}</span>
                  </div>
                  <img
                    className={styles.embla__slide__img}
                    src={imageByIndex(index)}
                    alt="Your alt text"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
