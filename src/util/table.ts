/*
export function getIsAscend(order: unknown): boolean {
    return order === 'ascend';
}

export function getIsDescend(order: unknown): boolean {
    return order === 'descend';
}
*/

export function getOrderNumber(order: unknown): -1 | 0 | 1 {
    if (order === 'ascend') {
        return 1;
    }

    if (order === 'descend') {
        return -1;
    }

    return 0;
}
