import React, {useEffect, useState, useCallback} from 'react';
import {Transfer, Switch, Table, TablePaginationConfig, Checkbox, Select} from 'antd';

import {generatePath, useParams, Link} from 'react-router-dom';
import {ExtractRouteParams} from 'react-router';

import {appRoute} from '../../app-route';
import {useDocumentHook, useDocumentListHook} from '../../api/api-hook';
import {TableSortingType, FiltersDataType, getFiltersData, getOrderNumber} from '../../util/antd-table';

import {UserModelType} from './user-page-type';

const defaultSorting: TableSortingType = {userId: 1};

export function UserPage(): JSX.Element {
    const documentHook = useDocumentHook<UserModelType>();
    const {
        readDocumentList,
        result: resultDocumentList,
        isInProgress: isInProgressDocumentList,
    } = useDocumentListHook<UserModelType>();
    const [pagination, setPagination] = useState<TablePaginationConfig>({current: 1, pageSize: 10});
    const [sort, setSort] = useState<TableSortingType>(defaultSorting);
    // const [filters, setFilters] = useState<FiltersDataType>({});

    console.log('documentHook.isInProgress', documentHook.isInProgress);
    console.log('documentListHook.isInProgress', isInProgressDocumentList);
    console.log('resultDocumentList', resultDocumentList);

    useEffect(() => {
        readDocumentList('user-model', {
            pageIndex: Number(pagination.current) - 1,
            pageSize: Number(pagination.pageSize),
            sort,
        });
    }, [readDocumentList, pagination, sort]);

    const onChange = useCallback(
        (newPagination, newFilters: Record<string, unknown>, newSorter, newExtra) => {
            console.log('-----------');

            console.log('newPagination', newPagination);

            setPagination(newPagination);

            console.log('newFilters', newFilters);

            // setFilters(getFiltersData(newFilters));

            console.log('newSorter', newSorter);

            const orderNumber = getOrderNumber(newSorter.order);

            setSort(orderNumber ? {[newSorter.field]: orderNumber} : defaultSorting);

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
                            tagList: [],
                        })
                        .then((user: UserModelType) => {
                            console.log(user);
                            setSort({userId: -1});
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

            <Table<{userId: JSX.Element; login: string; key: string}>
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'userId',
                        align: 'left',
                        sorter: true,

                        /*
                        filters: [
                            {text: 'id is 123123', value: '123123'},
                            {text: 'id is 1231234', value: '1231234'},
                        ],
*/
                    },
                    {
                        title: 'Name',
                        dataIndex: 'login',
                        align: 'left',
                        sorter: true,

                        /*
                        filters: [
                            {text: 'the admin', value: 'admin'},
                            {text: 'это админ', value: 'админ'},
                        ],
*/
                    },
                ]}
                dataSource={resultDocumentList?.data.map(user => ({
                    userId: <Link to={generatePath(appRoute.userEdit.path, {userId: user.userId})}>{user.userId}</Link>,
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
