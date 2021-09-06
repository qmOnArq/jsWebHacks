export const loadScript = (src: string) =>
    new Promise<boolean>(resolve => {
        setTimeout(() => {
            const el: (HTMLScriptElement & { loaded?: boolean }) | null = document.querySelector(
                `body > script[src='${src}']`,
            );
            if (el) {
                return el.loaded ? resolve(true) : attachLoadListener(el);
            }
            const script: HTMLScriptElement & { loaded?: boolean } = document.createElement('script');
            script.src = src;
            script.defer = true;
            script.loaded = false;
            attachLoadListener(script);
            document.body.appendChild(script);

            function attachLoadListener(element: HTMLScriptElement & { loaded?: boolean }) {
                element.addEventListener('load', () => {
                    element.loaded = true;
                    resolve(true);
                });
            }
        });
    });
