export function getOrderNumber(order) {
    if (order === 'ascend') {
        return 1;
    }
    if (order === 'descend') {
        return -1;
    }
    return 0;
}
export function getFiltersData(filters) {
    if (!filters) {
        return {};
    }
    return Object.keys(filters).reduce((accum, filterKey) => {
        const filterData = filters[filterKey];
        if (Array.isArray(filterData) && filterData.length > 0) {
            return Object.assign(Object.assign({}, accum), { [filterKey]: filterData });
        }
        return accum;
    }, {});
}
