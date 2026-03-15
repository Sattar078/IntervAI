import { registerSW } from 'virtual:pwa-register';

/**
 * Initializes the Progressive Web App service worker.
 * Separating this logic allows us to manage app updates and offline
 * capabilities without cluttering the main React component tree.
 */
export function setupPWA() {
  if ('serviceWorker' in navigator) {
    registerSW({
      immediate: true,
      onOfflineReady() {
        console.log('AI Interview Platform is ready to work offline.');
      },
    });
  } else {
    console.warn('Service workers are not supported in this browser.');
  }
}