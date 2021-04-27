/* global fetch, Headers, FormData, Response */
export function fetchX(url, options) {
    const definedOptions = Object.assign({ headers: { 'Content-Type': 'application/json' }, credentials: 'include' }, options || {});
    return fetch(url, definedOptions).then((result) => {
        if (result.ok) {
            return result.json();
        }
        throw new Error(JSON.stringify(result));
    });
}
