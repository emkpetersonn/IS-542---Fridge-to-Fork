import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
  },
  base: '/IS-542---Fridge-to-Fork/',
});
