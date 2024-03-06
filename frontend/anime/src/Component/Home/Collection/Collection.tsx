import { useNavigate } from 'react-router-dom';

import CollectionItem from './CollectionItem';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { AnimeInfo } from '../../../types/Home';
import { useMediaQuery } from 'react-responsive';

const Collection: React.FC = ({}) => {
  const isPhoneScreen = useMediaQuery({ query: '(min-width: 541px)' });
  const genres = isPhoneScreen ? ['Adventure', 'Comedy', 'Drama'] : ['Adventure', 'Comedy'];
  const AnimeItemsList = useAppSelector((state) => state.getAnime.animeList);

  const hasDataLoaded = localStorage.getItem('CollectionList0000');
  const storedSliderImages = hasDataLoaded ? JSON.parse(hasDataLoaded) : '';
  const sliderAnime = useAppSelector((state) => state.getAnime.animeSlider);
  const navigate = useNavigate();
  const handleGenresSelect = async (genresName: string) => {
    navigate(`/Genres/results/${genresName}`);
  };
  console.log(sliderAnime, 'SKIDERANINEs');

  async function getGenresImage(genresName: string) {
    if (storedSliderImages.length !== 0) {
      const AdventuresImage = storedSliderImages.slice(0, 3).map((el: AnimeInfo) => {
        return el.images.jpg.image_url;
      });
      const DramaImages = storedSliderImages.slice(4, 7).map((el: AnimeInfo) => {
        return el.images.jpg.image_url;
      });
      const ComedyImage = storedSliderImages.slice(8, 11).map((el: AnimeInfo) => {
        return el.images.jpg.image_url;
      });
      return genresName === 'Adventure'
        ? AdventuresImage
        : genresName === 'Drama'
        ? DramaImages
        : ComedyImage;
    }
    if (storedSliderImages.length === 0) {
      const AdventuresImage = sliderAnime.slice(0, 3).map((el: AnimeInfo) => {
        return el.images.jpg.image_url;
      });
      const DramaImages = sliderAnime.slice(4, 7).map((el: AnimeInfo) => {
        return el.images.jpg.image_url;
      });
      const ComedyImage = sliderAnime.slice(8, 11).map((el: AnimeInfo) => {
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
        {(storedSliderImages && storedSliderImages.length > 1) || sliderAnime.length > 1 ? (
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
          <h1 style={{ color: 'red' }}>ERROR Reload the page</h1>
        )}
      </div>
    </div>
  );
};
export default Collection;
