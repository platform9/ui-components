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
exports.Gallery = exports.Indeterminate = exports.Disabled = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const Checkbox_1 = __importDefault(require("../../elements/input/Checkbox"));
const card_1 = __importDefault(require("../../elements/card"));
const containers_1 = require("../containers");
const meta = {
    title: 'Elements/Checkbox',
    component: Checkbox_1.default,
    argTypes: {
        checked: {
            control: { type: 'boolean' },
            description: 'Defines the checked state of the checkbox',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Defines the disabled state of the checkbox',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        indeterminate: {
            control: { type: 'boolean' },
            description: 'Defines if the checked state should be a dash instead',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        label: {
            control: { type: 'text' },
            description: 'Label displayed next to the checkbox',
            table: {
                type: { summary: 'string | ReactNode' },
            },
        },
        info: {
            control: { type: 'text' },
            description: 'Optional tooltip content shown when hovering the checkbox',
            table: {
                type: { summary: 'string | ReactNode' },
            },
        },
        textWeight: {
            options: ['heavy', 'light'],
            control: { type: 'radio' },
            description: 'Typography weight used for the label text',
            table: {
                defaultValue: { summary: 'heavy' },
                type: { summary: '"heavy" | "light"' },
            },
        },
    },
};
exports.default = meta;
const baseArgs = {
    checked: false,
    disabled: false,
    indeterminate: false,
    label: 'Text Here',
};
const StatefulCheckbox = (args) => {
    const [checked, setChecked] = (0, react_1.useState)(false);
    return (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Checkbox_1.default, Object.assign({}, args, { checked: checked || args.checked, onChange: (nextChecked) => setChecked(nextChecked) })))));
};
exports.Default = {
    args: Object.assign({}, baseArgs),
    render: (args) => react_1.default.createElement(StatefulCheckbox, Object.assign({}, args)),
    parameters: {
        docs: {
            source: {
                code: `
import Checkbox from 'core/elements/input/checkbox'

const MyComponent = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox
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
    render: (args) => react_1.default.createElement(StatefulCheckbox, Object.assign({}, args)),
};
exports.Indeterminate = {
    args: Object.assign(Object.assign({}, baseArgs), { indeterminate: true }),
    render: (args) => react_1.default.createElement(StatefulCheckbox, Object.assign({}, args)),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Checkbox_1.default, Object.assign({}, args, { label: "Default", checked: false })),
            react_1.default.createElement(Checkbox_1.default, Object.assign({}, args, { label: "Checked", checked: true })),
            react_1.default.createElement(Checkbox_1.default, Object.assign({}, args, { label: "Disabled", disabled: true, checked: false })),
            react_1.default.createElement(Checkbox_1.default, Object.assign({}, args, { label: "Indeterminate", indeterminate: true, checked: false }))))),
};
//# sourceMappingURL=checkbox.stories.js.map