const CACHE_NAME = "our-recipes-v1";

const CACHE_FILES = [
  "./",
  "./index.html",
  "./css/",
  "./js/",
  "./manifest.json",
  "./images/"
];
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async cache => {
                for (const url of CACHE_FILES) {
                    try {
                        await cache.add(url);
                        console.log("[SW] Cached:", url);
                    } catch (error) {
                        console.error("[SW] Failed:", url, error);
                    }
                }
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys
                        .filter(key => key !== CACHE_NAME)
                        .map(key => caches.delete(key))
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
            .catch(() => {
                return caches.match("./index.html");
            })
    );
});
