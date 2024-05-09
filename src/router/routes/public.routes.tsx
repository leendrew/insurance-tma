import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/shared/ui';
import { LoginPage } from '@/pages';
import { pathConfig } from '@/shared/config';

export const publicRoutes = {
  index: false,
  element: <MainLayout />,
  children: [
    {
      path: pathConfig.login.path,
      element: <LoginPage />,
    },
  ],
} satisfies RouteObject;
