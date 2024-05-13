import { Box, Container, Stack, Typography, IconButton } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { toUserFriendlyAddress, CHAIN } from '@tonconnect/sdk';
import { connector, TonKeeperConnectButton } from '@/components';

export function Header() {
  const wallet = connector.wallet;

  const slicedWalletAddress = (rawAddress: string, walletChain: CHAIN) => {
    const friendlyAddress = toUserFriendlyAddress(rawAddress, walletChain === CHAIN.TESTNET);

    return friendlyAddress.slice(0, 4) + '...' + friendlyAddress.slice(-4);
  };

  const onAddressClick = (rawAddress: string, walletChain: CHAIN) => {
    const friendlyAddress = toUserFriendlyAddress(rawAddress, walletChain === CHAIN.TESTNET);
    navigator.clipboard.writeText(friendlyAddress);
    // TODO success toast
  };

  const onDisconnectButtonClick = () => {
    connector.disconnect();
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
                    onClick={() => onAddressClick(wallet.account.address, wallet.account.chain)}
                  >
                    {slicedWalletAddress(wallet.account.address, wallet.account.chain)}
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
