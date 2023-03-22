"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ValidatedForm_1 = require("./ValidatedForm");
/* This component is primarily designed to be used as a debugging tool to
 * show the form context during development.
 */
const ValidatedFormDebug = () => (react_1.default.createElement(ValidatedForm_1.ValidatedFormConsumer, null, (props) => react_1.default.createElement("pre", null, JSON.stringify(props, null, 4))));
exports.default = ValidatedFormDebug;
//# sourceMappingURL=ValidatedFormDebug.js.map