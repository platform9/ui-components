"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Text_1 = __importDefault(require("../../../elements/Text"));
const clsx_1 = __importDefault(require("clsx"));
function GridDefaultCell({ children, title, className }) {
    return (react_1.default.createElement(Text_1.default, { variant: "body2", component: "p", className: (0, clsx_1.default)(className, 'grid-cell'), lineClamp: 2, title: title }, children));
}
exports.default = GridDefaultCell;
//# sourceMappingURL=GridDefaultCell.js.map