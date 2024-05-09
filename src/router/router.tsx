import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';

const routes = [publicRoutes, privateRoutes];

export const router = createBrowserRouter(routes);
