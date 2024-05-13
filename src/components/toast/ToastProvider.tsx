import { ToastContainer } from 'react-toastify';
import { useTheme } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const TOAST_LIMIT = 3;

export function ToastRoot() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <>
      <ToastContainer
        limit={TOAST_LIMIT}
        theme={mode}
        closeOnClick
        draggable
      />
    </>
  );
}
