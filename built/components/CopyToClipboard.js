"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("./FontAwesomeIcon"));
const clsx_1 = __importDefault(require("clsx"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    textArea: {
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
    },
    copyButton: {
        padding: '0 0 0 2px',
    },
    copyContainer: {
        display: ({ fill, inline }) => (fill ? 'flex' : inline ? 'inline-flex' : 'flex'),
        flexDirection: ({ inline }) => (inline ? 'row' : 'column'),
        '& pre': {
            borderRadius: ({ codeBlock }) => (codeBlock ? '4px 0 0 4px' : 4),
        },
    },
    copyIconContainer: {
        padding: '0 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: ({ codeBlock }) => (codeBlock ? theme.components.code.background : 'transparent'),
        borderRadius: ({ codeBlock }) => (codeBlock ? '0 4px 4px 0' : 0),
        left: ({ codeBlock }) => (codeBlock ? -2 : 0),
    },
    copyIcon: {
        width: 22,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    done: {
        fontWeight: 400,
        color: theme.palette.green.main,
    },
    copy: {
        fontWeight: 400,
        color: ({ codeBlock }) => (codeBlock ? theme.components.code.text : theme.palette.primary.main),
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: theme.components.code.text,
        padding: theme.spacing(0, 2),
        position: 'relative',
        '& > p': {
            fontFamily: theme.typography.subtitle2.fontFamily,
            fontSize: theme.typography.subtitle2.fontSize,
            fontStretch: theme.typography.subtitle2.fontStretch,
            fontStyle: theme.typography.subtitle2.fontStyle,
            lineHeight: theme.typography.subtitle2.lineHeight,
            letterSpacing: theme.typography.subtitle2.letterSpacing,
            fontWeight: 'bold',
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: theme.spacing(),
            right: theme.spacing(),
            height: 2,
            background: ({ codeBlock }) => (codeBlock ? theme.components.code.text : 'transparent'),
        },
    },
}));
const CopyToClipboard = ({ className, children, copyText, inline = true, codeBlock = true, header = undefined, fill = false, triggerWithChild = false, }) => {
    // const { params, updateParams } = useParams<State>(defaultParams)
    const [isCopySuccessful, setIsCopySuccessful] = (0, react_1.useState)(false);
    const textAreaRef = (0, react_1.useRef)(null);
    const classes = useStyles({ codeBlock, inline, fill });
    const handleCopy = (e) => {
        e.stopPropagation();
        try {
            const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
            textAreaRef.current.select();
            const success = document.execCommand('copy');
            if (!success) {
                throw new Error('Unable to copy text');
            }
            if (selected) {
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(selected);
            }
            setIsCopySuccessful(true);
            setTimeout(() => {
                setIsCopySuccessful(false);
            }, 2000);
        }
        catch (e) {
            console.log('Unable to copy text');
        }
    };
    const copyActionElems = (react_1.default.createElement("div", { className: classes.copyIconContainer, onClick: handleCopy },
        react_1.default.createElement(FontAwesomeIcon_1.default, { size: "md", className: (0, clsx_1.default)(classes.copyIcon, isCopySuccessful ? classes.done : classes.copy) }, isCopySuccessful ? 'check' : 'clipboard')));
    // readOnly is needed in textarea to silence React warning about missing onChange
    return triggerWithChild ? (react_1.default.createElement("div", { onClick: handleCopy },
        react_1.default.createElement("textarea", { ref: textAreaRef, value: copyText, className: classes.textArea, readOnly: true }),
        children)) : (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.copyContainer, className) },
        react_1.default.createElement("textarea", { ref: textAreaRef, value: copyText, className: classes.textArea, readOnly: true }),
        !!header && (react_1.default.createElement("div", { className: classes.header },
            react_1.default.createElement("p", null, header),
            !inline && copyActionElems)),
        children,
        inline && copyActionElems));
};
exports.default = CopyToClipboard;
//# sourceMappingURL=CopyToClipboard.js.map