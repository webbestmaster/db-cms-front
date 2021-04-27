export function isObjectInclude<ObjectType>(object: ObjectType, query: {[key: string]: unknown}): boolean {
    return Object.keys(query).every((queryKey: string): boolean => query[queryKey] === object[queryKey]);
}

export function getMapFromObject<MapType>(object: {[key: string]: unknown}, keyMap: MapType): MapType {
    const newKeyMap: MapType = {...keyMap};

    return Object.keys(newKeyMap).reduce<MapType>((accum: MapType, key: string): MapType => {
        if (typeof newKeyMap[key] === typeof object[key]) {
            newKeyMap[key] = object[key];
        }

        return newKeyMap;
    }, newKeyMap);
}
