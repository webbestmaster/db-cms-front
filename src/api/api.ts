import {fetchX} from '../util/fetch';

export type CrudResponseType<ModelType> = {
    data: ModelType | Array<ModelType> | null;
    size: number;
};

export function makeDocument<ModelType>(modelId: string, modelData: ModelType): Promise<ModelType> {
    return fetchX<CrudResponseType<ModelType>>('/db-cms/api/crud/create/' + modelId, {
        method: 'POST',
        body: JSON.stringify(modelData),
    }).then(
        (result: CrudResponseType<ModelType>): ModelType => {
            const {data} = result;

            if (Array.isArray(data)) {
                throw new TypeError(JSON.stringify(result));
            }

            if (!data) {
                throw new Error('no data');
            }

            return data;
        }
    );
}
