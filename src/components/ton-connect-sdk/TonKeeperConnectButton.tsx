import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isWalletInfoCurrentlyInjected, isWalletInfoRemote, CHAIN } from '@tonconnect/sdk';
import type { WalletInfo } from '@tonconnect/sdk';
import { useTonConnectSdkContext } from './TonConnect.context';
import { Button, Modal } from '@/shared/ui';
import { pathConfig } from '@/shared/config';
import { TonKeeperIcon } from '@/assets/icons';

const TON_KEEPER_APP_NAME = 'tonkeeper';

export function TonKeeperConnectButton() {
  const navigate = useNavigate();
  const { tonConnect, wallets } = useTonConnectSdkContext();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const tonKeeperWallet = wallets.find(
    (wallet) => wallet.appName === TON_KEEPER_APP_NAME,
  ) as WalletInfo;

  const [tonKeeperConnectUrl, setTonKeeperConnectUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = tonConnect.onStatusChange((wallet) => {
      if (!wallet) {
        // user disconnect wallet
        return;
      }

      if (wallet.account.chain !== CHAIN.TESTNET) {
        // TODO error toast
        tonConnect.disconnect();
        return;
      }

      console.log('@ wallet status change', wallet);
      // TODO success toast
      navigate(pathConfig.home.path);
    });

    return () => {
      unsubscribe();
    };
  }, [navigate, tonConnect]);

  const onConnectButtonClick = () => {
    setIsModalOpen(true);

    if (isWalletInfoRemote(tonKeeperWallet)) {
      // TODO show QR
      const qrUrl = tonConnect.connect({
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
      return tonConnect.connect({ jsBridgeKey: tonKeeperWallet.jsBridgeKey });
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
        onClick={onConnectButtonClick}
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
