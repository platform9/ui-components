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
exports.Gallery = exports.CustomColors = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const MultiToggleSwitch_1 = __importDefault(require("../../elements/MultiToggleSwitch"));
const card_1 = __importDefault(require("../../elements/card"));
const containers_1 = require("../containers");
const meta = {
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
        options: {
            control: { type: 'object' },
            description: 'Available options to toggle between',
            table: {
                type: { summary: 'Array<{ label: string; value: unknown }>' },
            },
        },
        activeOptionColor: {
            control: { type: 'color' },
            description: 'Background color for the active option',
            table: {
                defaultValue: { summary: '#00abe8' },
                type: { summary: 'string' },
            },
        },
    },
};
exports.default = meta;
const baseArgs = {
    options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Hourly', value: 'hourly' },
    ],
    activeOptionColor: '#00abe8',
};
const StatefulMultiToggle = (args) => {
    const [activeOption, setActiveOption] = (0, react_1.useState)('monthly');
    return (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(MultiToggleSwitch_1.default, Object.assign({}, args, { value: args.value || activeOption, onClick: (value) => setActiveOption(value) })))));
};
exports.Default = {
    args: Object.assign({}, baseArgs),
    render: (args) => react_1.default.createElement(StatefulMultiToggle, Object.assign({}, args)),
    parameters: {
        docs: {
            source: {
                code: `
import MultiToggleSwitch from 'core/elements/MultiToggleSwitch'

const MyComponent = () => {

  const [activeOption, setActiveOption] = useState('monthly')

  return (
    <MultiToggleSwitch
          options=[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Hourly', value: 'hourly' },
          ]
          value={activeOption}
          onClick={(value) => setActiveOption(value)}
          activeOptionColor='#00abe8'
        />
  )
}
`,
            },
        },
    },
};
exports.CustomColors = {
    args: Object.assign(Object.assign({}, baseArgs), { activeOptionColor: '#ff6400' }),
    render: (args) => react_1.default.createElement(StatefulMultiToggle, Object.assign({}, args)),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(MultiToggleSwitch_1.default, { options: baseArgs.options, value: "monthly", activeOptionColor: baseArgs.activeOptionColor, onClick: () => { } }),
            react_1.default.createElement(MultiToggleSwitch_1.default, { options: [
                    { label: 'Day', value: 'day' },
                    { label: 'Week', value: 'week' },
                    { label: 'Month', value: 'month' },
                ], value: "day", activeOptionColor: baseArgs.activeOptionColor, onClick: () => { } })))),
};
//# sourceMappingURL=multiToggleSwitch.stories.js.map