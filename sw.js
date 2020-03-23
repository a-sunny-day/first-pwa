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
    e.respondWith(
        caches.match(e.request)
            .then( function(response) {
                return response || fetch(e.request);
            })
    )
})

function notify() {
    // options中的字段，不是程序任意指定的。
    let options = {
        title: "Join the meeting now",
        data: {
            id: Date.now(),
            name: 'Wukong Sun',
            meetingId: '2156759460'
        },
        actions: [
            {
                action: 'Start',
                title: "Start this meeting"
            },
            {
                action: "Close",
                title: 'dismiss me'
            }
        ]
    }
    self.registration.showNotification("Join the meeting", options);
}

self.addEventListener('notificationclick', function(e) {
    let notification  = e.notification;
    let meetingId = notification.data.meetingId;
    let url = `https://zoom.us/wc/${meetingId}/start`;
    let action = e.action;
    switch(action) {
        case 'Start':
            clients.openWindow(url);
            break;
    }
    notification.close();
})


let count = 1;
function notifyTimer() {
    setTimeout(function(e) {
        
        if(count-- > 0) {
            notify();
            notifyTimer();
        }
    }, 10 * 1000);
}

notifyTimer();
