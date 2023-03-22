"use strict";
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
const react_1 = __importDefault(require("react"));
const InfoTooltip_1 = require("../../components/InfoTooltip");
const core_1 = require("@material-ui/core");
const fp_1 = require("../../utils/fp");
const Text_1 = __importDefault(require("../../elements/Text"));
const KeyValues_1 = __importDefault(require("../../components/KeyValues"));
const withFormContext_1 = __importDefault(require("../../components/validatedForm/withFormContext"));
// We need to use `forwardRef` as a workaround of an issue with material-ui Tooltip https://github.com/gregnb/mui-datatables/issues/595
const KeyValuesField = react_1.default.forwardRef((_a, ref) => {
    var { id, value, required, label = '', hasError, errorMessage, onChange, keySuggestions, valueSuggestions, blacklistedTags = [], keyLabel, valueLabel, allowMultipleValues = true, addLabel, additionalFields = [] } = _a, restProps = __rest(_a, ["id", "value", "required", "label", "hasError", "errorMessage", "onChange", "keySuggestions", "valueSuggestions", "blacklistedTags", "keyLabel", "valueLabel", "allowMultipleValues", "addLabel", "additionalFields"]);
    return (react_1.default.createElement(core_1.FormControl, Object.assign({ id: id, error: hasError }, restProps, { ref: ref }),
        !!label && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, required ? `${label} *` : label),
            react_1.default.createElement("br", null))),
        react_1.default.createElement(KeyValues_1.default, { entries: value, onChange: onChange, keySuggestions: keySuggestions, valueSuggestions: valueSuggestions, blacklistedTags: blacklistedTags, addLabel: addLabel || `Add ${label}`, keyLabel: keyLabel, valueLabel: valueLabel, allowMultipleValues: allowMultipleValues, additionalFields: additionalFields }),
        errorMessage && react_1.default.createElement(core_1.FormHelperText, null, errorMessage)));
});
exports.default = fp_1.compose(InfoTooltip_1.withInfoTooltip, // This HoC causes unnecessary re-renders if declared after withFormContext
withFormContext_1.default)(KeyValuesField);
//# sourceMappingURL=KeyValuesField.js.map