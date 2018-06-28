
const CacheN = 'currCache';
const ImgsCacheN = 'currImgN';


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CacheN).then(function(cache) {
            return cache.addAll([
                '/currency',
                '/currency/index.html',
                '/currency/js/main.js',
                '/currency/css/style.css'

            ]);
        })
    );
});


self.addEventListener('fetch', function(event) {
    let requestUrl = new URL(event.request.url);
    console.log(event.request);

    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/currency') {
            event.respondWith(caches.match('/currency'));
            return;
        }

    }

    if (requestUrl.pathname.startsWith('/currency/images')) {
        event.respondWith(servePhoto(event.request));
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});


function servePhoto(request) {
    let storageUrl = request.url.replace(/-\d+px\.jpeg$/, '');

    return caches.open(ImgsCacheN).then(function(cache) {
        return cache.match(storageUrl).then(function(response) {
            if (response) return response;

            return fetch(request).then(function(networkResponse) {
                cache.put(storageUrl, networkResponse.clone());
                return networkResponse;
            });
        });
    });
}

self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

