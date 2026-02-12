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
exports.Gallery = exports.Disabled = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const Radio_1 = __importDefault(require("../../elements/input/Radio"));
const card_1 = __importDefault(require("../../elements/card"));
const containers_1 = require("../containers");
const meta = {
    title: 'Elements/Radio',
    component: Radio_1.default,
    argTypes: {
        checked: {
            control: { type: 'boolean' },
            description: 'Defines the checked state of the radio',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Defines the disabled state of the radio',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        label: {
            control: { type: 'text' },
            description: 'Label displayed next to the radio button',
            table: {
                type: { summary: 'string | ReactNode' },
            },
        },
        info: {
            control: { type: 'text' },
            description: 'Optional tooltip content shown when hovering the radio',
            table: {
                type: { summary: 'string | ReactNode' },
            },
        },
    },
};
exports.default = meta;
const baseArgs = {
    checked: false,
    disabled: false,
    label: 'Text Here',
};
const StatefulRadio = (args) => {
    const [checked, setChecked] = (0, react_1.useState)(false);
    return (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Radio_1.default, Object.assign({}, args, { checked: checked || args.checked, onChange: (nextChecked) => setChecked(nextChecked) })))));
};
exports.Default = {
    args: Object.assign({}, baseArgs),
    render: (args) => react_1.default.createElement(StatefulRadio, Object.assign({}, args)),
    parameters: {
        docs: {
            source: {
                code: `
import Radio from 'core/elements/input/radio'

const MyComponent = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Radio
      label="Text Here"
      checked={checked}
      onChange={(checked) => setChecked(checked)}
    />
  )
}
`,
            },
        },
    },
};
exports.Disabled = {
    args: Object.assign(Object.assign({}, baseArgs), { disabled: true }),
    render: (args) => react_1.default.createElement(StatefulRadio, Object.assign({}, args)),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Radio_1.default, Object.assign({}, args, { label: "Default", checked: false })),
            react_1.default.createElement(Radio_1.default, Object.assign({}, args, { label: "Checked", checked: true })),
            react_1.default.createElement(Radio_1.default, Object.assign({}, args, { label: "Disabled", disabled: true, checked: false }))))),
};
//# sourceMappingURL=radio.stories.js.map