/* global fetch, URLSearchParams, File, FormData, Response */

import {fetchX} from '../util/fetch';

import {
    CrudResponseType,
    ModelNameIdType,
    ReadDocumentListParametersType,
    ReadDocumentListResultType,
} from './api-type';

export function createDocument<ModelType>(modelNameId: ModelNameIdType, modelData: ModelType): Promise<ModelType> {
    return fetchX<CrudResponseType<ModelType>>('/db-cms/api/crud/create/' + modelNameId, {
        method: 'POST',
        body: JSON.stringify(modelData),
    }).then(
        (result: CrudResponseType<ModelType>): ModelType => {
            const {data} = result;

            if (Array.isArray(data)) {
                throw new TypeError(JSON.stringify(result));
            }

            if (!data) {
                throw new Error(
                    `Can not crate document, modelNameId: ${modelNameId}, modelData: ${JSON.stringify(modelData)}`
                );
            }

            return data;
        }
    );
}

export function readDocumentById<ModelType>(modelNameId: ModelNameIdType, objectId: string): Promise<ModelType> {
    return fetchX<CrudResponseType<ModelType>>('/db-cms/api/crud/read/' + modelNameId + '/' + objectId).then(
        (result: CrudResponseType<ModelType>): ModelType => {
            const {data} = result;

            if (Array.isArray(data)) {
                throw new TypeError(JSON.stringify(result));
            }

            if (!data) {
                throw new Error(`Can not get model by id, modelNameId: ${modelNameId}, objectId: ${objectId}`);
            }

            return data;
        }
    );
}

export function readDocumentList<ModelType>(
    modelNameId: ModelNameIdType,
    parameters: ReadDocumentListParametersType
): Promise<ReadDocumentListResultType<ModelType>> {
    // examples:
    // 1 - '/api/crud/read-list/user-model/1/4?sort[password]=-1&sort[userId]=1'
    // 2 - `/api/crud/read-list/user-model/0/4?sort[password]=-1&sort[userId]=1&find[login]=${JSON.stringify('админ')}`
    // 3 - `/api/crud/read-list/user-model/0/4?sort[password]=-1&sort[userId]=1&find[login]=${JSON.stringify({"$regex": "адм","$options": "i"})}`,

    const {pageIndex, pageSize, sort} = parameters;

    const sortQueryParameters: string = Object.keys(sort)
        .map((sortKey: string): string => `sort[${sortKey}]=${sort[sortKey]}`)
        .join('&');

    /*
        const filtersQueryParameters: string = Object.keys(filters)
            .map((filterKey: string): string => `sort[${sortKey}]=${sort[sortKey]}`)
            .join('&');
    */

    const queryParametersAsString = sortQueryParameters ? '?' + sortQueryParameters : '';

    const url = `/db-cms/api/crud/read-list/${modelNameId}/${pageIndex}/${pageSize}${queryParametersAsString}`;

    return fetchX<CrudResponseType<ModelType>>(url).then(
        (result: CrudResponseType<ModelType>): ReadDocumentListResultType<ModelType> => {
            const {data, size} = result;

            if (!Array.isArray(data)) {
                throw new TypeError(JSON.stringify(result));
            }

            if (!data) {
                throw new Error(
                    `Can not get model list, modelNameId: ${modelNameId}, parameters: ${JSON.stringify(parameters)}`
                );
            }

            return {data, size};
        }
    );
}

export function updateDocument<ModelType>(modelNameId: ModelNameIdType, modelData: ModelType): Promise<ModelType> {
    return fetchX<CrudResponseType<ModelType>>('/db-cms/api/crud/update/' + modelNameId, {
        method: 'POST',
        body: JSON.stringify(modelData),
    }).then(
        (result: CrudResponseType<ModelType>): ModelType => {
            const {data} = result;

            if (Array.isArray(data)) {
                throw new TypeError(JSON.stringify(result));
            }

            if (!data) {
                throw new Error(
                    `Can not update document, modelNameId: ${modelNameId}, modelData: ${JSON.stringify(modelData)}`
                );
            }

            return data;
        }
    );
}

export function deleteDocument(modelNameId: ModelNameIdType, objectId: string): Promise<unknown> {
    return fetchX<unknown>('/db-cms/api/crud/delete/' + modelNameId + '/' + objectId, {
        method: 'DELETE',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
    });
}

export function fileUpload(file: File): Promise<string> {
    const formData = new FormData();

    // you can add file name as 3rd parameter
    formData.append('file', file);

    return fetch('/db-cms/api/file/upload', {method: 'POST', credentials: 'include', body: formData}).then(
        (data: Response): Promise<string> => data.json()
    );
}
