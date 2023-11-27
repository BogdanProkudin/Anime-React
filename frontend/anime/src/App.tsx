import { Navigate, useRoutes } from 'react-router-dom';
import SignInPage from './Component/SignIn/SignIn';
import SignUpPage from './Component/SignUp/SignUp';
import HomePage from './Component/Home/Home';
import YourComponent from './Component/Video/Video';
// import VideoPlayer from './Component/Home/VideoPayer';

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
    { path: '/Video', element: <YourComponent /> },
  ];
  const routing = useRoutes(routes);
  return <div className="App">{routing}</div>;
}

export default App;
