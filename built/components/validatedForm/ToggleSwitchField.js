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
const ToggleSwitch_1 = __importDefault(require("../../elements/ToggleSwitch"));
const InfoTooltip_1 = require("../InfoTooltip");
const fp_1 = require("../../utils/fp");
function ToggleSwitchField(_a) {
    var { onChange, value } = _a, restProps = __rest(_a, ["onChange", "value"]);
    return react_1.default.createElement(ToggleSwitch_1.default, Object.assign({}, restProps, { active: !!value, onClick: (value) => onChange(value) }));
}
exports.default = fp_1.compose(InfoTooltip_1.withInfoTooltip, withFormContext_1.default)(ToggleSwitchField);
//# sourceMappingURL=ToggleSwitchField.js.map