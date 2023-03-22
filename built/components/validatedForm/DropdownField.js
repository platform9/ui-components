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
const withFormContext_1 = __importDefault(require("../../components/validatedForm/withFormContext"));
const fp_1 = require("../../utils/fp");
const withTooltip_1 = __importDefault(require("../../elements/tooltip/withTooltip"));
const ramda_1 = require("ramda");
function DropdownField(_a) {
    var { DropdownComponent, label, required, compact = false, errorMessage } = _a, rest = __rest(_a, ["DropdownComponent", "label", "required", "compact", "errorMessage"]);
    return (
    // @fixme fix these typing issues
    // @ts-ignore
    react_1.default.createElement(DropdownComponent, Object.assign({}, rest, { compact: compact, label: label && required ? `${label} *` : label, error: errorMessage })));
}
const defaultTooltipProps = {
    align: {
        vertical: 'middle',
        horizontal: 'right',
    },
};
exports.default = fp_1.compose(ramda_1.partialRight(withTooltip_1.default, [defaultTooltipProps]), withFormContext_1.default)(DropdownField);
//# sourceMappingURL=DropdownField.js.map