import AnimeItem from './AnimeItem';

const AnimeList = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          position: 'relative',
          zIndex: '3',
          bottom: '12rem',
          width: '100rem',
        }}
      >
        <h1>Special For you</h1>
        <div style={{ display: 'flex' }}>
          {[...new Array(6)].map((animeMovie) => {
            return <AnimeItem />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AnimeList;
