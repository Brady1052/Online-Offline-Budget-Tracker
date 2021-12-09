const cacheName ='v1'

const cacheAssets = [
  "/", 
  "/index.html", 
  "/index.js", 
  "/favicon.ico", 
  "/styles.css", 
  "/icons/icon-144x144.png",
  "/icons/icon-192x192.png", 
  "/icons/icon-512x512.png"
]

self.addEventListener('install',(event)=>{
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

self.addEventListener('activate', event =>{
  console.log('Service Worker: Activated')
})

