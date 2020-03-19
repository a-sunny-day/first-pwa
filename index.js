
function showNotification(title, options){
    console.log('noifications fired');
    new Notification(title);
}

// [Violation] Only request notification permission in response to a user gesture.
function requestNotificationAccess() {
    return Notification.requestPermission().then( status => {
        if(status == "denied") {
            return Promise.reject("request for notification denied")
        } else {
            return Promise.resolve("granted");
        }
    })
}

let notifyBtn = document.querySelector('.show-notification');

notifyBtn.addEventListener('click', function() {
    console.log('click to show notification');
    switch(Notification.permission) {
        case "default":
            requestNotificationAccess().then( () => {
                showNotification("OK");
            }).catch( errTxt => {
                console.error(errTxt);
            });
            break;
        case "granted":
            showNotification("OK");
            break;
        case "denied":
            console.error('user has previously denied the request');
            break;
    }
    
})