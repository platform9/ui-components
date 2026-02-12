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
const ToggleSwitch_1 = __importDefault(require("../../elements/ToggleSwitch"));
const card_1 = __importDefault(require("../../elements/card"));
const containers_1 = require("../containers");
const meta = {
    title: 'Elements/ToggleSwitch',
    component: ToggleSwitch_1.default,
    argTypes: {
        active: {
            control: { type: 'boolean' },
            description: 'Defines the active state of the toggle switch',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Defines the disabled state of the toggle switch',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        label: {
            control: { type: 'text' },
            description: 'Label rendered next to the switch',
            table: {
                type: { summary: 'string' },
            },
        },
    },
};
exports.default = meta;
const baseArgs = {
    active: false,
    disabled: false,
    label: 'Text Here',
};
const StatefulToggle = (args) => {
    const [active, setActive] = (0, react_1.useState)(false);
    return (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(ToggleSwitch_1.default, Object.assign({}, args, { active: active || args.active, onClick: (nextActive) => setActive(nextActive) })))));
};
exports.Default = {
    args: Object.assign({}, baseArgs),
    render: (args) => react_1.default.createElement(StatefulToggle, Object.assign({}, args)),
    parameters: {
        docs: {
            source: {
                code: `
import ToggleSwitch from 'core/elements/toggle'

const MyComponent = () => {
  const [active, setActive] = useState(false)
  return (
    <ToggleSwitch
      label="Text Here"
      active={active}
      onClick={(active) => setActive(active)}
    />
  )
}
`,
            },
        },
    },
};
exports.Active = {
    args: Object.assign(Object.assign({}, baseArgs), { active: true }),
    render: (args) => react_1.default.createElement(StatefulToggle, Object.assign({}, args)),
};
exports.Disabled = {
    args: Object.assign(Object.assign({}, baseArgs), { disabled: true }),
    render: (args) => react_1.default.createElement(StatefulToggle, Object.assign({}, args)),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(ToggleSwitch_1.default, Object.assign({}, args, { label: "Default", active: false, onClick: () => { } })),
            react_1.default.createElement(ToggleSwitch_1.default, Object.assign({}, args, { label: "Active", active: true, onClick: () => { } })),
            react_1.default.createElement(ToggleSwitch_1.default, Object.assign({}, args, { label: "Disabled", disabled: true, active: false, onClick: () => { } }))))),
};
//# sourceMappingURL=toggle.stories.js.map