import { Anime } from './HeaderInput';
import styles from './styles.module.scss';
interface HeaderSearchItemProps {
  suggestion: any;
}
const HeaderSearchItem: React.FC<HeaderSearchItemProps> = ({ suggestion }) => {
  return (
    <div className={styles.suggestion_item}>
      <img
        src={suggestion.images.jpg.small_image_url}
        alt={suggestion.title}
        className={styles.suggestion_image}
      />
      <div className={styles.suggestion_item_info_container}>
        <span>{suggestion.title ? suggestion.title : '-'}</span>
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
  );
};

export default HeaderSearchItem;
