import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// Auto-copy the chatbot logo to the public assets directory on Vite startup
const srcLogo = path.resolve(__dirname, 'dist/assets/ChatGPT Image Jul 23, 2026, 10_24_45 PM.png');
const destLogo = path.resolve(__dirname, 'public/ChatGPT_Logo.png');
if (fs.existsSync(srcLogo)) {
  try {
    fs.copyFileSync(srcLogo, destLogo);
    console.log('[Vite Config] Chatbot logo copied to public/ChatGPT_Logo.png successfully.');
  } catch (err) {
    console.error('[Vite Config] Error copying chatbot logo:', err.message);
  }
}

// Auto-copy the new hero image to the public directory
const srcImg = path.resolve(__dirname, 'dist/Gemini_Generated_Image_lmg5iglmg5iglmg5.png');
const destImg = path.resolve(__dirname, 'public/Gemini_Generated_Image_lmg5iglmg5iglmg5.png');
if (fs.existsSync(srcImg)) {
  try {
    fs.copyFileSync(srcImg, destImg);
    console.log('[Vite Config] New Gemini hero image copied successfully.');
  } catch (err) {
    console.error('[Vite Config] Error copying Gemini hero image:', err.message);
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/client/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
}));
