import { useCallback } from 'react';
import { CHAIN } from '@tonconnect/sdk';
import type { SenderArguments } from '@ton/core';
import { toast } from 'react-toastify';
import { useTonConnectSdkContext } from './TonConnect.context';

// Address from hex to friendly example: Address.parse(hexAddress)
// Message example: ...Cell.storeUint(0, 32).storeStringTail('My Custom Message').endCell()
const MAX_MESSAGES_COUNT = 4;

export type UseSendRequestPayload = Pick<SenderArguments, 'to' | 'value' | 'body'>;

export function useSendRequest() {
  const { tonConnect } = useTonConnectSdkContext();

  const request = useCallback(
    (...args: UseSendRequestPayload[]) => {
      if (args.length >= MAX_MESSAGES_COUNT) {
        throw new Error(`Maximum number of messages to send is ${MAX_MESSAGES_COUNT}`);
      }

      return tonConnect.sendTransaction(
        {
          validUntil: Math.floor(Date.now() / 1000) + 300, // 5 min
          network: CHAIN.TESTNET,
          messages: args.map((arg) => ({
            address: arg.to.toString(),
            amount: arg.value.toString(),
            payload: arg.body?.toBoc().toString('base64'),
          })),
        },
        {
          onRequestSent: () => {
            toast.success('Transaction request has been sent. Confirm it in your Wallet');
          },
        },
      );
    },
    [tonConnect],
  );

  return {
    send: request,
  };
}
