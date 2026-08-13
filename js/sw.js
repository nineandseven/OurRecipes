const CACHE_NAME = "our-recipes-v1";

const BASE_PATH = self.registration.scope;

const CACHE_FILES = [
    BASE_PATH,
    `${BASE_PATH}index.html`,
    `${BASE_PATH}css/`,
    `${BASE_PATH}js/`,
    `${BASE_PATH}manifest.json`,
    `${BASE_PATH}images/`
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async cache => {
                for (const url of APP_SHELL) {
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