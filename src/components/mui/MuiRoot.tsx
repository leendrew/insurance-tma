import type { PropsWithChildren } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const muiConfig = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

interface MuiRootProps {}

export function MuiRoot({ children }: PropsWithChildren<MuiRootProps>) {
  return (
    <>
      <ThemeProvider theme={muiConfig}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </>
  );
}
