import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { setDebug } from '@tma.js/sdk';
import {
  useMiniApp,
  useLaunchParams,
  useViewport,
  useThemeParams,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
} from '@tma.js/sdk-react';

interface TmaSdkInitProps {}

export function TmaSdkInit({ children }: PropsWithChildren<TmaSdkInitProps>) {
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const launchParams = useLaunchParams();
  const viewPort = useViewport();

  useEffect(() => {
    miniApp.ready();
  }, [miniApp]);

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewPort && bindViewportCSSVars(viewPort);
  }, [viewPort]);

  useEffect(() => {
    console.log('@ launch params', launchParams);
    setDebug(true);
  }, [launchParams]);

  useEffect(() => {
    viewPort?.expand();
  }, [viewPort]);

  return <>{children}</>;
}
