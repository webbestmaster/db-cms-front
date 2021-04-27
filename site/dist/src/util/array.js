"use strict";
/*
import {isObjectInclude} from './object';

export function arrayMove(list: Array<unknown>, fromIndex: number, toIndex: number): void {
    const item = list[fromIndex];

    list.splice(fromIndex, 1);
    list.splice(toIndex, 0, item);
}

export function findInArray<ItemType>(list: Array<ItemType>, query: {[key: string]: unknown}): ItemType | null {
    return list.find((item: ItemType): boolean => isObjectInclude<ItemType>(item, query)) || null;
}

export function findInArrayEnsure<ItemType>(
    list: Array<ItemType>,
    query: {[key: string]: unknown},
    defaultValue: ItemType
): ItemType {
    return findInArray<ItemType>(list, query) || defaultValue;
}

export function findManyInArray<ItemType>(list: Array<ItemType>, query: {[key: string]: unknown}): Array<ItemType> {
    return list.filter((item: ItemType): boolean => isObjectInclude<ItemType>(item, query));
}

export function findByValue<ItemType>(list: Array<ItemType>, value: unknown): ItemType | null {
    return list.find((item: ItemType): boolean => item === value) || null;
}

export function findByValueEnsure<ItemType>(list: Array<ItemType>, value: unknown, defaultValue: ItemType): ItemType {
    return findByValue<ItemType>(list, value) || defaultValue;
}
*/
