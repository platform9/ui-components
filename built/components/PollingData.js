"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const react_1 = __importStar(require("react"));
const moment_1 = __importDefault(require("moment"));
const useInterval_1 = __importDefault(require("../hooks/useInterval"));
const button_1 = __importDefault(require("../elements/button"));
const defaultRefreshDuration = 1000 * 60 * 5;
function PollingData({ loading, onReload, hidden = false, pause = false, pollIntervalMs = 5000, refreshDuration = defaultRefreshDuration, pollingCondition, }) {
    const [lastIntervalTs, setLastIntervalTs] = react_1.useState(new Date().valueOf());
    const [lastFetchTs, setLastFetchTs] = react_1.useState(new Date().valueOf());
    const reload = react_1.useCallback(() => {
        const ts = new Date().valueOf();
        setLastFetchTs(ts);
        setLastIntervalTs(ts);
        if (typeof pollingCondition === 'function' && !pollingCondition()) {
            return;
        }
        onReload(true, false);
    }, [setLastFetchTs, setLastIntervalTs, onReload, pollingCondition]);
    // This conditional probably can't be used, hooks should not be
    // called in conditionals
    if (!pause) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useInterval_1.default(() => {
            if (!loading) {
                setLastIntervalTs(new Date().valueOf());
            }
        }, pollIntervalMs);
        const currentTs = new Date().valueOf();
        if (currentTs - lastFetchTs > refreshDuration) {
            reload();
        }
    }
    if (hidden) {
        return null;
    }
    return (react_1.default.createElement(button_1.default, { variant: "tertiary", onClick: pause ? undefined : reload, icon: "sync" }, loading ? 'loading...' : moment_1.default(lastIntervalTs).fromNow()));
}
exports.default = PollingData;
//# sourceMappingURL=PollingData.js.map