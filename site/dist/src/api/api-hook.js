/* global File */
import { useCallback, useState } from 'react';
import { createDocument, readDocumentById, readDocumentList, updateDocument, deleteDocument, fileUpload } from './api';
export function useApiHooks() {
    const [isInProgress, setIsInProgress] = useState(false);
    const [processError, setProcessError] = useState(null);
    const [result, setResult] = useState(null);
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
export function useDocumentHook() {
    const { isInProgress, setIsInProgress, processError, setProcessError, result, setResult, 
    // refreshId,
    // refresh,
    reset, } = useApiHooks();
    const createDocumentInHook = useCallback((modelNameId, modelData) => {
        setIsInProgress(true);
        return createDocument(modelNameId, modelData)
            .then((data) => {
            setResult(data);
            return data;
        })
            .finally(() => setIsInProgress(false))
            .catch((error) => {
            setProcessError(error);
            throw error;
        });
    }, [setIsInProgress, setProcessError, setResult]);
    const readDocumentByIdInHook = useCallback((modelNameId, objectId) => {
        setIsInProgress(true);
        return readDocumentById(modelNameId, objectId)
            .then((data) => {
            setResult(data);
            return data;
        })
            .finally(() => setIsInProgress(false))
            .catch((error) => {
            setProcessError(error);
            throw error;
        });
    }, [setIsInProgress, setProcessError, setResult]);
    const updateDocumentInHook = useCallback((modelNameId, modelData) => {
        setIsInProgress(true);
        return updateDocument(modelNameId, modelData)
            .then((data) => {
            setResult(data);
            return data;
        })
            .finally(() => setIsInProgress(false))
            .catch((error) => {
            setProcessError(error);
            throw error;
        });
    }, [setIsInProgress, setProcessError, setResult]);
    const deleteDocumentInHook = useCallback((modelNameId, objectId) => {
        setIsInProgress(true);
        return deleteDocument(modelNameId, objectId)
            .finally(() => setIsInProgress(false))
            .catch((error) => {
            setProcessError(error);
            throw error;
        });
    }, [setIsInProgress, setProcessError]);
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
export function useDocumentListHook() {
    const { isInProgress, setIsInProgress, processError, setProcessError, result, setResult, 
    // refreshId,
    // refresh,
    reset, } = useApiHooks();
    const readDocumentListInHook = useCallback((modelNameId, parameters) => {
        setIsInProgress(true);
        return readDocumentList(modelNameId, parameters)
            .then((data) => {
            setResult(data);
            return data;
        })
            .finally(() => setIsInProgress(false))
            .catch((error) => {
            setProcessError(error);
            throw error;
        });
    }, [setIsInProgress, setProcessError, setResult]);
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
export function useFileHook() {
    const { isInProgress, setIsInProgress, processError, setProcessError, result, setResult, 
    // refreshId,
    // refresh,
    reset, } = useApiHooks();
    const fileUploadInHook = useCallback((file) => {
        setIsInProgress(true);
        return fileUpload(file)
            .finally(() => setIsInProgress(false))
            .catch((error) => {
            setProcessError(error);
            throw error;
        });
    }, [setIsInProgress, setProcessError]);
    return {
        isInProgress,
        processError,
        result,
        // refresh,
        // refreshId,
        reset,
        uploadFile: fileUploadInHook,
    };
}
