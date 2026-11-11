import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('chrome-extension://')) {
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const reasonStr = String(event.reason?.message || event.reason?.stack || event.reason);
    if (reasonStr.includes('MetaMask') || reasonStr.includes('chrome-extension://')) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(<App />);
