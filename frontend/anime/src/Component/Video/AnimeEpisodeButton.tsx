import React from 'react';
import styles from './styles.module.scss';

type AnimeEpisodeButtonProps = {
  width?: string;
  icon?: string;
  text: string;
};
const AnimeEpisodeButton: React.FC<AnimeEpisodeButtonProps> = ({ text, icon, width }) => {
  return (
    <button style={{ width: width || '' }} className={styles.anime_episode_button}>
      {icon}
      <span className={styles.anime_episode_button_text}>{text}</span>
    </button>
  );
};

export default AnimeEpisodeButton;
