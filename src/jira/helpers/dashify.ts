export default function dashify(str: string, options?: DashifyOptions) {
    return str
        .trim()
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/['’]/g, m => (options?.replaceApostrophe ? '' : m))
        .replace(/\W/g, m => (/[À-ž]/.test(m) ? m : '-'))
        .replace(/^-+|-+$/g, '')
        .replace(/-{2,}/g, m => (options?.condense ? '-' : m))
        .toLowerCase();
}

export interface DashifyOptions {
    condense?: boolean;
    replaceApostrophe?: boolean;
}
