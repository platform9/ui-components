"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    messageContainer: {
        minHeight: ({ defaultHeight }) => `${defaultHeight}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
const GridEmptyContent = ({ children, defaultHeight = 150, variant = 'dark', }) => {
    const { messageContainer } = useStyles({ defaultHeight, variant });
    return (react_1.default.createElement("div", { className: messageContainer }, typeof children === 'string' ? (react_1.default.createElement(Text_1.default, { "data-testid": (0, test_helpers_1.default)('no', 'data', 'found'), variant: "subtitle2" }, children)) : (children)));
};
exports.default = GridEmptyContent;
//# sourceMappingURL=GridEmptyContent.js.map