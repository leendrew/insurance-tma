import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTonConnectSdkContext } from '@/components';
import { pathConfig } from '@/shared/config';

export function WithAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tonConnect } = useTonConnectSdkContext();

  useEffect(() => {
    const unsubscribe = tonConnect.onStatusChange((wallet) => {
      console.log('@ wallet status changed (from with auth)', wallet);
      if (!wallet) {
        // user disconnect wallet
        navigate(pathConfig.login.path);
        toast.success('Wallet Disconnected');

        return;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate, tonConnect]);

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
