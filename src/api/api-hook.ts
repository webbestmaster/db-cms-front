import {useCallback, useEffect, useState} from 'react';

import {useRefreshId} from '../util/hook';

import {UseHookType} from './api-hook-type';
import {createDocument} from './api';

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

type CreateDocumentType<CreatedModelType> = {
    createDocument: (modelId: string, modelData: CreatedModelType) => Promise<CreatedModelType>;
};

export function useDocumentHook<ModelType>(): UseHookType<ModelType> & CreateDocumentType<ModelType> {
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

    function createDocumentInHook(modelId: string, modelData: ModelType): Promise<ModelType> {
        setIsInProgress(true);

        return createDocument<ModelType>(modelId, modelData)
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
    };
}
