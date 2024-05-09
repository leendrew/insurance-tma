import { Typography } from '@mui/material';
import { Button } from '@/shared/ui';

export function LoginPage() {
  return (
    <>
      <Typography
        component="h1"
        variant="h2"
      >
        Login Page
      </Typography>
      <Button>open</Button>
      <Button loading={true}>button</Button>
      <Button
        loading={true}
        loadingText="pending..."
      >
        button 2
      </Button>
    </>
  );
}
