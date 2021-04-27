import { isObjectInclude } from './object';
export function arrayMove(list, fromIndex, toIndex) {
    const item = list[fromIndex];
    list.splice(fromIndex, 1);
    list.splice(toIndex, 0, item);
}
export function findInArray(list, query) {
    return list.find((item) => isObjectInclude(item, query)) || null;
}
export function findInArrayEnsure(list, query, defaultValue) {
    return findInArray(list, query) || defaultValue;
}
export function findManyInArray(list, query) {
    return list.filter((item) => isObjectInclude(item, query));
}
export function findByValue(list, value) {
    return list.find((item) => item === value) || null;
}
export function findByValueEnsure(list, value, defaultValue) {
    return findByValue(list, value) || defaultValue;
}
