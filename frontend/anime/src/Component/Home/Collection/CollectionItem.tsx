import './styles.scss';
type CollectionItemProps = {
  CollectionName: string;
};
const CollectionItem: React.FC<CollectionItemProps> = ({ CollectionName }) => {
  return (
    <div className="image-item">
      <div className="collection_title_container">
        <span className="collection_title">The Best</span>
        <span className="collection_title">{CollectionName}</span>
      </div>
      <div className="fan-container">
        <img
          src="https://cdn.myanimelist.net/images/anime/1522/128039l.jpg"
          alt="Image 1"
          className="fan-image"
          style={{ transform: 'rotate(350deg)', zIndex: 1 }}
        />
        <img
          src="https://cdn.myanimelist.net/images/anime/1286/99889l.jpg"
          alt="Image 2"
          className="fan-image"
          style={{ transform: 'rotate(-2deg)', zIndex: 2, marginLeft: '-40px' }}
        />
        <img
          src="https://cdn.myanimelist.net/images/anime/1498/134443.jpg"
          alt="Image 3"
          className="fan-image"
          style={{
            transform: 'rotate(17deg)',
            zIndex: 3,
            marginLeft: '-84px',
            marginTop: '-35px',
            marginBottom: '-100px',
          }}
        />
      </div>
    </div>
  );
};

export default CollectionItem;
