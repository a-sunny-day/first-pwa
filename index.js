function showNotifycation(){
    new Notification("Hello world Notification: " + Date.now() % 10000);
    setTimeout(showNotifycation, 5000);
}


function requestNotificationAccess() {
    Notification.requestPermission().then( status => {
        if(status == "granted") {
            showNotifycation();
        } else {
            console.error('request for notification denied');
        }
    })
}