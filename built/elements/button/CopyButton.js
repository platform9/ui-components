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
const styles_1 = require("@material-ui/styles");
const react_1 = __importStar(require("react"));
const Button_1 = __importDefault(require("./Button"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    copyButton: {
        width: 'max-content',
    },
    textArea: {
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
    },
}));
const CopyButton = ({ className, copyText, disabled = false }) => {
    const [isCopySuccessful, setIsCopySuccessful] = (0, react_1.useState)(false);
    const textAreaRef = (0, react_1.useRef)(null);
    const classes = useStyles();
    // Copied over from CopyToClipboard.tsx
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
    // readOnly is needed in textarea to silence React warning about missing onChange
    return (react_1.default.createElement("div", { onClick: handleCopy, className: classes.copyButton },
        react_1.default.createElement("textarea", { ref: textAreaRef, value: copyText, className: classes.textArea, readOnly: true }),
        react_1.default.createElement(Button_1.default, { variant: "primary", className: className, icon: isCopySuccessful ? 'check' : 'copy', disabled: disabled }, isCopySuccessful ? 'Copied!' : 'Copy')));
};
exports.default = CopyButton;
//# sourceMappingURL=CopyButton.js.map