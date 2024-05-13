import { Link } from 'react-router-dom';
import { Container, Stack, Typography } from '@mui/material';

export function HomePage() {
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
          gap={2}
        >
          <Typography
            component="span"
            variant="body1"
            textAlign="center"
          >
            You can top up your balance via&nbsp;
            <Link to="https://t.me/testgiver_ton_bot">@testgiver_ton_bot</Link>
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
