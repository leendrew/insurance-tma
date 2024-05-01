import { readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  const currentWorkingDir = dirname(fileURLToPath(import.meta.url));

  return {
    plugins: [react()],
    base: '/insurance-tma/',
    server: {
      port: 443,
      host: 'insurance.internal',
      https: {
        cert: readFileSync(resolve(currentWorkingDir, join('.', '.cert', 'https-cert.pem'))),
        key: readFileSync(resolve(currentWorkingDir, join('.', '.cert', 'https-key.pem'))),
      },
    },
  };
});
