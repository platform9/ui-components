"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("./Checkbox"));
function Radio(props) {
    return react_1.default.createElement(Checkbox_1.default, Object.assign({}, props, { type: "radio" }));
}
exports.default = Radio;
//# sourceMappingURL=Radio.js.map