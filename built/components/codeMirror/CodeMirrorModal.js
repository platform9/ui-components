"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const react_1 = __importDefault(require("react"));
const modal_1 = __importDefault(require("../../elements/modal"));
const CodeMirror_1 = __importDefault(require("./CodeMirror"));
const button_1 = __importDefault(require("../../elements/button"));
function CodeMirrorModal({ label, value, open = false, onClose, showOverlay = true, showCopyButton = true, showSearchBar = true, showDownloadButton = false, }) {
    const classes = useStyles({});
    return (react_1.default.createElement(modal_1.default, { panel: "dialog", open: open, onClose: onClose, title: label, maxWidth: 1000, className: classes.modal, showOverlay: showOverlay, footer: react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(button_1.default, { variant: "secondary", onClick: onClose }, "Close")) }, open && (react_1.default.createElement(CodeMirror_1.default, { className: classes.codeMirror, id: `YamlTemplateBlock-${label}`, value: value, showCopyButton: showCopyButton, showSearchBar: showSearchBar, showDownloadButton: showDownloadButton, maxHeight: 700 }))));
}
exports.default = CodeMirrorModal;
const useStyles = styles_1.makeStyles((theme) => ({
    modal: {
        '& .modal-body': {
            padding: 0,
            overflow: 'hidden',
        },
    },
    codeMirror: {
        '& .CodeMirror': {
            maxWidth: 1000,
            width: 1000,
        },
    },
}));
//# sourceMappingURL=CodeMirrorModal.js.map