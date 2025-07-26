const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

browserAPI.storage.local.get(['hideBypass', 'showTitle', 'showTag'], function (result) {
    if (result.hideBypass === undefined) {
        browserAPI.storage.local.set({hideBypass: true});
    }
    if (result.showTitle === undefined) {
        browserAPI.storage.local.set({showTitle: true});
    }
    if (result.showTag === undefined) {
        browserAPI.storage.local.set({showTag: true});
    }
    if (result.autoMergeSecondary === undefined) {
        browserAPI.storage.local.set({autoMergeSecondary: true});
    }
});


browserAPI.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    console.log('received message', request);

    if (request.action === "settings") {
        browserAPI.storage.local.get(['hideBypass','showTitle', 'showTag', 'autoMergeSecondary'], function (result) {
            sendResponse({ result });
        });
        return true; // Keeps the message channel open for async sendResponse
    }
});
