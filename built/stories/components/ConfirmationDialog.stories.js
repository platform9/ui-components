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
exports.CustomFooter = exports.WithError = exports.Loading = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const ConfirmationDialog_1 = __importDefault(require("../../components/ConfirmationDialog"));
const Button_1 = __importDefault(require("../../elements/button/Button"));
// Reusing portal setup from Modal stories
const PortalDecorator = (Story) => {
    const [ready, setReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const rootId = 'modal-portal-root';
        let el = document.getElementById(rootId);
        if (!el) {
            el = document.createElement('div');
            el.id = rootId;
            document.body.appendChild(el);
        }
        setReady(true);
        return () => {
            // cleanup
        };
    }, []);
    if (!ready)
        return react_1.default.createElement("div", null, "Initializing portal...");
    return react_1.default.createElement(Story, null);
};
const meta = {
    title: 'Components/ConfirmationDialog',
    component: ConfirmationDialog_1.default,
    decorators: [PortalDecorator],
    argTypes: {
        open: {
            control: { type: 'boolean' },
            description: 'Controls visibility',
        },
        title: {
            control: { type: 'text' },
            description: 'Dialog title',
        },
        text: {
            control: { type: 'text' },
            description: 'Dialog content text',
        },
        confirmText: {
            control: { type: 'text' },
            description: 'Confirm button text',
        },
        cancelText: {
            control: { type: 'text' },
            description: 'Cancel button text',
        },
        loading: {
            control: { type: 'boolean' },
            description: 'Loading state for confirm button',
        },
        onConfirm: { action: 'confirmed' },
        onCancel: { action: 'cancelled' },
    },
};
exports.default = meta;
const baseArgs = {
    open: false,
    title: 'Confirm Action',
    text: 'Are you sure you want to proceed with this action?',
    confirmText: 'Yes, Proceed',
    cancelText: 'Cancel',
};
const Wrapper = (args) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setOpen(args.open);
    }, [args.open]);
    const handleClose = () => {
        var _a;
        setOpen(false);
        (_a = args.onCancel) === null || _a === void 0 ? void 0 : _a.call(args);
    };
    const handleConfirm = () => {
        var _a;
        console.log('Confirmed');
        setOpen(false);
        (_a = args.onConfirm) === null || _a === void 0 ? void 0 : _a.call(args);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Button_1.default, { onClick: () => setOpen(true) }, "Open Confirmation Dialog"),
        react_1.default.createElement(ConfirmationDialog_1.default, Object.assign({}, args, { open: open, onCancel: handleClose, onConfirm: handleConfirm }))));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Loading = {
    args: Object.assign(Object.assign({}, baseArgs), { loading: true }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.WithError = {
    args: Object.assign(Object.assign({}, baseArgs), { error: {
            title: 'Action Failed',
            message: 'There was an error processing your request.'
        } }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.CustomFooter = {
    args: Object.assign(Object.assign({}, baseArgs), { customFooterActions: (react_1.default.createElement("div", { style: { display: 'flex', gap: 10, width: '100%', justifyContent: 'flex-end' } },
            react_1.default.createElement(Button_1.default, { variant: "tertiary" }, "Custom 1"),
            react_1.default.createElement(Button_1.default, { variant: "primary" }, "Custom 2"))) }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
//# sourceMappingURL=ConfirmationDialog.stories.js.map