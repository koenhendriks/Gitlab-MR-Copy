chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    console.log('received message', request);

    if (request.action === "settings") {
        chrome.storage.local.get(['hideBypass','showTitle', 'showTag'], function (result) {
            sendResponse({ result });
        });
        return true; // Keeps the message channel open for async sendResponse
    }
});
