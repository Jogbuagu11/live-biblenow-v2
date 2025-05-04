import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { registerServiceWorker } from './registerSW';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}

registerServiceWorker();
