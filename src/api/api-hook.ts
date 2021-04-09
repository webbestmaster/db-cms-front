import {useCallback, useEffect, useState} from 'react';

import {useRefreshId} from '../util/hook';

import {ModelNameIdType, UseHookType} from './api-hook-type';
import {createDocument, readDocumentById} from './api';

type StateHooksType<DateType> = {
    isInProgress: boolean;
    setIsInProgress: (isInProgress: boolean) => void;
    processError: Error | null;
    setProcessError: (processError: Error | null) => void;
    result: DateType | null;
    setResult: (result: DateType | null) => void;
    refreshId: string;
    refresh: () => void;
    reset: () => void;
};

export function useApiHooks<DateType>(): StateHooksType<DateType> {
    const [isInProgress, setIsInProgress] = useState<boolean>(false);
    const [processError, setProcessError] = useState<Error | null>(null);
    const [result, setResult] = useState<DateType | null>(null);
    const {refreshId, refresh} = useRefreshId();

    const reset = useCallback(() => {
        setProcessError(null);
        setIsInProgress(false);
        setResult(null);
    }, [setProcessError, setIsInProgress, setResult]);

    return {
        isInProgress,
        setIsInProgress,
        processError,
        setProcessError,
        result,
        setResult,
        refreshId,
        refresh,
        reset,
    };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
type CRUDMethodType<CreatedModelType> = {
    createDocument: (modelNameId: ModelNameIdType, modelData: CreatedModelType) => Promise<CreatedModelType>;
    readDocumentById: (modelNameId: ModelNameIdType, objectId: string) => Promise<CreatedModelType>;
};

export function useDocumentHook<ModelType>(): UseHookType<ModelType> & CRUDMethodType<ModelType> {
    const {
        isInProgress,
        setIsInProgress,
        processError,
        setProcessError,
        result,
        setResult,
        refreshId,
        refresh,
        reset,
    } = useApiHooks<ModelType>();

    function createDocumentInHook(modelNameId: ModelNameIdType, modelData: ModelType): Promise<ModelType> {
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
    }

    function readDocumentByIdInHook(modelNameId: ModelNameIdType, objectId: string): Promise<ModelType> {
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
    }

    return {
        isInProgress,
        processError,
        result,
        refresh,
        refreshId,
        reset,
        createDocument: createDocumentInHook,
        readDocumentById: readDocumentByIdInHook,
    };
}
