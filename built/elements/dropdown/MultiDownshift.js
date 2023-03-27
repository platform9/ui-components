"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const downshift_1 = __importDefault(require("downshift"));
const fp_1 = require("../../utils/fp");
const ramda_1 = require("ramda");
const stateReducer = (state, changes) => {
    switch (changes.type) {
        case downshift_1.default.stateChangeTypes.keyDownEnter:
        case downshift_1.default.stateChangeTypes.clickItem:
            return Object.assign(Object.assign({}, changes), { highlightedIndex: state.highlightedIndex, isOpen: true, inputValue: '' });
        default:
            return changes;
    }
};
const remove = (selectedItems, item) => {
    return selectedItems.filter((selectedItem) => !(0, ramda_1.equals)(selectedItem, item));
};
function dropdownReducer(selectedItems, { type, payload }) {
    switch (type) {
        case 'toggleItem':
            if (!Array.isArray(payload) && (0, ramda_1.includes)(payload, selectedItems)) {
                return remove(selectedItems, payload);
            }
            return [...selectedItems, payload];
        case 'select':
            return (0, ramda_1.uniq)([...selectedItems, payload]);
        case 'deselect':
            return remove(selectedItems, payload);
        case 'set':
            return Array.isArray(payload) ? payload : fp_1.emptyArr;
        case 'clear':
        default:
            return fp_1.emptyArr;
    }
}
function MultiDownshift(_a) {
    var { children, onMultiChange, selectedItems, isControlled = !!selectedItems } = _a, props = __rest(_a, ["children", "onMultiChange", "selectedItems", "isControlled"]);
    const [locallySelectedItems, dispatch] = (0, react_1.useReducer)(dropdownReducer, selectedItems || fp_1.emptyArr);
    (0, react_1.useEffect)(() => {
        // This should only happen when locally selected
        // items are out of sync (ie changed by an external agent)
        if (isControlled && !(0, ramda_1.equals)(selectedItems, locallySelectedItems)) {
            dispatch({ type: 'set', payload: selectedItems });
        }
    }, [selectedItems]);
    (0, react_1.useEffect)(() => {
        if (!isControlled || !(0, ramda_1.equals)(selectedItems, locallySelectedItems)) {
            onMultiChange && onMultiChange(locallySelectedItems);
        }
    }, [locallySelectedItems]);
    const toggleItem = (0, react_1.useCallback)((item) => {
        dispatch({ type: 'toggleItem', payload: item });
    }, []);
    const selectItem = (0, react_1.useCallback)((item) => {
        dispatch({ type: 'select', payload: item });
    }, []);
    const selectAll = (0, react_1.useCallback)((items) => {
        dispatch({ type: 'set', payload: items });
    }, []);
    const unselectItem = (0, react_1.useCallback)((item) => {
        dispatch({ type: 'deselect', payload: item });
    }, []);
    const clear = (0, react_1.useCallback)(() => {
        dispatch({ type: 'clear' });
    }, []);
    const getRemoveButtonProps = (0, react_1.useCallback)((_a = {}) => {
        var { onClick = undefined, item = undefined } = _a, props = __rest(_a, ["onClick", "item"]);
        return Object.assign({ onClick: (e) => {
                // TODO: use something like downshift's composeEventHandlers utility instead
                onClick && onClick(e);
                e.stopPropagation();
                unselectItem(item);
            } }, props);
    }, []);
    const getStateAndHelpers = (0, react_1.useCallback)((downshift) => {
        return Object.assign({ getRemoveButtonProps,
            toggleItem,
            selectItem,
            unselectItem,
            selectAll,
            clear, selectedItems: locallySelectedItems }, downshift);
    }, [locallySelectedItems]);
    return (react_1.default.createElement(downshift_1.default, Object.assign({}, props, { stateReducer: stateReducer, onChange: toggleItem, selectedItem: null }), (downshift) => children(getStateAndHelpers(downshift))));
}
exports.default = MultiDownshift;
//# sourceMappingURL=MultiDownshift.js.map