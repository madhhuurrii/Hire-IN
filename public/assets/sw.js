// Don't register the service worker
    // until the page has fully loaded
    window.addEventListener('load', () => {
        // Is service worker available?
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('sw.js').then(() => {
            console.log('Service worker registered!');
          })
        //   .catch((error) => {
        //     console.warn('Error registering service worker:');
        //     console.warn(error);
        //   });
        }
      });
      var urlstoCache=['/','/index','http://localhost:5000/index']
      self.addEventListener('install', (event) => {
    const cacheKey = 'MyFancyCacheName_v1';
  
    event.waitUntil(caches.open(cacheKey).then((cache) => {
      // Add all the assets in the array to the 'MyFancyCacheName_v1'
      // `Cache` instance for later use.
      console.log("Opended Cache")
      return cache.addAll(
        urlstoCache);
    }));
  });

// Installing Service Worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
  });
  
  // Fetching content using Service Worker
  self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  });
self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('fox-store').then((cache) => cache.addAll([
          '/',
          '/index',
        '/pwa-examples/a2hs/',
        '/pwa-examples/a2hs/index.html',
        '/pwa-examples/a2hs/index.js',
        '/pwa-examples/a2hs/style.css',
        '/pwa-examples/a2hs/images/fox1.jpg',
        '/pwa-examples/a2hs/images/fox2.jpg',
        '/pwa-examples/a2hs/images/fox3.jpg',
        '/pwa-examples/a2hs/images/fox4.jpg',
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });

  