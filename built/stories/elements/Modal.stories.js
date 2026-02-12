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
exports.CustomContent = exports.WithEntityName = exports.Dialog = exports.Drawer = void 0;
const react_1 = __importStar(require("react"));
const Modal_1 = __importDefault(require("../../elements/modal/Modal"));
const Button_1 = __importDefault(require("../../elements/button/Button"));
const Text_1 = __importDefault(require("../../elements/Text"));
const meta = {
    title: 'Elements/Modal',
    component: Modal_1.default,
    decorators: [
        (Story) => {
            // Create portal root for the modal
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
                    // Cleanup if desired, but might interfere with other stories if they run in parallel in some environments
                    // For now, leaving it is safer in single-page apps like Storybook
                };
            }, []);
            if (!ready)
                return react_1.default.createElement("div", null, "Initializing portal...");
            return (react_1.default.createElement("div", { style: { height: '300px', border: '1px dashed #ccc', padding: 20, position: 'relative' } },
                react_1.default.createElement(Story, null)));
        },
    ],
    argTypes: {
        open: {
            control: { type: 'boolean' },
            description: 'Controls the visibility of the modal',
            table: { defaultValue: { summary: false } },
        },
        title: {
            control: { type: 'text' },
            description: 'Modal title',
        },
        entityName: {
            control: { type: 'text' },
            description: 'Entity name displayed next to title',
        },
        info: {
            control: { type: 'text' },
            description: 'Info text or component',
        },
        panel: {
            control: { type: 'radio' },
            options: ['drawer', 'dialog'],
            description: 'Type of modal panel',
            table: { defaultValue: { summary: 'drawer' } },
        },
        slideFrom: {
            control: { type: 'select' },
            options: ['top', 'right', 'bottom', 'left'],
            description: 'Direction of slide animation',
            table: { defaultValue: { summary: 'right' } },
        },
        showOverlay: {
            control: { type: 'boolean' },
            description: 'Show backdrop overlay',
            table: { defaultValue: { summary: true } },
        },
        maxWidth: {
            control: { type: 'number' },
            description: 'Maximum width of the modal',
        },
        onClose: { action: 'closed' },
    },
};
exports.default = meta;
const baseArgs = {
    title: 'Modal Title',
    children: react_1.default.createElement(Text_1.default, null, "This is the content of the modal."),
    footer: (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Button_1.default, { variant: "primary" }, "Confirm"),
        react_1.default.createElement(Button_1.default, { variant: "secondary" }, "Cancel"))),
    panel: 'drawer',
};
const ModalWrapper = (args) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    // Sync with args for controls
    (0, react_1.useEffect)(() => {
        setIsOpen(args.open);
    }, [args.open]);
    const handleClose = () => {
        setIsOpen(false);
        args.onClose && args.onClose();
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Button_1.default, { onClick: () => setIsOpen(true) }, "Open Modal"),
        react_1.default.createElement(Modal_1.default, Object.assign({}, args, { open: isOpen, onClose: handleClose }))));
};
exports.Drawer = {
    args: Object.assign(Object.assign({}, baseArgs), { open: false, panel: 'drawer' }),
    render: (args) => react_1.default.createElement(ModalWrapper, Object.assign({}, args)),
};
exports.Dialog = {
    args: Object.assign(Object.assign({}, baseArgs), { open: false, panel: 'dialog' }),
    render: (args) => react_1.default.createElement(ModalWrapper, Object.assign({}, args)),
};
exports.WithEntityName = {
    args: Object.assign(Object.assign({}, baseArgs), { open: false, entityName: 'My Entity', panel: 'drawer' }),
    render: (args) => react_1.default.createElement(ModalWrapper, Object.assign({}, args)),
};
exports.CustomContent = {
    args: Object.assign(Object.assign({}, baseArgs), { open: false, title: 'Custom Content', children: (react_1.default.createElement("div", { style: { display: 'grid', gap: 16 } },
            react_1.default.createElement("div", { style: { height: 100, background: '#eee' } }, "Block 1"),
            react_1.default.createElement("div", { style: { height: 100, background: '#e0e0e0' } }, "Block 2"),
            react_1.default.createElement(Text_1.default, null, "Some text description here."))) }),
    render: (args) => react_1.default.createElement(ModalWrapper, Object.assign({}, args)),
};
//# sourceMappingURL=Modal.stories.js.map