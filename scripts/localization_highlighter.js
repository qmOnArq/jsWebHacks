const config = {
    subtree: true,
    characterData: true,
    childList: false,
    attributes: false,
};

const observer = new MutationObserver(handle);

observer.observe(document.body, config);

function handle(mutationsList) {
    mutationsList.forEach(mutation => {
        const node = mutation.target;
        const text = node.nodeValue;
        if (!!(' ' + text).match(/[^\u200B\d](\d+.?\d*)+/g)) {
            const style = node.parentElement.style;
            style.backgroundColor = 'red';
            style.color = 'white';
        }
    });
}

// Uses \u200B to mark localized entities