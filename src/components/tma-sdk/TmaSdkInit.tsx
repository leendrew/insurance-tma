import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { setDebug } from '@tma.js/sdk';
import { useLaunchParams, useMiniApp } from '@tma.js/sdk-react';

interface TmaSdkInitProps {}

export function TmaSdkInit({ children }: PropsWithChildren<TmaSdkInitProps>) {
  const miniApp = useMiniApp();
  const launchParams = useLaunchParams();

  useEffect(() => {
    miniApp.ready();
  }, [miniApp]);

  useEffect(() => {
    console.log('@', launchParams);
    setDebug(true);
  }, [launchParams]);

  return <>{children}</>;
}
