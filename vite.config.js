import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: './public',
  plugins: [vue()],
  build: {
    outDir: 'public',
    rollupOptions: {
      input: '/src/client/main.ts'
    }
  }
});
