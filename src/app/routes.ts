import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Details } from './pages/Details';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/establecimiento/:id',
    Component: Details,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
