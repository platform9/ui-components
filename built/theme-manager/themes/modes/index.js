"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themesByKey = exports.ThemeLabels = exports.default = void 0;
const default_1 = __importDefault(require("./default"));
const light_1 = __importDefault(require("./light"));
const dark_1 = __importDefault(require("./dark"));
const ultraDark_1 = __importDefault(require("./ultraDark"));
var default_2 = require("./default");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(default_2).default; } });
var ThemeLabels;
(function (ThemeLabels) {
    ThemeLabels["default"] = "Default";
    ThemeLabels["light"] = "Light";
    ThemeLabels["dark"] = "Dark";
    ThemeLabels["ultra-dark"] = "Ultra Dark";
})(ThemeLabels = exports.ThemeLabels || (exports.ThemeLabels = {}));
exports.themesByKey = {
    light: light_1.default,
    default: default_1.default,
    dark: dark_1.default,
    'ultra-dark': ultraDark_1.default,
};
//# sourceMappingURL=index.js.map