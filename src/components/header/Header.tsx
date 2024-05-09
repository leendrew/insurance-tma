import { Box, Container, Stack } from '@mui/material';

export function Header() {
  return (
    <>
      <Box
        component="header"
        sx={{
          height: '3rem',
        }}
      >
        <Container
          sx={{
            height: '100%',
          }}
        >
          <Stack
            sx={{
              height: '100%',
            }}
            direction="row"
            alignItems="center"
            gap={2}
          >
            <span>header</span>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
