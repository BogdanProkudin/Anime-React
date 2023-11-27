import { configureStore } from '@reduxjs/toolkit';
import { auth } from './slices/Auth';
import { getAnime } from './slices/Anime';
export const store = configureStore({
  reducer: { auth, getAnime },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
