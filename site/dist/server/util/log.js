export function log(...args) {
    console.log(...['[SiteServer]:[LOG]:', ...args]);
}
export function logError(...args) {
    console.log(...['[SiteServer]:[ERROR]:', ...args]);
}
