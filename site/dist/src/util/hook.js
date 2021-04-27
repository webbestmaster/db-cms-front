import { useCallback, useState } from 'react';
import { getRandomString } from './string';
export function useRefreshId() {
    const [refreshId, setRefreshId] = useState(getRandomString());
    const refresh = useCallback(() => setRefreshId(getRandomString()), [setRefreshId]);
    return { refreshId, refresh };
}
/*
export function useUpdaterInList<ItemType>(
    itemList: Array<ItemType>,
    setItemList: (newItemList: Array<ItemType>) => void
): (oldItem: ItemType, newItem: ItemType) => void {
    return useCallback(
        (oldItem: ItemType, newItem: ItemType) => {
            const index = itemList.indexOf(oldItem);

            if (index === -1) {
                console.error('[ERROR]: Can not update: useUpdaterInList');
                return;
            }

            const newItemList = [...itemList];

            newItemList[index] = newItem;

            setItemList(newItemList);
        },
        [itemList, setItemList]
    );
}
*/
