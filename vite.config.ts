import { readFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function setupServer(mode: string, cwd: string) {
  if (mode !== 'development') {
    return {};
  }

  return {
    port: 443,
    host: 'insurance.internal',
    https: {
      cert: readFileSync(resolve(cwd, join('.', '.cert', 'https-cert.pem'))),
      key: readFileSync(resolve(cwd, join('.', '.cert', 'https-key.pem'))),
    },
  };
}

export default defineConfig(({ mode }) => {
  const currentWorkingDir = dirname(fileURLToPath(import.meta.url));

  return {
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(currentWorkingDir, join('.', 'src')),
      },
    },
    server: setupServer(mode, currentWorkingDir),
  };
});
