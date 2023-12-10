import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
type getAnimeThunkProps = {
  limit: number | undefined;
  currPage: number | undefined;
};
const initialState = {
  animeStatus: '',
  animeSlider: [],
  animeList: [],
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
      console.log(response.data.data);

      return response.data.data;
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
      console.log(response.data.data);

      return response.data.data;
    } catch (err) {
      console.log('ERROR WHEN FERCHING AnimeData :', err);
    }
  },
);
const AnimeSlice = createSlice({
  name: 'Anime',
  initialState,
  reducers: {},
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
  },
});

export const getAnime = AnimeSlice.reducer;
