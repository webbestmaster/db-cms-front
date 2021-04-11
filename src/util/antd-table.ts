export function getOrderNumber(order: unknown): -1 | 0 | 1 {
    if (order === 'ascend') {
        return 1;
    }

    if (order === 'descend') {
        return -1;
    }

    return 0;
}

export type FiltersDataType = Record<string, Array<unknown>>;

export function getFiltersData(filters: Record<string, unknown>): FiltersDataType {
    if (!filters) {
        return {};
    }

    return Object.keys(filters).reduce<FiltersDataType>(
        (accum: FiltersDataType, filterKey: string): FiltersDataType => {
            const filterData = filters[filterKey];

            if (Array.isArray(filterData)) {
                return {
                    ...accum,
                    [filterKey]: filterData,
                };
            }

            return accum;
        },
        {}
    );
}
