import type { ReactElement } from 'react';
import { Box, IconButton, Modal as MuiModal, Stack } from '@mui/material';
import type { ModalProps as MuiModalProps } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface ModalProps extends MuiModalProps {
  topHeaderSlot?: ReactElement;
  onClose: () => void;
}

export function Modal({ topHeaderSlot, onClose, children, ...rest }: ModalProps) {
  return (
    <>
      <MuiModal
        onClose={onClose}
        {...rest}
      >
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(100% - 2rem)',
            backgroundColor: 'background.paper',
            borderRadius: '1.5rem',
            padding: '1rem 1.5rem',
          }}
          direction="column"
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            {topHeaderSlot}
            <IconButton
              sx={{
                marginLeft: 'auto',
              }}
              size="small"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </Stack>
      </MuiModal>
    </>
  );
}
