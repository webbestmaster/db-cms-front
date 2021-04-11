import {useCallback, useEffect, useState, useMemo} from 'react';

import {useRefreshId} from '../util/hook';

import {UseDocumentHookType, UseDocumentListHookType} from './api-hook-type';

import {
    DocumentListType,
    ModelNameIdType,
    ReadDocumentListParametersType,
    ReadDocumentListResultType,
} from './api-type';

import {createDocument, readDocumentById, readDocumentList, updateDocument, deleteDocument} from './api';

type StateHooksType<DateType> = {
    isInProgress: boolean;
    setIsInProgress: (isInProgress: boolean) => void;
    processError: Error | null;
    setProcessError: (processError: Error | null) => void;
    result: DateType | null;
    setResult: (result: DateType | null) => void;
    // refreshId: string;
    // refresh: () => void;
    reset: () => void;
};

export function useApiHooks<DateType>(): StateHooksType<DateType> {
    const [isInProgress, setIsInProgress] = useState<boolean>(false);
    const [processError, setProcessError] = useState<Error | null>(null);
    const [result, setResult] = useState<DateType | null>(null);
    // const {refreshId, refresh} = useRefreshId();

    const reset = useCallback(() => {
        setProcessError(null);
        setIsInProgress(false);
        setResult(null);
    }, [setProcessError, setIsInProgress, setResult]);

    // return useMemo((): StateHooksType<DateType> => {
    return {
        isInProgress,
        setIsInProgress,
        processError,
        setProcessError,
        result,
        setResult,
        // refreshId,
        // refresh,
        reset,
    };
    // }, [isInProgress, processError, result, reset]);
}

export function useDocumentHook<ModelType>(): UseDocumentHookType<ModelType> {
    const {
        isInProgress,
        setIsInProgress,
        processError,
        setProcessError,
        result,
        setResult,
        // refreshId,
        // refresh,
        reset,
    } = useApiHooks<ModelType>();

    const createDocumentInHook = useCallback(
        (modelNameId: ModelNameIdType, modelData: ModelType): Promise<ModelType> => {
            setIsInProgress(true);

            return createDocument<ModelType>(modelNameId, modelData)
                .then(
                    (data: ModelType): ModelType => {
                        setResult(data);
                        return data;
                    }
                )
                .finally(() => setIsInProgress(false))
                .catch((error: Error) => {
                    setProcessError(error);
                    throw error;
                });
        },
        [setIsInProgress, setProcessError, setResult]
    );

    const readDocumentByIdInHook = useCallback(
        (modelNameId: ModelNameIdType, objectId: string): Promise<ModelType> => {
            setIsInProgress(true);

            return readDocumentById<ModelType>(modelNameId, objectId)
                .then(
                    (data: ModelType): ModelType => {
                        setResult(data);
                        return data;
                    }
                )
                .finally(() => setIsInProgress(false))
                .catch((error: Error) => {
                    setProcessError(error);
                    throw error;
                });
        },
        [setIsInProgress, setProcessError, setResult]
    );

    const updateDocumentInHook = useCallback(
        (modelNameId: ModelNameIdType, modelData: ModelType): Promise<ModelType> => {
            setIsInProgress(true);

            return updateDocument<ModelType>(modelNameId, modelData)
                .then(
                    (data: ModelType): ModelType => {
                        setResult(data);
                        return data;
                    }
                )
                .finally(() => setIsInProgress(false))
                .catch((error: Error) => {
                    setProcessError(error);
                    throw error;
                });
        },
        [setIsInProgress, setProcessError, setResult]
    );

    const deleteDocumentInHook = useCallback(
        (modelNameId: ModelNameIdType, objectId: string): Promise<unknown> => {
            setIsInProgress(true);

            return deleteDocument(modelNameId, objectId)
                .finally(() => setIsInProgress(false))
                .catch((error: Error) => {
                    setProcessError(error);
                    throw error;
                });
        },
        [setIsInProgress, setProcessError]
    );

    // return useMemo((): UseDocumentHookType<ModelType> => {
    return {
        isInProgress,
        processError,
        result,
        // refresh,
        // refreshId,
        reset,
        createDocument: createDocumentInHook,
        readDocumentById: readDocumentByIdInHook,
        updateDocument: updateDocumentInHook,
        deleteDocument: deleteDocumentInHook,
    };
    // }, [createDocumentInHook, isInProgress, processError, readDocumentByIdInHook, reset, result]);
}

export function useDocumentListHook<ModelType>(): UseDocumentListHookType<ModelType> {
    const {
        isInProgress,
        setIsInProgress,
        processError,
        setProcessError,
        result,
        setResult,
        // refreshId,
        // refresh,
        reset,
    } = useApiHooks<DocumentListType<ModelType>>();

    const readDocumentListInHook = useCallback(
        (
            modelNameId: ModelNameIdType,
            parameters: ReadDocumentListParametersType
        ): Promise<ReadDocumentListResultType<ModelType>> => {
            setIsInProgress(true);

            return readDocumentList<ModelType>(modelNameId, parameters)
                .then(
                    (data: ReadDocumentListResultType<ModelType>): ReadDocumentListResultType<ModelType> => {
                        setResult(data);
                        return data;
                    }
                )
                .finally(() => setIsInProgress(false))
                .catch((error: Error) => {
                    setProcessError(error);
                    throw error;
                });
        },
        [setIsInProgress, setProcessError, setResult]
    );

    // return useMemo((): UseDocumentListHookType<ModelType> => {
    return {
        isInProgress,
        processError,
        result,
        // refresh,
        // refreshId,
        reset,
        readDocumentList: readDocumentListInHook,
    };
    // }, [isInProgress, processError, readDocumentListInHook, reset, result]);
}
