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
exports.Gallery = exports.AsListMenu = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const Menu_1 = __importDefault(require("../../elements/menu/Menu"));
const ListMenu_1 = __importDefault(require("../../elements/menu/ListMenu"));
const MenuItem_1 = __importDefault(require("../../elements/menu/MenuItem"));
const Button_1 = __importDefault(require("../../elements/button/Button"));
const defaults_1 = require("../../elements/menu/defaults");
// Since Menu wraps an anchor and renders a popover relative to it,
// we need a wrapper to manage state for the stories.
const meta = {
    title: 'Elements/Menu',
    component: Menu_1.default,
    subcomponents: { ListMenu: ListMenu_1.default, MenuItem: MenuItem_1.default },
    argTypes: {
        open: {
            control: { type: 'boolean' },
            description: 'Controls menu visibility',
        },
        align: {
            control: { type: 'object' },
            description: 'Alignment object { vertical, horizontal }',
        },
        offset: {
            control: { type: 'object' },
            description: 'Offset object { vertical, horizontal }',
        },
        origin: {
            control: { type: 'text' },
            description: 'Transform origin (e.g. "top left")',
        },
        unorderedList: {
            control: { type: 'boolean' },
            description: 'Render as <ul> instead of <nav>',
        },
    },
};
exports.default = meta;
const baseArgs = {
    open: false,
    align: defaults_1.bottomLeft.align,
    offset: defaults_1.bottomLeft.offset,
    origin: 'top left',
};
const MenuWrapper = (args) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    // Allow external control via args
    react_1.default.useEffect(() => {
        setOpen(args.open);
    }, [args.open]);
    const handleClose = () => {
        setOpen(false);
        args.onClose && args.onClose();
    };
    const toggle = () => setOpen(!open);
    return (react_1.default.createElement("div", { style: { padding: 100, display: 'flex', justifyContent: 'center' } },
        react_1.default.createElement(Menu_1.default, Object.assign({}, args, { open: open, onClose: handleClose, anchor: react_1.default.createElement(Button_1.default, { onClick: toggle }, "Toggle Menu") }),
            react_1.default.createElement("div", { style: { padding: 16 } },
                react_1.default.createElement(MenuItem_1.default, { onClick: () => console.log('Item 1') }, "Item 1"),
                react_1.default.createElement(MenuItem_1.default, { onClick: () => console.log('Item 2') }, "Item 2"),
                react_1.default.createElement(MenuItem_1.default, { onClick: () => console.log('Item 3') }, "Item 3")))));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(MenuWrapper, Object.assign({}, args)),
};
const ListMenuWrapper = (args) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const toggle = () => setOpen(!open);
    const handleClose = () => setOpen(false);
    const list = [
        { id: '1', name: 'Option 1', icon: 'edit' },
        { id: '2', name: 'Option 2', icon: 'trash' },
        { id: '3', name: 'Option 3', icon: 'cog' },
    ];
    return (react_1.default.createElement("div", { style: { padding: 100, display: 'flex', justifyContent: 'center' } },
        react_1.default.createElement(ListMenu_1.default, Object.assign({}, args, { open: open, onClose: handleClose, anchor: react_1.default.createElement(Button_1.default, { onClick: toggle }, "Open List Menu"), list: list, onClick: (item) => {
                console.log('Clicked', item);
                handleClose();
            } }))));
};
exports.AsListMenu = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(ListMenuWrapper, Object.assign({}, args)),
};
exports.Gallery = {
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: 100, gridTemplateColumns: '1fr 1fr' } },
        react_1.default.createElement(MenuWrapper, Object.assign({}, args, { align: defaults_1.bottomLeft.align, anchor: react_1.default.createElement(Button_1.default, null, "Bottom Left") })),
        react_1.default.createElement(MenuWrapper, Object.assign({}, args, { align: defaults_1.bottomRight.align, anchor: react_1.default.createElement(Button_1.default, null, "Bottom Right") }))))
};
//# sourceMappingURL=Menu.stories.js.map