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
exports.ValidatedFormInput = exports.ValidatedFormInputPropTypes = void 0;
const react_1 = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const ValidatedForm_1 = require("../../components/validatedForm/ValidatedForm");
const fieldValidators_1 = require("../../utils/fieldValidators");
const ramda_1 = require("ramda");
const misc_1 = require("../../utils/misc");
const clsx_1 = __importDefault(require("clsx"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const fp_1 = require("../../utils/fp");
// @deprecated
exports.ValidatedFormInputPropTypes = {
    required: prop_types_1.default.bool,
    validateFormOnChange: prop_types_1.default.bool,
    validations: prop_types_1.default.oneOfType([prop_types_1.default.array, prop_types_1.default.object]),
    initialValue: prop_types_1.default.any,
};
/**
 * Wrapper for all the inputs that will require some sort of interaction with
 * the ValidatedForm such as validations and text hints on hover
 */
function ValidatedFormInput(_a) {
    var { id, className, initialValue, validateFormOnChange = false, value, required = false, validations = [], onBlur, onChange, children, error } = _a, rest = __rest(_a, ["id", "className", "initialValue", "validateFormOnChange", "value", "required", "validations", "onBlur", "onChange", "children", "error"]);
    const { initialValues, values, errors, setFieldValue, updateFieldValue, getFieldValue, defineField, removeField, validateField, showErrorsOnBlur, } = react_1.useContext(ValidatedForm_1.ValidatedFormContext);
    const defineCurrentField = defineField(id);
    const setCurrentFieldValue = setFieldValue(id);
    const updateCurrentFieldValue = updateFieldValue(id);
    const getCurrentFieldValue = getFieldValue(id);
    const validateCurrentField = validateField(id);
    const currentInitialValue = initialValue !== undefined
        ? initialValue
        : id !== undefined
            ? fp_1.pathStr(id, initialValues)
            : undefined;
    const currentValue = ramda_1.isNil(value) ? (id !== undefined ? fp_1.pathStr(id, values) : undefined) : value;
    const hasError = fp_1.pathStrOr(null, `${id}.hasError`, errors);
    const errorMessage = fp_1.pathStrOr(error, `${id}.errorMessage`, errors);
    react_1.useEffect(() => {
        defineCurrentField({
            validations: required
                ? Array.isArray(validations)
                    ? [fieldValidators_1.requiredValidator, ...validations]
                    : Object.assign({ required: true }, validations)
                : validations,
        });
        if (currentInitialValue !== undefined) {
            setCurrentFieldValue(currentInitialValue);
        }
    }, [required, misc_1.memoizedObj(validations)]);
    // Remove the field when component unmounts
    react_1.useEffect(() => () => removeField(id), []);
    // Notify value changes to the form when the field is controlled
    react_1.useEffect(() => {
        if (!ramda_1.isNil(value)) {
            setCurrentFieldValue(value);
        }
    }, [value]);
    const handleBlur = react_1.useCallback((e) => {
        if (showErrorsOnBlur) {
            validateCurrentField();
        }
        // Leverage the event to the wrapped input
        if (onBlur) {
            onBlur(e);
        }
    }, [showErrorsOnBlur, validateCurrentField, onBlur]);
    const handleChange = react_1.useCallback((value) => {
        setCurrentFieldValue(value, validateFormOnChange);
        // Leverage the event to the wrapped input
        if (onChange) {
            onChange(value);
        }
    }, [setCurrentFieldValue, onChange]);
    // @ts-ignore
    const params = Object.assign(Object.assign({}, rest), { id,
        values, className: clsx_1.default(className, 'validatedFormInput'), onChange: handleChange, onBlur: handleBlur, value: currentValue, getCurrentValue: getCurrentFieldValue, updateFieldValue: updateCurrentFieldValue, setFieldValue,
        hasError,
        errorMessage,
        required });
    return children(params);
}
exports.ValidatedFormInput = ValidatedFormInput;
/**
 * withFormContext provides access to the form context through props.
 *
 * This pattern is needed because React does not provide access to context within
 * lifecycle methods (componentDidMount).
 *
 * See: https://github.com/facebook/react/issues/12397#issuecomment-375501574
 *
 * @param {Inject the form context into this Component through props.} Input
 */
function withFormContext(Input) {
    return react_1.forwardRef((props, ref) => (react_1.default.createElement(ValidatedFormInput, Object.assign({}, props), (inputProps) => (react_1.default.createElement(Input, Object.assign({}, inputProps, { ref: ref, "data-testid": test_helpers_1.default(inputProps.id, 'list', 'table', 'field') }))))));
}
exports.default = withFormContext;
//# sourceMappingURL=withFormContext.js.map