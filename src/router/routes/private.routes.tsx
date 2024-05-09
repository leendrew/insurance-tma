import type { RouteObject } from 'react-router-dom';
import { WithAuth } from '@/shared/hocs';
import { MainLayout } from '@/shared/ui';
import { HomePage } from '@/pages';
import { pathConfig } from '@/shared/config';

export const privateRoutes = {
  index: false,
  element: <WithAuth />,
  children: [
    {
      index: false,
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: pathConfig.home.path,
          element: <HomePage />,
        },
      ],
    },
  ],
} satisfies RouteObject;
