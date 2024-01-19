import React from 'react';
import { useAppSelector } from '../../../../redux/hook';
import styles from './styles.module.scss';
import AnimeInfoSkeleton from '../../Skeletons/AnimeInfoSkeleton';
import { AnimeInfo } from '../../../../types/Home';
const AnimeEpisodeDetails = () => {
  const AnimeInfo: AnimeInfo = useAppSelector((state) => state.getAnime.animeEpisode);

  const animeStatus = useAppSelector((state) => state.getAnime.animeStatus);
  const AnimeDetails = [
    { title: 'Type', prop: AnimeInfo ? AnimeInfo.type : 'Unknown from Api' },
    { title: 'Episode', prop: AnimeInfo ? AnimeInfo.episodes : 'Unknown from Api' },
    {
      title: 'Genres',
      prop:
        animeStatus === 'finished' && AnimeInfo && Array.isArray(AnimeInfo.genres)
          ? AnimeInfo.genres.map((el) => {
              return el.name;
            })
          : 'Unknown',
    },
    { title: 'Season', prop: AnimeInfo ? AnimeInfo.season : 'Unknown from Api' },
    {
      title: 'Studios',
      prop:
        animeStatus === 'finished' &&
        AnimeInfo &&
        Array.isArray(AnimeInfo.studios) &&
        AnimeInfo.studios[0]
          ? AnimeInfo.studios[0].name
          : 'unknown',
    },
    { title: 'Source', prop: AnimeInfo ? AnimeInfo.source : 'Unknown from Api' },
    { title: 'Duration', prop: AnimeInfo ? AnimeInfo.duration : 'Unknown from Api' },
  ];

  return (
    <div className={styles.anime_info_details_container}>
      {animeStatus !== 'pending' && AnimeInfo && (
        <h1 className={styles.anime_info_details_title}>Details</h1>
      )}
      {AnimeDetails.map((section: any, index: number) => {
        return (
          <div key={index}>
            {animeStatus !== 'finished' || !AnimeInfo ? (
              <div key={section.title} style={{ display: 'flex', flexDirection: 'column' }}>
                {[...new Array(1)].map((_, index) => {
                  return (
                    <div key={index}>
                      <AnimeInfoSkeleton />
                    </div>
                  );
                })}
              </div>
            ) : (
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
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnimeEpisodeDetails;
