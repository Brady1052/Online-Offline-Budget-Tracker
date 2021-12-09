const cacheName = 'v1';

const cacheAssets = [
  "/",
  "/index.html",
  "/index.js",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
]

//Install
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files')
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
})
//Activate
self.addEventListener('activate', event => {
  console.log('Service Worker: Activated')
  //Remove unwatned Caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing old Cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

//Call Fetch Event
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching');
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)))
})

