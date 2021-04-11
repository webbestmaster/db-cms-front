import {FiltersDataType, TableSortingType} from '../util/antd-table';

export type ModelNameIdType = 'user-model';

export type CrudResponseType<ModelType> = {
    data: ModelType | Array<ModelType> | null;
    size: number;
};

export type ReadDocumentListParametersType = {
    pageIndex: number;
    pageSize: number;
    sort: TableSortingType;
    filters: FiltersDataType;
    // queryParameters: Record<string, string> | null;
};

export type ReadDocumentListResultType<ModelType> = {
    data: Array<ModelType>;
    size: number;
};

export type DocumentListType<ModelType> = {
    data: Array<ModelType>;
    size: number;
};
