"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@mui/material/styles");
const react_1 = __importDefault(require("react"));
const StyledSpacer = (0, styles_1.styled)('div')(({ height }) => ({
    height,
}));
function Spacer({ className, height = 16 }) {
    return react_1.default.createElement(StyledSpacer, { height: height, className: className });
}
exports.default = Spacer;
//# sourceMappingURL=Spacer.js.map