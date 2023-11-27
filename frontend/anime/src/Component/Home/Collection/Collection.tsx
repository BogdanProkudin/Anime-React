import CollectionItem from './CollectionItem';
import './styles.scss';

const Collection: React.FC = ({}) => {
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
        <CollectionItem CollectionName={'Mystical Anime'} />
        <CollectionItem CollectionName=" Mystical Anime" />
        <CollectionItem CollectionName=" Mystical Anime" />
      </div>
    </div>
  );
};
export default Collection;
