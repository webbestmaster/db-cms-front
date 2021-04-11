import {
    DocumentListType,
    ModelNameIdType,
    ReadDocumentListParametersType,
    ReadDocumentListResultType,
} from './api-type';

type UseHookType<HookData> = {
    isInProgress: boolean;
    processError: Error | null;
    result: HookData | null;
    // refresh: () => void;
    // refreshId: string;
    reset: () => void;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
type CRUDMethodType<ModelDataType> = {
    createDocument: (modelNameId: ModelNameIdType, modelData: ModelDataType) => Promise<ModelDataType>;
    readDocumentById: (modelNameId: ModelNameIdType, objectId: string) => Promise<ModelDataType>;
    updateDocument: (modelNameId: ModelNameIdType, modelData: ModelDataType) => Promise<ModelDataType>;
    deleteDocument: (modelNameId: ModelNameIdType, objectId: string) => Promise<unknown>;
};

export type UseDocumentHookType<HookModelType> = UseHookType<HookModelType> & CRUDMethodType<HookModelType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
type CRUDListMethodType<ModelDataType> = {
    readDocumentList: (
        modelNameId: ModelNameIdType,
        parameters: ReadDocumentListParametersType,
    ) => Promise<ReadDocumentListResultType<ModelDataType>>;
};

export type UseDocumentListHookType<HookModelType> = UseHookType<DocumentListType<HookModelType>> &
    CRUDListMethodType<HookModelType>;
