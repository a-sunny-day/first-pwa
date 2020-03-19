
function showNotification(title, options){
    console.log('noifications fired');
    let notification = new Notification(title);
    // e.target.title, body, icon
    notification.addEventListener('show', e => {
        console.log("notification Show", e);
    });

    notification.addEventListener('click', e => {
        console.log("notification Click", e);
        // window.location.href = "www.zoom.us";
        e.preventDefault();
        window.open('https://www.zoom.us', '_blank');
        e.target.close();
    });

    notification.addEventListener('error', e => {

        console.log("notification Error", e);
    });

    notification.addEventListener('close', e => {

        console.log("notification Close", e);
    });
}

// [Violation] Only request notification permission in response to a user gesture.
// 浏览器调用系统的通知，但是系统的通知可能被用户或者用户的组织给禁用了 (我的系统的通知，被公司的策略给禁用了，无法修改)（win10 chrome)
// chrome不会提醒你，被禁用了
// IE会用户去打开通知
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