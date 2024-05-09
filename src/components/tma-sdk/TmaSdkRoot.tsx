import type { PropsWithChildren } from 'react';
import { DisplayGate, SDKProvider } from '@tma.js/sdk-react';
import { TmaSdkInit } from './TmaSdkInit';

interface TmaSdkRootProps {}

export function TmaSdkRoot({ children }: PropsWithChildren<TmaSdkRootProps>) {
  return (
    <>
      <SDKProvider
        options={{
          acceptCustomStyles: true,
          cssVars: true,
          complete: true,
        }}
      >
        <DisplayGate>
          <TmaSdkInit>{children}</TmaSdkInit>
        </DisplayGate>
      </SDKProvider>
    </>
  );
}
