document.addEventListener('DOMContentLoaded', function () {
    const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
    const bypassCheckbox = document.getElementById('hide-bypass');
    const showTitleCheckbox = document.getElementById('show-title-copy');
    const showTagCopy = document.getElementById('show-tag-copy');
    const changeAutomergeButton = document.getElementById('change-automerge-button');

    // Load the saved states from local storage when popup opens
    browserAPI.storage.local.get(['hideBypass', 'showTitle', 'showTag', 'autoMergeSecondary'], function (result) {
        console.debug('hide-bypass', result.hideBypass);
        bypassCheckbox.checked = result.hideBypass;

        console.debug('showTitle', result.showTitle);
        showTitleCheckbox.checked = result.showTitle;

        console.debug('showTag', result.showTag);
        showTagCopy.checked = result.showTag;

        console.debug('autoMergeSecondary', result.autoMergeSecondary);
        changeAutomergeButton.checked = result.autoMergeSecondary;
    });

    // Save the checkbox states to local storage when toggled
    bypassCheckbox.addEventListener('change', function () {
        console.debug('Hide bypass checkbox changed', bypassCheckbox.checked);
        browserAPI.storage.local.set({ hideBypass: bypassCheckbox.checked });
    });

    showTitleCheckbox.addEventListener('change', function () {
        console.debug('Show Title checkbox changed', showTitleCheckbox.checked);
        browserAPI.storage.local.set({ showTitle: showTitleCheckbox.checked });
    });

    showTagCopy.addEventListener('change', function () {
        console.debug('Show Tag checkbox changed', showTagCopy.checked);
        browserAPI.storage.local.set({ showTag: showTagCopy.checked });
    });

    changeAutomergeButton.addEventListener('change', function () {
        console.debug('Change Automerge Button style checkbox changed', changeAutomergeButton.checked);
        browserAPI.storage.local.set({ autoMergeSecondary: changeAutomergeButton.checked });
    });
});
