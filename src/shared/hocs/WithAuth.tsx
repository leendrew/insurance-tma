import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTonConnectSdkContext } from '@/components';
import { pathConfig } from '@/shared/config';

export function WithAuth() {
  const location = useLocation();
  const { tonConnect } = useTonConnectSdkContext();

  const isAuth = !!tonConnect.wallet;

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
