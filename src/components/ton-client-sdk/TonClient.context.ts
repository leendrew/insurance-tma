import { createContext, useContext } from 'react';
import type { TonClient } from '@ton/ton';

interface TonClientSdkContextState {
  tonClient: TonClient;
}

export const TonClientSdkContext = createContext<TonClientSdkContextState | null>(null);

export const useTonClientSdkContext = () => {
  const context = useContext(TonClientSdkContext);
  if (!context) {
    throw new Error('This component must be used as child of context provided component');
  }

  return context;
};
