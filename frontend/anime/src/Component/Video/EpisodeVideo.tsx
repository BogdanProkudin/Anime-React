import axios from 'axios';
import styles from './styles.module.scss';
import React, { useEffect, useRef, useState } from 'react';
type EpisodeVideoProps = {
  animeLink?: string;
};
const EpisodeVideo: React.FC<EpisodeVideoProps> = (animeLink) => {
  const kodikPlayerRef = useRef<any>(null);
  useEffect(() => {
    const kodikIframe = kodikPlayerRef.current ? kodikPlayerRef.current.contentWindow : null;
    {
      kodikIframe &&
        kodikIframe.postMessage(
          { key: 'kodik_player_api', value: { method: 'seek', seconds: 67 } },
          '*',
        );
    }
  }, []);

  return (
    <div className={styles.anime_video_container}>
      {!animeLink.animeLink?.includes('youtube') ? (
        <iframe
          ref={kodikPlayerRef.current && kodikPlayerRef}
          id="kodik-player"
          className={styles.anime_video_screen}
          src={`${animeLink.animeLink}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <iframe
          width="610"
          height="370"
          src={`${animeLink.animeLink}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
    </div>
  );
};

export default EpisodeVideo;
