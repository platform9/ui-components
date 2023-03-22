"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const button_1 = __importDefault(require("../elements/button"));
const Alert_1 = __importDefault(require("./Alert"));
const modal_1 = __importDefault(require("../elements/modal"));
const Text_1 = __importDefault(require("../elements/Text"));
class ConfirmationDialog extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleCancel = () => {
            this.props.onCancel && this.props.onCancel();
        };
        this.handleConfirm = () => {
            this.props.onConfirm && this.props.onConfirm();
        };
    }
    render() {
        const { open, error, title = 'Are you sure?', text = 'Are you sure?', cancelText = 'Cancel', confirmText = 'Confirm', loading, customFooterActions, } = this.props;
        return (react_1.default.createElement(modal_1.default, { panel: "dialog", open: open, onClose: this.handleCancel, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description", title: title, footer: customFooterActions || (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(button_1.default, { onClick: this.handleCancel, variant: "secondary" }, cancelText),
                react_1.default.createElement(button_1.default, { onClick: this.handleConfirm, variant: "primary", loading: loading, autoFocus: true }, confirmText))) },
            !!error && react_1.default.createElement(Alert_1.default, { variant: "error", title: error === null || error === void 0 ? void 0 : error.title, message: error === null || error === void 0 ? void 0 : error.message }),
            react_1.default.createElement(Text_1.default, { variant: "body1", component: "div" }, text)));
    }
}
exports.default = ConfirmationDialog;
//# sourceMappingURL=ConfirmationDialog.js.map