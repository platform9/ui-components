"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCodeComponentStyles = exports.defaultGraphComponentStyles = exports.defaultAlertComponentStyles = void 0;
const colors_1 = __importDefault(require("../base/colors"));
const colorHelpers_1 = require("../../../utils/colorHelpers");
exports.defaultAlertComponentStyles = {
    primary: {
        background: colorHelpers_1.hexToRgbaCss(colors_1.default.blue[500], 0.05),
        border: colors_1.default.blue[500],
    },
    success: {
        background: colorHelpers_1.hexToRgbaCss(colors_1.default.green[500], 0.05),
        border: colors_1.default.green[500],
    },
    warning: {
        background: colorHelpers_1.hexToRgbaCss(colors_1.default.orange[500], 0.05),
        border: colors_1.default.orange[500],
    },
    error: {
        background: colorHelpers_1.hexToRgbaCss(colors_1.default.red[500], 0.05),
        border: colors_1.default.red[500],
    },
};
exports.defaultGraphComponentStyles = {
    unknown: colors_1.default.grey[300],
    primary: colors_1.default.blue[500],
    fadedPrimary: colors_1.default.blue[300],
    success: colors_1.default.green[500],
    fadedSuccess: colors_1.default.green[300],
    warning: colors_1.default.yellow[500],
    fadedWarning: colors_1.default.yellow[200],
    danger: colors_1.default.orange[500],
    fadedDanger: colors_1.default.yellow[300],
    error: colors_1.default.red[500],
    fadedError: colors_1.default.red[300],
    aws: colors_1.default.aws[500],
    azure: colors_1.default.azure[500],
    google: colors_1.default.googleYellow[500],
};
exports.defaultCodeComponentStyles = {
    background: colorHelpers_1.hexToRgbaCss(colors_1.default.codeBlue[500], 0.1),
    text: colors_1.default.codeBlue[500],
};
//# sourceMappingURL=default-components.js.map