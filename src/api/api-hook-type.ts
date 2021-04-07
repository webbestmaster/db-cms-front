export type UseHookType<HookData> = {
    isInProgress: boolean;
    processError: Error | null;
    result: HookData | null;
    refresh: () => void;
    refreshId: string;
    reset: () => void;
};
