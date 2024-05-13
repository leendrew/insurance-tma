import { TonConnect } from '@tonconnect/sdk';

export const connector = new TonConnect({
  manifestUrl: 'https://insurance-tma.vercel.app/tonconnect-manifest.json',
});

// TODO loader until resolve promise
connector.restoreConnection();
