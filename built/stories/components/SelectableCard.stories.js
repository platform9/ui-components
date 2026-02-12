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
exports.Gallery = exports.Disabled = exports.Active = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const SelectableCard_1 = __importDefault(require("../../components/SelectableCard"));
const Text_1 = __importDefault(require("../../elements/Text"));
const meta = {
    title: 'Components/SelectableCard',
    component: SelectableCard_1.default,
    argTypes: {
        active: {
            control: { type: 'boolean' },
            description: 'Active/selected state',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disabled state',
        },
        showCheckmarkIcon: {
            control: { type: 'boolean' },
            description: 'Show checkmark when active',
        },
        onClick: { action: 'clicked' },
    },
};
exports.default = meta;
const baseArgs = {
    id: 'card-1',
    active: false,
    showCheckmarkIcon: true,
    onClick: () => { },
    children: react_1.default.createElement("div", { style: { padding: 20 } },
        react_1.default.createElement(Text_1.default, { variant: "body1" }, "Selectable Card")),
};
const Wrapper = (args) => {
    const [active, setActive] = (0, react_1.useState)(args.active);
    return (react_1.default.createElement("div", { style: { maxWidth: 300 } },
        react_1.default.createElement(SelectableCard_1.default, Object.assign({}, args, { active: active, onClick: () => {
                var _a;
                setActive(!active);
                (_a = args.onClick) === null || _a === void 0 ? void 0 : _a.call(args, args.id);
            } }))));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Active = {
    args: Object.assign(Object.assign({}, baseArgs), { active: true }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Disabled = {
    args: Object.assign(Object.assign({}, baseArgs), { disabled: true, disabledMsg: 'This card is disabled' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'flex', gap: 20 } },
        react_1.default.createElement(SelectableCard_1.default, Object.assign({}, args, { id: "1", active: false }),
            react_1.default.createElement("div", { style: { padding: 20 } }, "Card 1")),
        react_1.default.createElement(SelectableCard_1.default, Object.assign({}, args, { id: "2", active: true }),
            react_1.default.createElement("div", { style: { padding: 20 } }, "Card 2 (Active)")),
        react_1.default.createElement(SelectableCard_1.default, Object.assign({}, args, { id: "3", disabled: true, disabledMsg: "Disabled" }),
            react_1.default.createElement("div", { style: { padding: 20 } }, "Card 3 (Disabled)"))))
};
//# sourceMappingURL=SelectableCard.stories.js.map