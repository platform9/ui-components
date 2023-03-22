"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonValidator = exports.yamlValidator = exports.parseValidator = exports.validators = exports.spotMaxPriceValidator = exports.colorHexValidator = exports.passwordValidator = exports.maxValueValidator = exports.rangeValueValidator = exports.minValueValidator = exports.maxLengthValidator = exports.minLengthValidator = exports.lengthValidator = exports.matchFieldValidator = exports.requiredValidator = exports.emailValidator = exports.namespaceValidator = exports.cloudProviderValidator = exports.masterNodeLengthValidator = exports.masterNodesLengthErrorMsg = exports.hasOneSpecialChar = exports.specialChars = exports.hasOneNumber = exports.hasOneUpperChar = exports.hasOneLowerChar = exports.hasMinLength = exports.customValidator = exports.FieldValidator = void 0;
const ramda_1 = require("ramda");
const misc_1 = require("../utils/misc");
const moize_1 = __importDefault(require("moize"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const fp_1 = require("../utils/fp");
class FieldValidator {
    /**
     * @param validationFn Function
     * @param errorMessage String
     */
    constructor(validationFn, errorMessage) {
        this.withMessage = (0, misc_1.memoize)((message) => new FieldValidator(this.validate, message));
        this.validate = validationFn;
        this.errorMessage = errorMessage;
    }
}
exports.FieldValidator = FieldValidator;
// Create a custom inline validator
const customValidator = (validator, errorMessage = undefined) => new FieldValidator(validator, errorMessage);
exports.customValidator = customValidator;
const fieldIsUnset = (value) => (0, ramda_1.isNil)(value) || (0, ramda_1.isEmpty)(value) || value === false;
const hasMinLength = (minLen) => (value) => (0, ramda_1.both)((0, ramda_1.is)(String), (val) => val.length >= minLen)(value);
exports.hasMinLength = hasMinLength;
exports.hasOneLowerChar = (0, ramda_1.both)((0, ramda_1.is)(String), (0, ramda_1.test)(/[a-z]/));
exports.hasOneUpperChar = (0, ramda_1.both)((0, ramda_1.is)(String), (0, ramda_1.test)(/[A-Z]/));
exports.hasOneNumber = (0, ramda_1.both)((0, ramda_1.is)(String), (0, ramda_1.test)(/[0-9]/));
exports.specialChars = '-+!@#$%^&*()?';
exports.hasOneSpecialChar = (0, ramda_1.both)((0, ramda_1.is)(String), (0, ramda_1.test)(new RegExp(`[${exports.specialChars}]`)));
exports.masterNodesLengthErrorMsg = 'You can only have 1, 3 or 5 master nodes';
exports.masterNodeLengthValidator = new FieldValidator((nodes) => fieldIsUnset(nodes) || [1, 3, 5].includes(nodes.length), exports.masterNodesLengthErrorMsg);
exports.cloudProviderValidator = new FieldValidator((name) => fieldIsUnset(name) || !/[^a-z0-9.-]/.test(name), 'Name is invalid, lower case alphanumeric characters, -, and . only');
exports.namespaceValidator = new FieldValidator((namespace) => fieldIsUnset(namespace) || /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/gi.test(namespace), "Namespace is invalid, alphanumeric characters and '-' only");
exports.emailValidator = new FieldValidator((email) => fieldIsUnset(email) ||
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(email), 'Email is invalid');
exports.requiredValidator = new FieldValidator((value) => !fieldIsUnset(value), 'Field is required');
exports.matchFieldValidator = (0, misc_1.memoize)((id) => new FieldValidator((value, formFields) => value === formFields[id], 'Fields do not match'));
const lengthValidator = (minLength, maxLength) => new FieldValidator((value) => fieldIsUnset(value) ||
    (value.toString().length >= minLength && value.toString().length <= maxLength), `Length must be between ${minLength} and ${maxLength}`);
exports.lengthValidator = lengthValidator;
exports.minLengthValidator = (0, misc_1.memoize)((minLength) => new FieldValidator((value) => fieldIsUnset(value) || value.toString().length >= minLength, `Length must be greater than ${minLength}`));
exports.maxLengthValidator = (0, misc_1.memoize)((maxLength) => new FieldValidator((value) => fieldIsUnset(value) || value.toString().length <= maxLength, `Length must be less than ${maxLength}`));
exports.minValueValidator = (0, misc_1.memoize)((min) => new FieldValidator((value) => fieldIsUnset(value) || Number(value) >= min, `Value must be greater than or equal to ${min}`));
exports.rangeValueValidator = (0, misc_1.memoize)((min, max) => new FieldValidator((value) => fieldIsUnset(value) || (Number(value) >= min && Number(value) <= max), `Value must be between ${min} and ${max}`));
exports.maxValueValidator = (0, misc_1.memoize)((max) => new FieldValidator((value) => fieldIsUnset(value) || Number(value) <= max, `Value must be less than or equal to ${max}`));
exports.passwordValidator = new FieldValidator((value) => fieldIsUnset(value) ||
    (0, ramda_1.allPass)([(0, exports.hasMinLength)(8), exports.hasOneLowerChar, exports.hasOneUpperChar, exports.hasOneNumber, exports.hasOneSpecialChar])(value), 
// Show a different error message depending on the validation error
(value) => (0, ramda_1.cond)([
    [(0, ramda_1.complement)((0, exports.hasMinLength)(8)), (0, ramda_1.always)('Password must be at least 8 characters long')],
    [(0, ramda_1.complement)(exports.hasOneLowerChar), (0, ramda_1.always)('Password must contain at least one lowercase letter')],
    [(0, ramda_1.complement)(exports.hasOneUpperChar), (0, ramda_1.always)('Password must contain at least one uppercase letter')],
    [(0, ramda_1.complement)(exports.hasOneNumber), (0, ramda_1.always)('Password must contain at least one number')],
    [
        (0, ramda_1.complement)(exports.hasOneSpecialChar),
        (0, ramda_1.always)(`Password must contain at least one special character, valid characters: "${exports.specialChars}"`),
    ],
])(value));
exports.colorHexValidator = new FieldValidator((hex) => fieldIsUnset(hex) || /^#[a-f0-9]{6}$/i.test(hex), 'Color is invalid');
exports.spotMaxPriceValidator = new FieldValidator((price) => fieldIsUnset(price) || parseFloat(price) > 0.001, 'Minimum value is 0.001');
exports.validators = {
    email: exports.emailValidator,
    password: exports.passwordValidator,
    required: exports.requiredValidator,
    matchField: exports.matchFieldValidator,
    length: exports.lengthValidator,
    minLength: exports.minLengthValidator,
    maxLength: exports.maxLengthValidator,
    minValue: exports.minValueValidator,
    maxValue: exports.maxValueValidator,
    rangeValue: exports.rangeValueValidator,
};
const parseValidator = (key, spec) => {
    if (!exports.validators.hasOwnProperty(key)) {
        if (spec instanceof FieldValidator) {
            return spec;
        }
        // Custom validator
        if (typeof spec === 'function') {
            return (0, exports.customValidator)(spec);
        }
        throw new Error(`Validator with key ${key} does not exist`);
    }
    const validator = exports.validators[key];
    if (spec === true) {
        return validator;
    }
    if ((0, misc_1.isPlainObject)(spec)) {
        const { params, message } = spec;
        const validatorWithParams = params ? validator(...params) : validator;
        if (message) {
            return validatorWithParams.withMessage(message);
        }
        return validatorWithParams;
    }
    if (typeof validator === 'function') {
        return validator(...(Array.isArray(spec) ? spec : [spec]));
    }
};
exports.parseValidator = parseValidator;
const moizedYamlLoad = (0, moize_1.default)(js_yaml_1.default.load, {
    maxSize: 10,
});
exports.yamlValidator = new FieldValidator((yaml) => {
    try {
        if ((0, fp_1.isNilOrEmpty)(yaml))
            return true;
        const body = moizedYamlLoad(yaml);
        if (typeof body === 'string' || body === undefined || body === null) {
            return false;
        }
        return true;
    }
    catch (err) {
        return false;
    }
}, (yaml) => {
    try {
        moizedYamlLoad(yaml);
    }
    catch (err) {
        return (err === null || err === void 0 ? void 0 : err.message) ? err.message : 'Provided YAML code is invalid';
    }
    return 'Provided YAML code is invalid';
});
exports.jsonValidator = new FieldValidator((json) => {
    try {
        const parseableString = json.replace(/[^\S\r\n]/g, ' ');
        JSON.parse(parseableString);
        return true;
    }
    catch (err) {
        return false;
    }
}, (json) => {
    try {
        const parseableString = json.replace(/[^\S\r\n]/g, ' ');
        JSON.parse(parseableString);
    }
    catch (err) {
        return (err === null || err === void 0 ? void 0 : err.toString()) || 'Provided JSON code is invalid';
    }
    return 'Provided JSON code is invalid';
});
//# sourceMappingURL=fieldValidators.js.map