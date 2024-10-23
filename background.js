chrome.storage.local.get(['hideBypass', 'showTitle', 'showTag'], function (result) {
    if (result.hideBypass === undefined) {
        chrome.storage.local.set({hideBypass: true});
    }
    if (result.showTitle === undefined) {
        chrome.storage.local.set({showTitle: true});
    }
    if (result.showTag === undefined) {
        chrome.storage.local.set({showTag: true});
    }
    if (result.autoMergeSecondary === undefined) {
        chrome.storage.local.set({autoMergeSecondary: true});
    }
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    console.log('received message', request);

    if (request.action === "settings") {
        chrome.storage.local.get(['hideBypass','showTitle', 'showTag', 'autoMergeSecondary'], function (result) {
            sendResponse({ result });
        });
        return true; // Keeps the message channel open for async sendResponse
    }
});
