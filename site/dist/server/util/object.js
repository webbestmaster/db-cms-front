export function isObjectInclude(object, query) {
    return Object.keys(query).every((queryKey) => query[queryKey] === object[queryKey]);
}
export function getMapFromObject(object, keyMap) {
    const newKeyMap = Object.assign({}, keyMap);
    return Object.keys(newKeyMap).reduce((accum, key) => {
        if (typeof newKeyMap[key] === typeof object[key]) {
            newKeyMap[key] = object[key];
        }
        return newKeyMap;
    }, newKeyMap);
}
