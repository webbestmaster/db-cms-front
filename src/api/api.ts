/* global URLSearchParams */

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

    const {pageIndex, pageSize, queryParameters} = parameters;

    const queryParametersAsString
        = queryParameters && Object.keys(queryParameters).length > 0
            ? '?' + new URLSearchParams(queryParameters).toString()
            : '';
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
