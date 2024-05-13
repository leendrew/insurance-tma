import { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { TonConnect } from '@tonconnect/sdk';
import type { WalletInfo } from '@tonconnect/sdk';
import { TonConnectSdkContext } from './TonConnect.context';
import { GateOverlay } from '@/components/tma-sdk';

const tonConnect = new TonConnect({
  manifestUrl: 'https://insurance-tma.vercel.app/tonconnect-manifest.json',
});

interface TonConnectSdkRootProps {}

export function TonConnectSdkRoot({ children }: PropsWithChildren<TonConnectSdkRootProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wallets, setWallets] = useState<WalletInfo[]>([]);

  useEffect(() => {
    tonConnect
      .restoreConnection()
      .then(() => tonConnect.getWallets())
      .then(setWallets)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <GateOverlay />}
      {!isLoading && (
        <TonConnectSdkContext.Provider value={{ tonConnect, wallets }}>
          {children}
        </TonConnectSdkContext.Provider>
      )}
    </>
  );
}
