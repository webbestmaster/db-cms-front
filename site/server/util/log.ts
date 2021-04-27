export function log(...args: Array<unknown>): void {
    console.log(...['[SiteServer]:[LOG]:', ...args]);
}

export function logError(...args: Array<unknown>): void {
    console.log(...['[SiteServer]:[ERROR]:', ...args]);
}
