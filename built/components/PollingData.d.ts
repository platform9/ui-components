/// <reference types="react" />
interface Props {
    loading: boolean;
    hidden?: boolean;
    pause?: boolean;
    pollIntervalMs?: number;
    refreshDuration?: number;
    onReload: (ignoreCache?: boolean, updateLoadingState?: boolean) => Promise<void>;
    pollingCondition?: () => boolean;
}
declare function PollingData({ loading, onReload, hidden, pause, pollIntervalMs, refreshDuration, pollingCondition, }: Props): JSX.Element;
export default PollingData;
