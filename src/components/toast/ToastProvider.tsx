import { ToastContainer } from 'react-toastify';

const TOAST_LIMIT = 3;

export function ToastRoot() {
  return (
    <>
      <ToastContainer limit={TOAST_LIMIT} />
    </>
  );
}
