"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const useStyles = styles_1.makeStyles((theme) => ({
    pre: {
        padding: '6px 10px',
        margin: 0,
        fontFamily: 'SpaceMono',
        fontWeight: 'normal',
        borderRadius: 4,
        display: ({ fill }) => (fill ? 'flex' : 'inline-block'),
        backgroundColor: theme.components.code.background,
        color: theme.components.code.text,
        wordBreak: 'break-all',
        whiteSpace: ({ overflow }) => (overflow ? 'pre' : 'pre-wrap'),
        maxHeight: ({ fill }) => (fill ? 'initial' : 400),
        overflow: 'auto',
        flexGrow: ({ fill }) => (fill ? 1 : 0),
        '& *': {
            fontFamily: 'SpaceMono',
        },
    },
}));
const CodeBlock = ({ overflow = false, children, className, fill = false, }) => {
    const styles = useStyles({ fill, overflow });
    return (react_1.default.createElement("pre", { className: clsx_1.default(styles.pre, 'thin-scrollbar', className) },
        react_1.default.createElement("code", null, children)));
};
exports.default = CodeBlock;
//# sourceMappingURL=CodeBlock.js.map