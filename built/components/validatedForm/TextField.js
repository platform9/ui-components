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
const Input_1 = __importDefault(require("../../elements/input/Input"));
const withFormContext_1 = __importDefault(require("../../components/validatedForm/withFormContext"));
const TextField = (_a) => {
    var { value, label, hasError, errorMessage, required, variant, onChange, type, returnAsString, getCurrentValue, updateFieldValue, setFieldValue } = _a, restProps = __rest(_a, ["value", "label", "hasError", "errorMessage", "required", "variant", "onChange", "type", "returnAsString", "getCurrentValue", "updateFieldValue", "setFieldValue"]);
    const handleChange = react_1.useCallback((e) => {
        // HTML specs says that <input type="number"> return strings but it's more useful if we
        // convert it to a `Number` to reduce type casting all over the place.
        const strVal = e.target.value;
        const value = type && type.toLowerCase() === 'number' && strVal !== '' ? Number(strVal) : strVal;
        const returnValue = returnAsString ? String(value) : value;
        if (onChange) {
            onChange(returnValue);
        }
    }, [onChange, type]);
    return (react_1.default.createElement(Input_1.default, Object.assign({}, restProps, { label: label && required ? `${label} *` : label, variant: variant, error: errorMessage, value: value !== undefined ? (type === 'number' ? Number(value) : value) : '', onChange: handleChange, type: type })));
};
exports.default = withFormContext_1.default(TextField);
//# sourceMappingURL=TextField.js.map