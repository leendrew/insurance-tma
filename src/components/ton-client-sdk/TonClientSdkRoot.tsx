import { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { TonClient } from '@ton/ton';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClientSdkContext } from './TonClient.context';
import { LoadingOverlay } from '@/components';

interface TonClientSdkRootProps {}

export function TonClientSdkRoot({ children }: PropsWithChildren<TonClientSdkRootProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tonClient, setTonClient] = useState<TonClient | null>(null);

  useEffect(() => {
    getHttpEndpoint({
      network: 'testnet',
    })
      .then((endpoint) => {
        const tonClient = new TonClient({
          endpoint,
        });
        setTonClient(tonClient);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      {!isLoading && (
        <TonClientSdkContext.Provider value={{ tonClient } as { tonClient: TonClient }}>
          {children}
        </TonClientSdkContext.Provider>
      )}
    </>
  );
}
