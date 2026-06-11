const CACHE_NAME = 'magpas-reminder-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install Event - Cache the core application shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching app shell');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event - Clean up old caches if necessary
self.addEventListener('activate', event => {
  console.log('Service Worker activated.');
});

// Fetch Event - Serve assets from cache if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});