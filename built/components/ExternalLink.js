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
const SimpleLink_1 = __importDefault(require("../components/SimpleLink"));
const ExternalLink = (_a) => {
    var { url, children, newWindow = true } = _a, rest = __rest(_a, ["url", "children", "newWindow"]);
    const targetBlankProps = newWindow ? { target: '_blank', rel: 'noopener' } : {};
    return (react_1.default.createElement(SimpleLink_1.default, Object.assign({ src: url }, targetBlankProps, rest), children || url));
};
exports.default = ExternalLink;
//# sourceMappingURL=ExternalLink.js.map