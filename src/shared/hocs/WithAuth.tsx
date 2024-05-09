import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { pathConfig } from '@/shared/config';

export function WithAuth() {
  const location = useLocation();

  const isAuth = false;

  if (!isAuth) {
    return (
      <Navigate
        to={pathConfig.login.path}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
