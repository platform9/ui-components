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
exports.DefaultMultiToggleSwitch = void 0;
const react_1 = __importStar(require("react"));
const MultiToggleSwitch_1 = __importDefault(require("../../elements/MultiToggleSwitch"));
const card_1 = __importDefault(require("../../elements/card"));
const containers_1 = require("../containers");
const DefaultMultiToggleSwitch = (args) => {
    const [activeOption, setActiveOption] = (0, react_1.useState)('monthly');
    return (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(MultiToggleSwitch_1.default, Object.assign({}, args, { value: args.value || activeOption, onClick: (value) => setActiveOption(value) })))));
};
exports.DefaultMultiToggleSwitch = DefaultMultiToggleSwitch;
exports.DefaultMultiToggleSwitch.parameters = {
    docs: {
        source: {
            code: `
import MultiToggleSwitch from 'core/elements/MultiToggleSwitch'

const MyComponent = () => {

  const [activeOption, setActiveOption] = useState('monthly')

  return (
    <MultiToggleSwitch
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Hourly', value: 'hourly' },
          ]}
          value={activeOption}
          onClick={(value) => setActiveOption(value)}
          activeOptionColor='#00abe8'
        />
  )
}
`,
        },
    },
};
exports.DefaultMultiToggleSwitch.args = {
    options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Hourly', value: 'hourly' },
    ],
    activeOptionColor: '#00abe8',
};
const ToggleSwitchStories = {
    title: 'Elements/MultiToggleSwitch',
    component: MultiToggleSwitch_1.default,
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Defines the active value',
            table: {
                defaultValue: { summary: 'monthly' },
                type: { summary: 'text' },
            },
        },
    },
};
exports.default = ToggleSwitchStories;
//# sourceMappingURL=multiToggleSwitch.stories.js.map