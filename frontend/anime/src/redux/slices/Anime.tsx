import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
type getAnimeThunkProps = {
  limit: number | undefined;
  currPage: number | undefined;
};
interface AnimeSearchParams {
  token?: string;
  title: string | undefined;
  full_match?: boolean;
  limit?: number | string;
  title_orig?: string | undefined;
}
const initialState = {
  animeStatus: '',
  animeSlider: [],
  animeEpisode: {},
  animeSearched: [],
  animeList: [],
  animeSearchInput: '',
};
export const getAnimeSliderThunk = createAsyncThunk(
  'getAnime/getAnimeDataSlider',
  async function () {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=bypopularity', {
        params: {
          page: 1,
          limit: 9,
        },
      });

      return response.data.data;
    } catch (err) {
      console.log('ERROR WHEN FERCHING AnimeData :', err);
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
      console.log('ERROR WHEN FERCHING AnimeData :', err);
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
        },
      });

      return response.data.data;
    } catch (err) {
      console.log('ERROR WHEN FERCHING AnimeData :', err);
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
      console.log('ERROR WHEN FERCHING AnimeData :', err);
    }
  },
);
export const getAnimeListThunk = createAsyncThunk(
  'getAnime/getAnimeDataList',
  async function ({ limit, currPage }: getAnimeThunkProps) {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=bypopularity', {
        params: {
          page: currPage,
          limit: limit,
        },
      });

      return response.data.data;
    } catch (err) {
      console.log('ERROR WHEN FERCHING AnimeData :', err);
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
  extraReducers: {
    ['getAnime/getAnimeDataList/pending']: (state) => {
      console.log('loading');
      state.animeStatus = 'loading';
    },
    ['getAnime/getAnimeDataList/fulfilled']: (state, action) => {
      state.animeList = action.payload;
      state.animeStatus = 'finished';
    },
    ['getAnime/getAnimeDataList/rejected']: (state, action) => {
      state.animeStatus = 'Error';
    },

    ['getAnime/getAnimeDataSlider/fulfilled']: (state, action) => {
      state.animeSlider = action.payload
        ? action.payload
        : [...new Array(10)].slice(0, 9).map((anime: any) => {
            return anime;
          });
    },
    ['getAnime/getAnimeSeriaData/pending']: (state, action) => {
      state.animeStatus = 'pending';
    },
    ['getAnime/getAnimeSeriaData/fulfilled']: (state, action) => {
      state.animeEpisode = action.payload;
      state.animeStatus = 'finished';
    },
    ['getAnime/getAnime/getAnimeSearchSeriaData/fulfilled']: (state, action) => {
      state.animeEpisode = action.payload;
      state.animeStatus = 'finished';
    },
  },
});
export const { setAnimeSearchInput } = AnimeSlice.actions;
export const getAnime = AnimeSlice.reducer;
