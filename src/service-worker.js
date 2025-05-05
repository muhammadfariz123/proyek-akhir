// service-worker.js
const CACHE_NAME = 'starter-app-shell-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.bundle.js',
  '/app.css',
  '/favicon.png',
  '/manifest.json',
  '/images/logo.png',
];

// Cache saat instalasi
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Langsung aktifkan
});

// Bersihkan cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim(); // Ambil kendali langsung
});

// Network first fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Push notification
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Notification';
  const options = {
    body: data.body || 'You have a new message!',
    icon: 'favicon.png',
    badge: 'favicon.png',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
