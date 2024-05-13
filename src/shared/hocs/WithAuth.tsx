import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { pathConfig } from '@/shared/config';
import { connector } from '@/components';

export function WithAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = connector.onStatusChange((wallet) => {
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
  }, [navigate, location]);

  const isAuth = !!connector.wallet;

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
