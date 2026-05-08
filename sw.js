const CACHE = 'competenze-pwa-v1';
const ASSETS = [
  './', './index.html', './style.css', './app.js', './manifest.webmanifest',
  './assets/icons/icon-192.png', './assets/icons/icon-512.png',
  './assets/slides/00-panoramica.png',
  './assets/slides/01-che-cosa-competenza.png',
  './assets/slides/02-perche-importante.png',
  './assets/slides/03-questione-giustizia.png',
  './assets/slides/04-tempo-ia.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
