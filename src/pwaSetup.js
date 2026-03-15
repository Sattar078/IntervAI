import { setupPWA } from './pwaSetup';
setupPWA();
import { registerSW } from 'virtual:pwa-register';

/**
 * Initializes the Progressive Web App service worker.
 * Separating this logic allows us to manage app updates and offline
 * capabilities without cluttering the main React component tree.
 */
export function setupPWA() {
  if ('serviceWorker' in navigator) {
    const updateSW = registerSW({
      onNeedRefresh() {
        // You can replace this with a custom toast/modal in your React UI later
        if (confirm('New content is available for IntervAI. Reload to update?')) {
          updateSW(true);
        }
      },
      onOfflineReady() {
        console.log('IntervAI is ready to work offline.');
      },
    });
  } else {
    console.warn('Service workers are not supported in this browser.');
  }
}