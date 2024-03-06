import { Navigate, useRoutes } from 'react-router-dom';
import SignInPage from './Component/SignIn/SignIn';
import SignUpPage from './Component/SignUp/SignUp';
import HomePage from './Component/Home/Home';
import EpisodeVideo from './Component/Video/EpisodeVideo';
import AnimeEpisode from './Component/Video/AnimeEpisode';
import ProfileSetting from './Component/ProfileSettings/ProfileSetting';
import AnimeSearchList from './Component/AnimeSearchList/AnimeSearchList';
import AnimeGenresList from './Component/AnimeGenresList/AnimeGenresList';
import { StrictMode } from 'react';
import React from 'react';

function App() {
  const token = localStorage.getItem('token');
  console.log(token);

  const routes = [
    { path: '/Registration', element: token ? <Navigate to="/Home" /> : <SignUpPage /> },
    { path: '/LogIn', element: <SignInPage /> },
    { path: '/Settings/:Info', element: <ProfileSetting /> },

    {
      path: '/Home',
      element: <HomePage />,
    },
    { path: '/Video/:AnimeTitle', element: <AnimeEpisode /> },
    { path: '/Search/results/:AnimeTitle', element: <AnimeSearchList /> },
    { path: '/Genres/results/:AnimeGenres', element: <AnimeGenresList /> },
  ];
  const routing = useRoutes(routes);
  return <div className="App">{routing}</div>;
}

export default App;
