import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { pathConfig } from '@/shared/config';
import { useTonConnectSdkContext } from '@/components';

export function WithAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tonConnect } = useTonConnectSdkContext();

  useEffect(() => {
    const unsubscribe = tonConnect.onStatusChange((wallet) => {
      if (!wallet) {
        // user disconnect wallet
        navigate(pathConfig.login.path, {
          replace: true,
          state: {
            from: location,
          },
        });
        return;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate, location, tonConnect]);

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
