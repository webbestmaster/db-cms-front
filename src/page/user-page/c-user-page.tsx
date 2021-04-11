import React, {useEffect, useState, useCallback} from 'react';
import {Transfer, Switch, Table, TablePaginationConfig, Checkbox, Select} from 'antd';

import {useDocumentHook, useDocumentListHook} from '../../api/api-hook';
import {TableSortingType} from '../../util/type';
import {getOrderNumber} from '../../util/antd-table';

type UserModelType = {
    userId: string;
    login: string;
    password: string;
};

const defaultSorting: TableSortingType = {field: 'userId', order: 1};

export function UserPage(): JSX.Element {
    const documentHook = useDocumentHook<UserModelType>();
    const {
        readDocumentList,
        result: resultDocumentList,
        isInProgress: isInProgressDocumentList,
    } = useDocumentListHook<UserModelType>();
    const [pagination, setPagination] = useState<TablePaginationConfig>({current: 1, pageSize: 10});
    const [sorting, setSorting] = useState<TableSortingType>(defaultSorting);

    console.log('documentHook.isInProgress', documentHook.isInProgress);
    console.log('documentListHook.isInProgress', isInProgressDocumentList);
    console.log('resultDocumentList', resultDocumentList);

    useEffect(() => {
        readDocumentList('user-model', {
            pageIndex: Number(pagination.current) - 1,
            pageSize: Number(pagination.pageSize),
            queryParameters: {['sort[' + sorting.field + ']']: `${sorting.order}`},
        });
    }, [readDocumentList, pagination, sorting]);

    const onChange = useCallback(
        (newPagination, newFilters, newSorter, newExtra) => {
            setPagination(newPagination);
            console.log('-----------');
            console.log('newPagination', newPagination);
            console.log('newFilters', newFilters);
            console.log('newSorter', newSorter);

            const orderNumber = getOrderNumber(newSorter.order);

            setSorting(orderNumber ? {field: newSorter.field, order: orderNumber} : defaultSorting);

            console.log('newExtra', newExtra);
            console.log('-----------');
        },
        [setPagination]
    );

    return (
        <div>
            <button
                onClick={() => {
                    documentHook
                        .createDocument('user-model', {
                            userId: String(Date.now()),
                            password: 'pass',
                            login: String(Date.now() + '-my-login'),
                        })
                        .then((user: UserModelType) => {
                            console.log(user);
                            setSorting({field: 'userId', order: -1});
                            // refresh();
                        })
                        .catch((error: Error) => {
                            console.error(error);
                        });

                    console.info('post request to create user, after that refresh table');
                }}
                type="button"
            >
                add user
            </button>

            <h1>table with users</h1>

            {/*
            <div>
                <pre>{JSON.stringify(resultDocumentList, null, 4)}</pre>
            </div>
*/}

            <Table<{userId: string; login: string; key: string}>
                columns={[
                    {title: 'ID', dataIndex: 'userId', align: 'left', sorter: {}},
                    {title: 'Name', dataIndex: 'login', align: 'left', sorter: {}},
                ]}
                dataSource={resultDocumentList?.data.map(user => ({
                    userId: user.userId,
                    login: user.login,
                    key: user.userId,
                }))}
                loading={isInProgressDocumentList}
                onChange={onChange}
                pagination={{
                    // size: 'default',
                    showSizeChanger: true,
                    // hideOnSinglePage: false,
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: resultDocumentList?.size,
                }}
            />
        </div>
    );
}
