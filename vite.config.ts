import { readFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  const currentWorkingDir = dirname(fileURLToPath(import.meta.url));

  return {
    // for github-pages
    base: '/insurance-tma/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(currentWorkingDir, join('.', 'src')),
      },
    },
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
