import { useMediaQuery } from 'react-responsive';
import imageByIndex from './CurrentImages';
import './styles.scss';
import styles from './styles.module.scss';
type SliderItemProps = {
  tweenValues?: number[];
  index: number;
};
const SliderItem: React.FC<SliderItemProps> = ({ index, tweenValues }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <>
      {isSmallScreen && tweenValues ? (
        <div className="embla__parallax">
          <div
            className="embla__parallax__layer"
            style={{
              ...(tweenValues.length && {
                transform: `translateX(${tweenValues[index]}%)`,
              }),
            }}
          >
            <img
              className="embla__slide__img embla__parallax__img"
              src={imageByIndex(index)}
              alt="Your alt text"
            />
          </div>
        </div>
      ) : (
        <div className={styles.embla__slide}>
          <img className={styles.embla__slide__img} src={imageByIndex(index)} alt="Your alt text" />
          <div className={styles.slider_items_container}>
            <h1 className={styles.slider_item_title}>Attack on Titan</h1>

            <span className={styles.slider_item_subtext}>2001,Adventures</span>
          </div>
          <div className={styles.poster_shadow}></div>
        </div>
      )}
    </>
  );
};
export default SliderItem;
