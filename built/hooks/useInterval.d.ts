declare type ICallback = () => void;
declare const useInterval: (callback: ICallback, delay?: number) => void;
export default useInterval;
