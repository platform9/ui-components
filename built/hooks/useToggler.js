"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const misc_1 = require("../utils/misc");
const toggleReducer = (state, { type, payload }) => {
    switch (type) {
        case 'toggle':
            return !state;
        case 'assign':
        default:
            return payload;
    }
};
function useToggler(initialValue = false) {
    const [active, dispatch] = react_1.useReducer(toggleReducer, initialValue);
    const toggle = react_1.useCallback(() => dispatch({
        type: 'toggle',
    }), []);
    const setValue = react_1.useCallback((value) => dispatch({
        type: 'assign',
        payload: value,
    }), []);
    const getValueSetter = react_1.useCallback(misc_1.memoize((value) => () => setValue(value)), []);
    return [active, toggle, setValue, getValueSetter];
}
exports.default = useToggler;
//# sourceMappingURL=useToggler.js.map