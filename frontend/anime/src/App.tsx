import { Navigate, useRoutes } from 'react-router-dom';
import SignInPage from './Component/SignIn/SignIn';
import SignUpPage from './Component/SignUp/SignUp';
import HomePage from './Component/Home/Home';

function App() {
  const token = localStorage.getItem('token');
  console.log(token);

  const routes = [
    { path: '/Registration', element: <SignUpPage /> },
    { path: '/LogIn', element: token ? <Navigate to="/Home" /> : <SignInPage /> },
    {
      path: '/Home',
      element: token ? <HomePage /> : <Navigate to="/LogIn" />,
    },
  ];
  const routing = useRoutes(routes);
  return <div className="App">{routing}</div>;
}

export default App;
