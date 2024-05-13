import { createContext, useContext } from 'react';
import type { TonConnect } from '@tonconnect/sdk';
import type { WalletInfo } from '@tonconnect/sdk';

interface TonConnectSdkContextState {
  tonConnect: TonConnect;
  wallets: WalletInfo[];
}

export const TonConnectSdkContext = createContext<TonConnectSdkContextState | null>(null);

export const useTonConnectSdkContext = () => {
  const context = useContext(TonConnectSdkContext);
  if (!context) {
    throw new Error('This component must be used as child of context provided component');
  }

  return context;
};
