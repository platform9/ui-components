"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useInterval = (callback, delay = 0) => {
    const savedCallbackRef = react_1.useRef(callback);
    const intervalIdRef = react_1.useRef();
    react_1.useEffect(() => {
        savedCallbackRef.current = callback;
    }, [callback]);
    react_1.useEffect(() => {
        intervalIdRef.current && clearInterval(intervalIdRef.current);
        if (delay != null) {
            intervalIdRef.current = setInterval(savedCallbackRef.current, delay);
        }
        return () => intervalIdRef.current && clearInterval(intervalIdRef.current);
    }, [delay]);
};
exports.default = useInterval;
//# sourceMappingURL=useInterval.js.map