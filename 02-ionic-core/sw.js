self.addEventListener('install', event => {
    console.log('Installation du Service Worker...');
});

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
});

// termine le précédent SW
// et active immédiatement un nouveau service worker
self.skipWaiting();