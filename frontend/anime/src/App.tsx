import { Navigate, useRoutes } from 'react-router-dom';
import SignInPage from './Component/SignIn/SignIn';
import SignUpPage from './Component/SignUp/SignUp';
import HomePage from './Component/Home/Home';
import EpisodeVideo from './Component/Video/EpisodeVideo';
import AnimeEpisode from './Component/Video/AnimeEpisode';

function App() {
  const token = localStorage.getItem('token');
  console.log(token);

  const routes = [
    { path: '/Registration', element: <SignUpPage /> },
    { path: '/LogIn', element: token ? <Navigate to="/Home" /> : <SignInPage /> },
    {
      path: '/Home',
      element: <HomePage />,
    },
    { path: '/Video/:AnimeTitle', element: <AnimeEpisode /> },
  ];
  const routing = useRoutes(routes);
  return <div className="App">{routing}</div>;
}

export default App;
