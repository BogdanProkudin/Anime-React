import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { auth } from './slices/Auth';
import { getAnime } from './slices/Anime';
import { animeApi } from './slices/AnimeApi';
export const store = configureStore({
  reducer: { auth, getAnime, [animeApi.reducerPath]: animeApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
