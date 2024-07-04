import type { RouteObject } from 'react-router-dom';
import { WithAuth } from '@/shared/hocs';
import { MainLayout } from '@/shared/ui';
import { HomePage } from '@/pages';
import { pathConfig } from '@/shared/config';

export const privateRoutes = {
  element: <WithAuth />,
  children: [
    {
      element: <MainLayout />,
      children: [
        {
          path: pathConfig.home.path,
          element: <HomePage />,
        },
      ],
    },
  ],
} satisfies RouteObject;
