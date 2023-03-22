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
const Text_1 = __importDefault(require("../elements/Text"));
const styles_1 = require("@material-ui/styles");
const react_dropzone_1 = require("react-dropzone");
const FontAwesomeIcon_1 = __importDefault(require("../components/FontAwesomeIcon"));
const withFormContext_1 = __importDefault(require("../components/validatedForm/withFormContext"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    dropzone: {
        padding: 16,
        background: theme.components.card.background,
        border: `1px dashed ${theme.components.card.passiveText}`,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
    },
    uploadIcon: {
        color: theme.components.card.passiveText,
    },
    dropzoneText: {
        marginTop: 8,
    },
    imagePreview: {
        maxHeight: 44,
        maxWidth: 48,
    },
    trash: {
        position: 'absolute',
        top: 12,
        right: 12,
        color: theme.components.card.passiveText,
        cursor: 'pointer',
    },
    errorText: {
        color: theme.components.graph.error,
    },
}));
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }
    return window.btoa(binary);
};
const Warning = ({ children }) => {
    const classes = useStyles({});
    return (react_1.default.createElement(Text_1.default, { variant: "body1", className: classes.errorText }, children));
};
const ImageDrop = (0, react_1.forwardRef)((props, ref) => {
    const { onChange, imageUpdater, value, imageData, hasError, errorMessage } = props;
    const classes = useStyles({});
    const clearFile = (e) => {
        e.stopPropagation();
        imageUpdater('');
        onChange({});
    };
    const onDrop = (0, react_1.useCallback)((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            const buffer = reader.result;
            const base64 = arrayBufferToBase64(buffer);
            imageUpdater(base64);
            onChange(file);
        };
        reader.readAsArrayBuffer(file);
    }, []);
    const { getRootProps, getInputProps } = (0, react_dropzone_1.useDropzone)({
        onDrop,
        accept: 'image/jpeg, image/png',
        maxFiles: 1,
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", Object.assign({ className: classes.dropzone }, getRootProps()),
            react_1.default.createElement("input", Object.assign({}, getInputProps())),
            react_1.default.createElement("div", null,
                imageData && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.trash, onClick: clearFile, solid: true }, "trash-alt"),
                    react_1.default.createElement("img", { className: classes.imagePreview, src: `data:image/png;base64,${imageData}` }))),
                !imageData && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.uploadIcon, size: "2x", solid: true }, "file-upload"),
                    react_1.default.createElement("div", { className: classes.dropzoneText },
                        react_1.default.createElement(Text_1.default, { variant: "body2" },
                            react_1.default.createElement("b", null, "Drop"),
                            " file here to upload")))))),
        hasError && react_1.default.createElement(Warning, null, errorMessage)));
});
exports.default = (0, withFormContext_1.default)(ImageDrop);
//# sourceMappingURL=ImageDrop.js.map