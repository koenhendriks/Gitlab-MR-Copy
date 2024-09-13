console.log("Loaded Gitlab MR copy tool");

window.addEventListener('load', () => {
    function addCopyButtonMR() {
        const actionContainerElement = document.querySelector('.merge-request .detail-page-header .detail-page-header-body');
        const mrTitleElement = document.querySelector('.merge-request .detail-page-header .title');
        const mrUrl = window.location.href;

        if(mrTitleElement){
            console.log("Title:", mrTitleElement.innerText);
        }

        console.log("URL:", mrUrl);

        if (mrTitleElement && !document.getElementById('copy-mr-button')) {
            const mrTitle = mrTitleElement.innerText;
            const button = document.createElement('a');
            button.id = 'copy-mr-button';
            button.ariaLabel = 'Copy MR Title and URL';
            button.style.marginRight = '5px';
            button.className = 'gl-button btn btn-md btn-default gl-hidden sm:gl-block gl-align-self-start has-tooltip js-issuable-edit';

            const innerSpan = document.createElement('span');
            innerSpan.className = 'gl-button-text';
            innerSpan.innerText = '📋';

            button.appendChild(innerSpan);


            button.addEventListener('click', () => {
                const markdownLink = `[${mrTitle}](${mrUrl})`;
                const link = `<a href="${mrUrl}">${mrTitle}</a>`;
                const html = new Blob([link], { type: "text/html" });
                const text = new Blob([markdownLink], { type: "text/plain" });
                const data = new ClipboardItem({ "text/html": html, "text/plain": text });

                navigator.clipboard.write([data])
                    .then(() => {
                        innerSpan.innerText = '✅';
                        setTimeout(() => {
                            innerSpan.innerText = '📋';
                        }, 2000);
                    });
            });

            actionContainerElement.insertBefore(button, actionContainerElement.firstChild);
        }
    }

    function removeBypassButton() {
        // Using a mutation observer to watch for changes in the document as Gitlab renders the MR buttons after the initial load
        const observer = new MutationObserver((mutationsList, observer) => {
            const button = Array.from(document.querySelectorAll('button')).find(button =>
                button.querySelector('span')?.textContent.trim() === 'Bypass'
            );

            if (button) {
                button.style.display = 'none';
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

    }

    function addCopyButtonTags() {
        const tagContainers = document.querySelectorAll('[data-testid="tag-row"]');

        tagContainers.forEach((element) => {
            const tagLink = element.querySelector('a.gl-font-bold');
            const pipelineLink = element.querySelector('[data-testid="ci-icon"]');
            const tagText = tagLink.innerText;
            const tagUrl = window.location.protocol + '//' + window.location.hostname + tagLink.getAttribute('href');

            const button = document.createElement('a');

            button.ariaLabel = 'Copy Tag Title and URL';
            button.style.marginLeft = '5px';
            button.style.paddingTop = '7px';
            button.style.paddingLeft = '7px';
            button.style.width = '32px';
            button.style.height = '32px';
            button.className = 'gl-button btn btn-md btn-default gl-hidden sm:gl-block gl-align-self-start has-tooltip js-issuable-edit copy-tag-button';

            const innerSpan = document.createElement('span');
            innerSpan.className = 'gl-button-text';
            innerSpan.innerText = '📋';

            button.appendChild(innerSpan);

            button.addEventListener('click', () => {
                const markdownLink = `[${tagText}](${tagUrl}) [Pipeline](${pipelineLink.getAttribute('href')})`;
                const link = `<a href="${tagUrl}">${tagText}</a> (<a href="${pipelineLink.getAttribute('href')}">Pipeline</a>)`;
                const html = new Blob([link], { type: "text/html" });
                const text = new Blob([markdownLink], { type: "text/plain" });
                const data = new ClipboardItem({ "text/html": html, "text/plain": text });

                navigator.clipboard.write([data])
                    .then(() => {
                        innerSpan.innerText = '✅';
                        setTimeout(() => {
                            innerSpan.innerText = '📋';
                        }, 2000);
                    });
            });

            element.querySelector('.row-fixed-content').append(button);
        });


    }


    (async () => {
        const response = await chrome.runtime.sendMessage({action: "settings"});

        console.debug('Retrieved settings:', response);

        let settings;
        if(!response || !response.result){
            console.warn('Could not retrieve settings from Gitlab MR copy tool extension. Using default settings.');
            settings = {
                showTitle: true,
                hideBypass: true,
                showTag: true
            };
        } else {
            settings = response.result;
        }


        const currentPage = window.location.href;
        if (currentPage.includes('merge_requests')) {
            if(settings.showTitle){
                console.debug('adding copy title button');
                addCopyButtonMR();
            }

            if(settings.hideBypass){
                console.debug('hiding bypass button');
                removeBypassButton();
            }
        }

        if (currentPage.includes('tags') && settings.showTag) {
            console.debug('adding copy tag button');
            addCopyButtonTags();
        }
    })();
});
