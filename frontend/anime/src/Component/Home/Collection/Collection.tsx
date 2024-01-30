import { useNavigate } from 'react-router-dom';
import { getAnimeGenresListThunk } from '../../../redux/slices/Anime';
import CollectionItem from './CollectionItem';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { AnimeInfo } from '../../../types/Home';

const Collection: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const genres = ['Adventure', 'Comedy', 'Drama'];
  const AnimeItemsList = useAppSelector((state) => state.getAnime.animeList);
  const hasDataLoaded = localStorage.getItem('hasDataLoadedz');
  const storedSliderData = hasDataLoaded !== null ? JSON.parse(hasDataLoaded) : [];
  const navigate = useNavigate();
  const handleGenresSelect = async (genresName: string) => {
    navigate(`/Genres/results/${genresName}`);
  };

  function getGenresImage(genresName: string) {
    if (storedSliderData) {
      const AdventuresImage = storedSliderData.slice(0, 3).map((el: AnimeInfo) => {
        return el.images.jpg.image_url;
      });
      const DramaImages = storedSliderData.slice(4, 7).map((el: AnimeInfo) => {
        return el.images.jpg.image_url;
      });
      const ComedyImage = storedSliderData.slice(8, 11).map((el: AnimeInfo) => {
        return el.images.jpg.image_url;
      });
      return genresName === 'Adventure'
        ? AdventuresImage
        : genresName === 'Drama'
        ? DramaImages
        : ComedyImage;
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '4rem',
      }}
    >
      <h1 style={{ color: 'white', fontSize: '25px' }}>Featured Collection</h1>

      <div className="image-collection">
        {storedSliderData && storedSliderData.length > 1 ? (
          genres.map((genresName: string, index) => {
            return (
              <div
                key={index}
                onClick={() => handleGenresSelect(genresName)}
                className="image-item"
              >
                <CollectionItem images={getGenresImage(genresName)} CollectionName={genresName} />
              </div>
            );
          })
        ) : (
          <h1
            style={{
              color: 'red',
              fontSize: '20px',
              marginLeft: '20rem',
              width: '440px',
            }}
          >
            Slow Down. Now you can reload the Page
          </h1>
        )}
      </div>
    </div>
  );
};
export default Collection;
