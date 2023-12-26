import React from 'react';
import { useAppSelector } from '../../../../redux/hook';
import styles from './styles.module.scss';
const AnimeEpisodeDetails = () => {
  const AnimeInfo = useAppSelector((state) => state.getAnime.animeEpisode) as AnimeInfo;

  const AnimeDetails = [
    { title: 'Type', prop: AnimeInfo.type ? AnimeInfo.type : 'Unknown from Api' },
    { title: 'Episode', prop: AnimeInfo.episodes ? AnimeInfo.episodes : 'Unknown from Api' },
    {
      title: 'Genres',
      prop: Array.isArray(AnimeInfo.genres)
        ? AnimeInfo.genres.map((el) => {
            return el.name;
          })
        : AnimeInfo.genres,
    },
    { title: 'Season', prop: AnimeInfo.season ? AnimeInfo.season : 'Unknown from Api' },
    {
      title: 'Studios',
      prop: Array.isArray(AnimeInfo.studios) ? AnimeInfo.studios[0].name : AnimeInfo.studios,
    },
    { title: 'Source', prop: AnimeInfo.source ? AnimeInfo.source : 'Unknown from Api' },
    { title: 'Duration', prop: AnimeInfo.duration ? AnimeInfo.duration : 'Unknown from Api' },
  ];

  return (
    <div className={styles.anime_info_details_container}>
      <h1 className={styles.anime_info_details_title}>Details</h1>
      {AnimeDetails.map((section: any) => {
        return (
          <div key={section.title} style={{ display: 'flex' }}>
            <span className={styles.anime_info_details_item}>{section.title}</span>
            {Array.isArray(section.prop) ? (
              <span className={styles.anime_episode_info_text}>
                {section.prop.map((el: string, index: number) => (
                  <React.Fragment key={index}>
                    {index > 0 && ', '}
                    {el}
                  </React.Fragment>
                ))}
              </span>
            ) : (
              <span className={styles.anime_episode_info_text}>{section.prop}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnimeEpisodeDetails;
