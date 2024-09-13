document.addEventListener('DOMContentLoaded', function () {
    const bypassCheckbox = document.getElementById('hide-bypass');
    const showTitleCheckbox = document.getElementById('show-title-copy');
    const showTagCopy = document.getElementById('show-tag-copy');

    // Load the saved states from local storage when popup opens
    chrome.storage.local.get(['hideBypass', 'showTitle', 'showTag'], function (result) {
        console.debug('hide-bypass', result.hideBypass);
        bypassCheckbox.checked = result.hideBypass;

        console.debug('showTitle', result.showTitle);
        showTitleCheckbox.checked = result.showTitle;

        console.debug('showTag', result.showTag);
        showTagCopy.checked = result.showTag;
    });

    // Save the checkbox states to local storage when toggled
    bypassCheckbox.addEventListener('change', function () {
        console.debug('Hide bypass button changed', bypassCheckbox.checked);
        chrome.storage.local.set({ hideBypass: bypassCheckbox.checked });
    });

    showTitleCheckbox.addEventListener('change', function () {
        console.debug('Show Title button changed', showTitleCheckbox.checked);
        chrome.storage.local.set({ showTitle: showTitleCheckbox.checked });
    });

    showTagCopy.addEventListener('change', function () {
        console.debug('Show Tag button changed', showTagCopy.checked);
        chrome.storage.local.set({ showTag: showTagCopy.checked });
    });
});
