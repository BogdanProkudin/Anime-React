import axios from 'axios';
import styles from './styles.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../redux/hook';
import AnimeVideoSkeleton from './Skeletons/AnimeVideoSkeleton';
import YouTube from 'react-youtube';
type EpisodeVideoProps = {
  animeLink?: string;
};
const EpisodeVideo: React.FC<EpisodeVideoProps> = (animeLink) => {
  const kodikPlayerRef = useRef<any>(null);
  const animeLinkStatus = useAppSelector((state) => state.getAnime.animeLinkStatus);
  const AnimeInfo = useAppSelector((state) => state.getAnime.animeEpisode);
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
      {animeLink.animeLink ? (
        <iframe
          ref={kodikPlayerRef.current && kodikPlayerRef}
          id="kodik-player"
          style={{ marginBottom: '4rem' }}
          className={styles.anime_video_screen}
          src={
            'https://www.youtube.com/embed/' +
            animeLink.animeLink +
            '?showinfo=0&enablejsapi=1&origin=http://localhost:9000'
          }
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <AnimeVideoSkeleton />
      )}
    </div>
  );
};

export default EpisodeVideo;
