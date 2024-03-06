import { createApi, fetchBaseQuery, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { AnimeInfo } from '../../types/Home';
import { isString } from 'lodash';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getSliderAnimeAPi: build.query<any, void>({
      query: () => 'top/anime?filter=bypopularity&page=1&limit=12',
    }),
    getAnimeList: build.query<any, { limit?: number; currPage?: number }>({
      query: ({ limit = 10, currPage = 1 }) => ({
        url: 'top/anime',
        params: {
          filter: 'bypopularity',
          page: currPage,
          limit,
        },
      }),
    }),
    getAnimeGenresList: build.query<AnimeInfo[], { page: number; genresName: string }>({
      query: ({ page, genresName }) => ({
        url: 'top/anime',
        params: {
          filter: 'bypopularity',
          page: page * 2,
        },
      }),
      transformResponse: (
        response: any,
        meta: FetchBaseQueryMeta | undefined,
        arg: { page: number; genresName: string },
      ) => {
        console.log('RESPOMSE !@', response);

        const combinedAnime = [...response.data];
        console.log(arg.genresName, 'ZXC');

        // Дальнейшая обработка данных, например, фильтрация по жанру
        const filteredAnime = combinedAnime.filter((anime: AnimeInfo) => {
          return (
            !isString(anime.genres) &&
            anime.genres.some(
              (genre) => genre.name.toLocaleLowerCase() === arg.genresName.toLocaleLowerCase(),
            )
          );
        });
        console.log(filteredAnime, 'FROM 1');
        // Возвращаем результат
        return filteredAnime.slice(0, 20);
      },
    }),
    getAnimeGenresList2: build.query<AnimeInfo[], { page: number; genresName: string }>({
      query: ({ page, genresName }) => ({
        url: 'top/anime',
        params: {
          filter: 'bypopularity',
          page: page === 1 ? page * 2 + 1 : page * 2 - 1,
        },
      }),
      transformResponse: (
        response: any,
        meta: any | undefined,
        arg: { page: number; genresName: string },
      ) => {
        const combinedAnime = [...response.data];

        // Дальнейшая обработка данных, например, фильтрация по жанру
        const filteredAnime = combinedAnime.filter((anime: AnimeInfo) => {
          return (
            !isString(anime.genres) &&
            anime.genres.some(
              (genre) => genre.name.toLocaleLowerCase() === arg.genresName.toLocaleLowerCase(),
            )
          );
        });

        console.log(filteredAnime, 'FROM 2');

        return filteredAnime.slice(0, 20);
      },
    }),
    getAnimeSearchSeriaData: build.query<any, any>({
      query: ({ title, full_match }: { title: string; full_match: boolean }) => ({
        url: '/anime',
        params: {
          q: title,
          full_match,
          order_by: 'popularity',
        },
      }),
    }),
  }),
});

export const {
  useGetSliderAnimeAPiQuery,
  useGetAnimeListQuery,
  useGetAnimeGenresListQuery,
  useGetAnimeGenresList2Query,
  useGetAnimeSearchSeriaDataQuery,
} = animeApi;
