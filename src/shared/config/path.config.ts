import { route } from 'react-router-typesafe-routes/dom';

export const pathConfig = {
  home: route(''),
  login: route('login'),
  // dynamic: route('dynamic/:id', {
  //   params: {
  //     id: number().defined(),
  //   },
  // }),
  // query: route('query', {
  //   searchParams: {
  //     count: number(),
  //   },
  // }),
};
