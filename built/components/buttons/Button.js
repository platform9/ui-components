"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Button({ onClick = () => alert('clicked'), label = 'Click Me', }) {
    return (react_1.default.createElement("button", { type: "button", onClick: onClick }, label));
}
exports.default = Button;
//# sourceMappingURL=Button.js.map