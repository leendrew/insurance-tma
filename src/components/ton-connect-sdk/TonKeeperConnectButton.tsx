import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import { isWalletInfoCurrentlyInjected, isWalletInfoRemote, CHAIN } from '@tonconnect/sdk';
import type { WalletInfo } from '@tonconnect/sdk';
import { QRCodeSVG } from 'qrcode.react';
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

  const [tonKeeperUniversalLink, setTonKeeperUniversalLink] = useState<string | null>(null);

  const onConnectButtonClick = () => {
    setIsModalOpen(true);

    if (isWalletInfoRemote(tonKeeperWallet)) {
      // TODO show QR
      const qrUrl = tonConnect.connect({
        bridgeUrl: tonKeeperWallet.bridgeUrl,
        universalLink: tonKeeperWallet.universalLink,
      });
      setTonKeeperConnectUrl(qrUrl);
      console.log('@ wallet remote');
      return;
    }

    if (isWalletInfoCurrentlyInjected(tonKeeperWallet)) {
      // browser extension, direct connect
      console.log('@ wallet injected');
      return tonConnect.connect({ jsBridgeKey: tonKeeperWallet.jsBridgeKey });
    }

    // wallet not installed, show info about wallet installation (wallet.aboutUrl)
    console.log('@ wallet not installed');
  };

  useEffect(() => {
    const unsubscribe = tonConnect.onStatusChange((wallet) => {
      console.log('@ wallet status changed (from connect button)', wallet);

      if (!wallet) {
        // user disconnect wallet
        navigate(pathConfig.login.path);
        toast.success('Wallet Disconnected');

        return;
      }

      if (wallet.account.chain !== CHAIN.TESTNET) {
        tonConnect.disconnect().then(() => {
          toast.error('You are not in testnet');
        });

        return;
      }

      navigate(pathConfig.home.path);
      toast.success('Connect to Wallet');
    });

    return () => {
      unsubscribe();
    };
  }, [navigate, tonConnect]);

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
            <Stack
              direction="column"
              gap={2}
            >
              <Box
                sx={{
                  padding: '1rem',
                  borderRadius: '1rem',
                  background: '#fff',
                }}
              >
                <QRCodeSVG
                  value={tonKeeperUniversalLink as string}
                  width="100%"
                  level="L"
                  imageSettings={{
                    src: tonKeeperWallet.imageUrl,
                    width: 24,
                    height: 24,
                    excavate: true,
                  }}
                  includeMargin={false}
                />
              </Box>
              <Button onClick={onDirectLinkOpen}>Direct URL</Button>
            </Stack>
          </>
        </Modal>
      )}
    </>
  );
}
