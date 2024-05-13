import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { setDebug } from '@tma.js/sdk';
import { useMiniApp, useLaunchParams, useViewport } from '@tma.js/sdk-react';

interface TmaSdkInitProps {}

export function TmaSdkInit({ children }: PropsWithChildren<TmaSdkInitProps>) {
  const miniApp = useMiniApp();
  const launchParams = useLaunchParams();
  const viewPort = useViewport();

  useEffect(() => {
    miniApp.ready();
  }, [miniApp]);

  useEffect(() => {
    console.log('@ launch params', launchParams);
    setDebug(true);
  }, [launchParams]);

  useEffect(() => {
    viewPort.expand();
  }, [viewPort]);

  return <>{children}</>;
}
