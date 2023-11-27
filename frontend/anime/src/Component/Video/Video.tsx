import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const YourComponent = () => {
  const kodikPlayerRef = useRef<any>(null);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/data'); // Данный URL соответствует настройкам вашего сервера
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  useEffect(() => {
    const kodikIframe = kodikPlayerRef.current.contentWindow;

    // Выполнение кода после монтирования компонента
    kodikIframe.postMessage(
      { key: 'kodik_player_api', value: { method: 'seek', seconds: 67 } },
      '*',
    );
  }, []);

  return (
    <iframe
      ref={kodikPlayerRef}
      id="kodik-player"
      src="https://aniqit.com/serial/55598/729c2cb37878fa5ac73ce68c8210ab8e/720p"
      width="610"
      height="370"
      frameBorder="0"
      allowFullScreen
      allow="autoplay *; fullscreen *"
    ></iframe>
  );
};

export default YourComponent;
