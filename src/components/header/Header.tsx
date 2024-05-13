import { useNavigate } from 'react-router-dom';
import { Box, Container, Stack, Typography, IconButton } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { toUserFriendlyAddress, CHAIN } from '@tonconnect/sdk';
import { toast } from 'react-toastify';
import { useTonConnectSdkContext, TonKeeperConnectButton } from '@/components';
import { pathConfig } from '@/shared/config';

export function Header() {
  const navigate = useNavigate();
  const { tonConnect } = useTonConnectSdkContext();

  const wallet = tonConnect.wallet;
  const friendlyWalletAddress =
    wallet && toUserFriendlyAddress(wallet.account.address, wallet.account.chain === CHAIN.TESTNET);
  const slicedWalletAddress =
    friendlyWalletAddress &&
    `${friendlyWalletAddress.slice(0, 4)}...${friendlyWalletAddress.slice(-4)}`;

  const onWalletAddressClick = () => {
    if (!friendlyWalletAddress) {
      return;
    }

    navigator.clipboard.writeText(friendlyWalletAddress);
    toast.success('Wallet Address Copied');
  };

  const onDisconnectButtonClick = () => {
    tonConnect.disconnect().then(() => {
      navigate(pathConfig.login.path);
      toast.success('Wallet Disconnected');
    });
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          height: '3rem',
          padding: '0.5rem 0',
        }}
      >
        <Container
          sx={{
            height: '100%',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
          >
            <Stack
              sx={{
                height: '100%',
                marginLeft: 'auto',
              }}
              direction="row"
              alignItems="center"
              gap={2}
            >
              {wallet && (
                <>
                  <Typography
                    sx={{
                      cursor: 'pointer',
                    }}
                    variant="body1"
                    onClick={onWalletAddressClick}
                  >
                    {slicedWalletAddress}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={onDisconnectButtonClick}
                  >
                    <LogoutIcon />
                  </IconButton>
                </>
              )}
              {!wallet && (
                <>
                  <TonKeeperConnectButton />
                </>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
