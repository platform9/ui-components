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
exports.CustomIcon = exports.CustomTitle = exports.Controlled = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const Accordion_1 = __importDefault(require("../../../components/accordion/Accordion"));
const Text_1 = __importDefault(require("../../../elements/Text"));
const meta = {
    title: 'Components/Accordion',
    component: Accordion_1.default,
    argTypes: {
        title: {
            control: { type: 'text' },
            description: 'Accordion title',
        },
        icon: {
            control: { type: 'text' },
            description: 'Custom icon name',
        },
        open: {
            control: { type: 'boolean' },
            description: 'Controlled open state',
        },
        onClick: { action: 'clicked' },
    },
};
exports.default = meta;
const baseArgs = {
    id: 'accordion-1',
    title: 'Accordion Title',
    children: (react_1.default.createElement("div", { style: { padding: '16px' } },
        react_1.default.createElement(Text_1.default, { variant: "body1" }, "This is the content of the accordion."),
        react_1.default.createElement(Text_1.default, { variant: "body2" }, "It can contain any arbitrary JSX."))),
};
const Wrapper = (args) => {
    // Uncontrolled wrapper mostly, unless args.open is provided explicitly in a controlled way
    return (react_1.default.createElement(Accordion_1.default, Object.assign({}, args)));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
const ControlledWrapper = (args) => {
    const [open, setOpen] = (0, react_1.useState)(true);
    return (react_1.default.createElement(Accordion_1.default, Object.assign({}, args, { open: open, onClick: () => setOpen(!open), title: `Controlled Accordion (${open ? 'Open' : 'Closed'})` })));
};
exports.Controlled = {
    args: Object.assign(Object.assign({}, baseArgs), { open: true }),
    render: (args) => react_1.default.createElement(ControlledWrapper, Object.assign({}, args))
};
exports.CustomTitle = {
    args: Object.assign(Object.assign({}, baseArgs), { title: react_1.default.createElement(Text_1.default, { variant: "subtitle1", style: { color: 'blue' } },
            "Custom ",
            react_1.default.createElement("em", null, "Styled"),
            " Title") }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.CustomIcon = {
    args: Object.assign(Object.assign({}, baseArgs), { icon: 'arrow-circle-down' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
//# sourceMappingURL=Accordion.stories.js.map