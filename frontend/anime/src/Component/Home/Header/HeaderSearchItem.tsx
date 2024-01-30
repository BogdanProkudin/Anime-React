import { useMediaQuery } from 'react-responsive';

import styles from './styles.module.scss';
import { useAppSelector } from '../../../redux/hook';
interface HeaderSearchItemProps {
  suggestion: any;
}
const HeaderSearchItem: React.FC<HeaderSearchItemProps> = ({ suggestion }) => {
  const isSmallScreen = useMediaQuery({ query: '(min-width:683px)' });
  const status = useAppSelector((state) => state.getAnime.animeStatus);

  return (
    <>
      {suggestion !== 'Not Found' && isSmallScreen && status !== 'Error' ? (
        <div className={styles.suggestion_item}>
          <img
            src={suggestion.images.jpg.small_image_url}
            alt={suggestion.title}
            className={styles.suggestion_image}
          />
          <div className={styles.suggestion_item_info_container}>
            <span className={styles.suggestion_title}>
              {suggestion.title_english ? suggestion.title_english : suggestion.title}
            </span>
            <span className={styles.suggestion_item_info_desc}>
              {suggestion.synopsis ? suggestion.synopsis : '-'}
            </span>
            <div className={styles.suggestion_item_subinfo_container}>
              <span className={styles.suggestion_item_subinfo_item}>
                {suggestion.year ? suggestion.year : '-'}
              </span>

              <span className={styles.suggestion_item_subinfo_item}>{`| ${
                suggestion.type ? suggestion.type : '-'
              } | `}</span>
              <span className={styles.suggestion_item_subinfo_item}>{` ${
                suggestion.duration ? suggestion.duration : '-'
              }`}</span>
            </div>
          </div>
        </div>
      ) : suggestion !== 'Not Found' ? (
        <div className={styles.suggestion_small_screen_item}>
          <img
            src={suggestion.images.jpg.small_image_url}
            alt={suggestion.title}
            className={styles.suggestion_image}
          />
          <div className={styles.suggestion_small_screen_item_info_container}>
            <span className={styles.suggestion_small_screen_title}>
              {suggestion.title_english ? suggestion.title_english : '-'}
            </span>
            <span className={styles.suggestion_small_screen_item_info_desc}>
              {suggestion.synopsis ? suggestion.synopsis : '-'}
            </span>
            <div className={styles.suggestion_small_screen_subinfo_container}>
              <span className={styles.suggestion_item_subinfo_item}>
                {suggestion.year ? suggestion.year : '-'}
              </span>

              <span className={styles.suggestion_small_screen_subinfo_item}>{`| ${
                suggestion.type ? suggestion.type : '-'
              } | `}</span>
              <span className={styles.suggestion_small_screen_subinfo_item}>{` ${
                suggestion.duration ? suggestion.duration : '-'
              }`}</span>
            </div>
          </div>
        </div>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};

export default HeaderSearchItem;
