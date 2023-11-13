import axios from 'axios';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime', {
          params: {
            page: 5,
            limit: 25,
          },
        });
        console.log(response.data.data);

        setAnimeList(response.data.data || []);
      } catch (error) {
        console.error('Error fetching anime list:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {' '}
      <h1>Anime List123</h1>
      <ul>
        {animeList.map((anime: any) => (
          <li>{anime.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
