import axios from 'axios';
import styles from './styles.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../redux/hook';
import AnimeVideoSkeleton from './Skeletons/AnimeVideoSkeleton';
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
      {animeLinkStatus !== 'pending' && AnimeInfo && !animeLink.animeLink?.includes('youtube') ? (
        <iframe
          ref={kodikPlayerRef.current && kodikPlayerRef}
          id="kodik-player"
          style={{ marginBottom: '4rem' }}
          className={styles.anime_video_screen}
          src={`${animeLink.animeLink}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : animeLinkStatus !== 'pending' && AnimeInfo ? (
        <iframe
          width="610"
          height="370"
          style={{ marginBottom: '4rem' }}
          src={`${animeLink.animeLink}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : (
        <AnimeVideoSkeleton />
      )}
    </div>
  );
};

export default EpisodeVideo;
