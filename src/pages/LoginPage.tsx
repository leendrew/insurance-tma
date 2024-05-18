import { Container, Stack, Typography } from '@mui/material';
import { TonKeeperConnectButton } from '@/components';

export function LoginPage() {
  return (
    <>
      <Container
        sx={{
          height: '100%',
        }}
      >
        <Stack
          sx={{
            height: '100%',
          }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          gap={2}
        >
          <Typography
            component="h1"
            variant="h4"
          >
            Connect your Tonkeeper Wallet
          </Typography>
          <TonKeeperConnectButton />
          <Typography
            component="span"
            variant="body1"
          >
            Make sure you have testnet Wallet
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
