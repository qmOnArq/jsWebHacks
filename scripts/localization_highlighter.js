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

        if (node.nodeType !== 3) {
            return;
        }

        const text = node.nodeValue;
        const match = (' ' + text + ' ').match(/\u200B?(\D?\d+\D?)+/gm);

        if (!match) {
            return;
        }

        for(let number of match) {
            if (!number.includes('\u200B')) {
                const style = node.parentElement.style;
                style.backgroundColor = 'red';
                style.color = 'white';
                return;
            }
        }
    });
}

// Uses \u200B to mark localized entities