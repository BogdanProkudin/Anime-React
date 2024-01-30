import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AnimeInfo } from '../../types/Home';
import { isString } from 'lodash';

type AnimeSearchParams = {
  token?: string;
  title: string | undefined;
  full_match?: boolean;
  limit?: number | string;
  title_orig?: string | undefined;
};

type AnimeGenresProps = {
  name: string;
};

type AnimeTypes = {
  ToWatch: {
    AnimePoster: string | null;
    AnimeTitle: string | undefined;
    AnimeGenres: AnimeGenresProps | string;
    AnimeYear: number | string;
  };
  CurrentUser: string;
};

type initialStateProps = {
  animeStatus: string;
  animeLinkStatus: string;
  animeSlider: AnimeInfo[];
  animeEpisode: AnimeInfo;
  animeSearched: AnimeInfo[];
  animeList: AnimeInfo[];
  animeGenresList: AnimeInfo[] | undefined;
  animeSearchInput: string;
  animeSliderStatus: string;
};

const initialState: initialStateProps = {
  animeStatus: '',
  animeSliderStatus: '',
  animeLinkStatus: '',
  animeSlider: [],

  animeEpisode: {
    airing: false,
    approved: false,
    background: null,
    broadcast: {
      day: '',
      time: '',
      timezone: '',
    },
    demographics: [],
    duration: '',
    episodes: 0,
    explicit_genres: [],
    favorites: 0,
    genres: [],
    images: {
      jpg: {
        image_url: '',
        small_image_url: '',
        large_image_url: '',
      },
      webp: {
        image_url: '',
        small_image_url: '',
        large_image_url: '',
      },
    },
    licensors: [],
    mal_id: 0,
    members: 0,
    popularity: 0,
    producers: [],
    rank: 0,
    rating: '',
    score: 0,
    scored_by: 0,
    season: '',
    source: '',
    status: '',
    studios: [],
    synopsis: '',
    themes: [],
    title: '',
    title_english: '',
    title_japanese: '',
    title_synonyms: [],
    titles: [],
    trailer: {
      youtube_id: '',
      url: '',
      embed_url: '',
      images: {
        image_url: '',
        small_image_url: '',
        large_image_url: '',
      },
    },
    type: '',
    url: '',
    year: 0,
  },
  animeSearched: [],
  animeList: [],
  animeGenresList: [],
  animeSearchInput: '',
};

export const getAnimeSliderThunk = createAsyncThunk(
  'getAnime/getAnimeDataSlider',
  async function () {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=bypopularity', {
        params: {
          page: 1,
          limit: 12,
        },
      });

      return response.data.data;
    } catch (err) {
      console.log('ERROR WHEN FETCHING AnimeData :', err);
    }
  },
);

export const getAnimeSeriaThunk = createAsyncThunk(
  'getAnime/getAnimeSeriaData',
  async function ({ title, limit }: AnimeSearchParams) {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${title}`);

      return limit === 'none' ? response.data.data : response.data.data[0];
    } catch (err) {
      console.log('ERROR WHEN FETCHING AnimeData :', err);
    }
  },
);

export const getAnimeSearchSeriaThunk = createAsyncThunk(
  'getAnime/getAnimeSearchSeriaData',
  async function ({ title, full_match }: AnimeSearchParams) {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${title}`, {
        params: {
          full_match,
          order_by: 'popularity',
        },
      });

      return response.data.data;
    } catch (err) {
      console.log('ERROR WHEN FETCHING AnimeData :', err);
    }
  },
);

export const getAnimeSeriaLinkThunk = createAsyncThunk(
  'getAnime/getAnimeSeriaLinkData',
  async function ({ title, token, full_match, limit }: AnimeSearchParams) {
    try {
      const response = await axios.get(`https://kodikapi.com/search`, {
        params: { token, title, limit, full_match },
      });

      if (response.data.results.length === 0) {
        const response2 = await axios.get(`https://kodikapi.com/search`, {
          params: { token, title, limit, types: 'anime-serial' },
        });
        return response2.data.results;
      } else {
        return response.data.results;
      }
    } catch (err) {
      console.log('ERROR WHEN FETCHING AnimeData :', err);
    }
  },
);

export const sendAnimeToWatch = createAsyncThunk(
  'sendAnimeToWatch',
  async function (AnimeData: AnimeTypes) {
    try {
      console.log(AnimeData);

      const response = await axios.post('http://localhost:3003/AddToWatch', AnimeData);
      console.log(response, 'QQ');
    } catch (err) {
      console.log('ERROR WHEN sending AnimeData to Watch :', err);
    }
  },
);

export const getAnimeListThunk = createAsyncThunk(
  'getAnime/getAnimeDataList',
  async function ({
    limit,
    currPage,
  }: {
    limit: number | undefined;
    currPage: number | undefined;
  }) {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=bypopularity', {
        params: {
          page: currPage,
          limit: limit,
        },
      });

      return response.data.data;
    } catch (err) {
      console.log('ERROR WHEN FETCHING AnimeData :', err);
    }
  },
);
export const getAnimeGenresListThunk = createAsyncThunk(
  'getAnime/getAnimeGenresDataList',
  async function ({ page, genresName }: { page: number; genresName: string }) {
    try {
      // Получаем данные с двух страниц
      const responsePage1 = await axios.get('https://api.jikan.moe/v4/top/anime', {
        params: {
          filter: 'bypopularity',
          page: page * 2,
        },
      });

      const responsePage2 = await axios.get('https://api.jikan.moe/v4/top/anime', {
        params: {
          filter: 'bypopularity',
          page: page === 1 ? page * 2 + 1 : page * 2 - 1,
        },
      });
      console.log(page, 'PAGE');

      const combinedAnime = [...responsePage1.data.data, ...responsePage2.data.data];

      const adventureAnime = combinedAnime.filter((anime: AnimeInfo) => {
        return (
          !isString(anime.genres) &&
          anime.genres.some(
            (genre) => genre.name.toLocaleLowerCase() === genresName.toLocaleLowerCase(),
          )
        );
      });

      // Ограничиваем количество результатов до 20
      if (adventureAnime.length > 0) {
        return adventureAnime;
      }
    } catch (err) {
      console.log('ERROR WHEN FETCHING AnimeData :', err);
    }
  },
);

const AnimeSlice = createSlice({
  name: 'Anime',
  initialState,
  reducers: {
    setAnimeSearchInput: (state, action) => {
      state.animeSearchInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimeListThunk.pending, (state) => {
        console.log('loading');
        state.animeStatus = 'loading';
      })
      .addCase(getAnimeListThunk.fulfilled, (state, action) => {
        state.animeList = action.payload;
        state.animeStatus = 'finished';
      })
      .addCase(getAnimeListThunk.rejected, (state, action) => {
        state.animeStatus = 'Error';
      });

    builder
      .addCase(getAnimeSliderThunk.pending, (state, action) => {
        state.animeSliderStatus = 'pending';
      })
      .addCase(getAnimeSliderThunk.fulfilled, (state, action) => {
        console.log(action.payload, 'PAYLOAD!@#');

        state.animeSlider = action.payload
          ? action.payload
          : [...new Array(10)].slice(0, 9).map((anime: any) => {
              return anime;
            });

        state.animeSliderStatus = 'finished';
      })
      .addCase(getAnimeSliderThunk.rejected, (state, action) => {
        state.animeSliderStatus = 'Error';
        console.log('HERE ERROR !@#$%');
      });

    builder
      .addCase(getAnimeSeriaThunk.pending, (state, action) => {
        state.animeStatus = 'pending';
        console.log('pending');
      })
      .addCase(getAnimeSeriaThunk.rejected, (state, action) => {
        state.animeStatus = 'Error';
      })
      .addCase(getAnimeSeriaThunk.fulfilled, (state, action) => {
        state.animeEpisode = action.payload;
        state.animeStatus = 'finished';
      });

    builder.addCase(getAnimeSearchSeriaThunk.fulfilled, (state, action) => {
      state.animeEpisode = action.payload;
      state.animeStatus = 'finished';
    });

    builder
      .addCase(getAnimeGenresListThunk.pending, (state, action) => {
        state.animeGenresList = [];
      })
      .addCase(getAnimeGenresListThunk.fulfilled, (state, action) => {
        state.animeGenresList = action.payload;
      })
      .addCase(getAnimeGenresListThunk.rejected, (state, action) => {
        state.animeGenresList = [];
      });
    // ... Другие case-блоки для thunk-функций ...
  },
});

export const { setAnimeSearchInput } = AnimeSlice.actions;
export const getAnime = AnimeSlice.reducer;
