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
exports.DefaultCheckbox = void 0;
const react_1 = __importStar(require("react"));
const Checkbox_1 = __importDefault(require("../../elements/input/Checkbox"));
const card_1 = __importDefault(require("../../elements/card"));
const containers_1 = require("../containers");
const DefaultCheckbox = (args) => {
    const [checked, setChecked] = (0, react_1.useState)(false);
    return (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Checkbox_1.default, Object.assign({}, args, { checked: checked || args.checked, label: "Text Here", onChange: (checked) => setChecked(checked) })))));
};
exports.DefaultCheckbox = DefaultCheckbox;
exports.DefaultCheckbox.parameters = {
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
};
exports.DefaultCheckbox.args = {
    checked: false,
    disabled: false,
    indeterminate: false,
};
const CheckboxStories = {
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
    },
};
exports.default = CheckboxStories;
//# sourceMappingURL=checkbox.stories.js.map