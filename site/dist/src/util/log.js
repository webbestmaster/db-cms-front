export function log(...args) {
    console.log(...['[DbCmsServer]:[LOG]:', ...args]);
}
export function logError(...args) {
    console.log(...['[DbCmsServer]:[ERROR]:', ...args]);
}
