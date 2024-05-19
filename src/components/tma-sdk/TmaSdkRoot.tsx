import type { PropsWithChildren } from 'react';
import { SDKProvider } from '@tma.js/sdk-react';
import { TmaSdkInit } from './TmaSdkInit';

interface TmaSdkRootProps {}

export function TmaSdkRoot({ children }: PropsWithChildren<TmaSdkRootProps>) {
  return (
    <>
      <SDKProvider
        acceptCustomStyles
        debug
      >
        <TmaSdkInit>{children}</TmaSdkInit>
      </SDKProvider>
    </>
  );
}
