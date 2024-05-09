import React from 'react';
import { createRoot } from 'react-dom/client';
import { TmaSdkRoot, TonConnectSdkRoot, MuiRoot, ToastRoot } from '@/components';
import { RouterProvider } from '@/router';
import '@/index.css';

function bootstrap() {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <TmaSdkRoot>
        <TonConnectSdkRoot>
          <MuiRoot>
            <RouterProvider />
            <ToastRoot />
          </MuiRoot>
        </TonConnectSdkRoot>
      </TmaSdkRoot>
    </React.StrictMode>,
  );
}
bootstrap();
