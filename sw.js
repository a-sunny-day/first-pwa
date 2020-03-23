const cachesName = "pwa";

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cachesName)
            .then(function(cache) {
                return cache.addAll([
                    "index.html",
                    "index.js",
                ])
            })
    )
});

self.addEventListener('fetch', function(e) {
    console.log(e.request.url);
    e.repondWith(
        caches.match(e.request)
            .then( function(response) {
                return response || fetch(e.request);
            })
    )
})