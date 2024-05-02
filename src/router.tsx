import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/shared/ui';
import { HomePage, FooPage } from '@/pages';
import { PATH } from '@/shared/constants';

const routes = [
  {
    index: false,
    element: <MainLayout />,
    children: [
      {
        path: PATH.home,
        element: <HomePage />,
      },
      {
        path: PATH.foo,
        element: <FooPage />,
      },
    ],
  },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes);
