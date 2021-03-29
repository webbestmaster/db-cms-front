export function log(...args: Array<unknown>): void {
    console.log(...['[DbCmsServer]:[LOG]:', ...args]);
}

export function logError(...args: Array<unknown>): void {
    console.log(...['[DbCmsServer]:[ERROR]:', ...args]);
}
