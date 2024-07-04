import type { RouteObject } from 'react-router-dom';
import { AuthLayout } from '@/shared/ui';
import { LoginPage } from '@/pages';
import { pathConfig } from '@/shared/config';

export const publicRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: pathConfig.login.path,
      element: <LoginPage />,
    },
  ],
} satisfies RouteObject;
