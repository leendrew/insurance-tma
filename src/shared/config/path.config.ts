import { route } from 'react-router-typesafe-routes/dom';

// for github-pages
export const ROUTE_BASE_PREFIX = 'insurance-tma';

export const pathConfig = {
  home: route(`${ROUTE_BASE_PREFIX}`),
  login: route(`${ROUTE_BASE_PREFIX}/login`),
  // dynamic: route(`${ROUTE_BASE_PREFIX}/dynamic/:id`, {
  //   params: {
  //     id: number().defined(),
  //   },
  // }),
  // query: route(`${ROUTE_BASE_PREFIX}/query`, {
  //   searchParams: {
  //     count: number(),
  //   },
  // }),
};
