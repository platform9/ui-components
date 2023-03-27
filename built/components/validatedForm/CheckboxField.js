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
const Checkbox_1 = __importDefault(require("../../elements/input/Checkbox"));
const withFormContext_1 = __importDefault(require("../../components/validatedForm/withFormContext"));
function CheckboxField(_a) {
    var { value } = _a, restProps = __rest(_a, ["value"]);
    return (react_1.default.createElement(Checkbox_1.default, Object.assign({}, restProps, { textWeight: "light", checked: !!value })));
}
exports.default = (0, withFormContext_1.default)(CheckboxField);
//# sourceMappingURL=CheckboxField.js.map