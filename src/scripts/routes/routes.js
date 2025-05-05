import HomePage from '../pages/home/home-page';
import AddPage from '../pages/add/add-page';
import LoginPage from '../pages/login/login-page';
import RegisterPage from '../pages/register/register-page';

const routes = {
  '/': LoginPage, // root diarahkan ke login
  '/register': RegisterPage,
  '/home': HomePage,
  '/add': AddPage,
};

export default routes;
