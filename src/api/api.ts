import {fetchX} from '../util/fetch';

import {ModelNameIdType} from './api-hook-type';

export type CrudResponseType<ModelType> = {
    data: ModelType | Array<ModelType> | null;
    size: number;
};

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
