import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  animePoster: [],
  animeTitle: [],
  animeGenres: [],
  animeYear: [],
};
export const getAnimeThunk = createAsyncThunk('getAnime/getAnimeData', async function () {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=bypopularity', {
      params: {
        page: 1,
        limit: 25,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log('ERROR WHEN FERCHING AnimeData :', err);
  }
});
const AnimeSlice = createSlice({
  name: 'Anime',
  initialState,
  reducers: {},
  extraReducers: {
    ['getAnime/getAnimeData/pending']: (state) => {},
    ['getAnime/getAnimeData/fulfilled']: (state, action) => {
      state.animePoster = action.payload.slice(0, 9).map((imagePoster: any) => {
        return imagePoster.images.jpg.image_url;
      });
      state.animeTitle = action.payload.slice(0, 9).map((animeTitle: any) => {
        return animeTitle.title_english;
      });
      state.animeYear = action.payload.slice(0, 9).map((animeYear: any) => {
        return animeYear.year;
      });
      state.animeGenres = action.payload.slice(0, 9).flatMap((subArray: any) => {
        return subArray.genres.length > 0 ? [subArray.genres[1]] : [];
      });
    },
    ['getAnime/getAnimeData/rejected']: (state, action) => {},
  },
});

export const getAnime = AnimeSlice.reducer;
