// CSS imports
import '../styles/styles.css';

import App from './pages/app';
import registerServiceWorker from './sw-register';

let app; // Global agar tidak perlu buat ulang

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', async () => {
  app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });

  await app.renderPage();

  // Daftarkan Service Worker jika bukan development
  registerServiceWorker();
});

// Tangani perubahan hash tanpa re-init App
window.addEventListener('hashchange', async () => {
  if (app) {
    await app.renderPage();
  }
});

// ===== PWA: Prompt Install ke Homescreen =====
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.createElement('button');
  installButton.textContent = 'Install App';
  Object.assign(installButton.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '1000',
    padding: '1rem',
    backgroundColor: '#3367D6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    cursor: 'pointer',
  });

  installButton.addEventListener('click', async () => {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('✅ User accepted install prompt');
    } else {
      console.log('❌ User dismissed install prompt');
    }

    deferredPrompt = null;
    installButton.remove();
  });

  document.body.appendChild(installButton);
});
