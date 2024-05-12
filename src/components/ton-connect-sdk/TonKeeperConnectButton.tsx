import { useEffect, useMemo, useState } from 'react';
import { isWalletInfoCurrentlyInjected, isWalletInfoRemote, CHAIN } from '@tonconnect/sdk';
import type { WalletInfo } from '@tonconnect/sdk';
// import { Typography } from '@mui/material';
import { connector } from './connector';
import { Button, Modal } from '@/shared/ui';
import { TonKeeperIcon } from '@/assets/icons';

const TON_KEEPER_APP_NAME = 'tonkeeper';

export function TonKeeperConnectButton() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [wallets, setWallets] = useState<WalletInfo[]>([]);

  const tonKeeperWallet = useMemo(
    () => wallets.find((wallet) => wallet.appName === TON_KEEPER_APP_NAME) as WalletInfo,
    [wallets],
  );

  const [tonKeeperConnectUrl, setTonKeeperConnectUrl] = useState<string | null>(null);

  useEffect(() => {
    connector.getWallets().then(setWallets);
  }, []);

  useEffect(() => {
    const unsubscribe = connector.onStatusChange((wallet) => {
      if (!wallet) {
        return;
      }

      if (wallet.account.chain !== CHAIN.TESTNET) {
        // TODO error toast
        connector.disconnect();
        return;
      }

      console.log('@ wallet status change', wallet);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onButtonClick = () => {
    setIsModalOpen(true);
    if (isWalletInfoRemote(tonKeeperWallet)) {
      // TODO show QR
      const qrUrl = connector.connect({
        bridgeUrl: tonKeeperWallet.bridgeUrl,
        universalLink: tonKeeperWallet.universalLink,
      });
      setTonKeeperConnectUrl(qrUrl);
      console.log('@ remote');
      return;
    }

    if (isWalletInfoCurrentlyInjected(tonKeeperWallet)) {
      // browser extension, direct connect
      console.log('@ injected');
      return connector.connect({ jsBridgeKey: tonKeeperWallet.jsBridgeKey });
    }

    // wallet not installed, show info about wallet installation (wallet.aboutUrl)
    console.log('@ wallet not installed');
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onDirectLinkOpen = () => {
    window.open(tonKeeperConnectUrl as string, '_blank');
  };

  return (
    <>
      <Button
        sx={{
          typography: 'body1',
          fontWeight: 600,
          color: '#ffffff',
          backgroundColor: '#215375',
          textTransform: 'none',
          borderRadius: '2rem',
          '&:hover': {
            backgroundColor: '#2C6E9C',
          },
        }}
        variant="contained"
        startIcon={<TonKeeperIcon />}
        onClick={onButtonClick}
      >
        Connect
      </Button>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={onModalClose}
        >
          <>
            <Button onClick={onDirectLinkOpen}>Direct URL</Button>
          </>
        </Modal>
      )}
    </>
  );
}
