"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMultiToggleSwitch = void 0;
const react_1 = __importDefault(require("react"));
const MultiToggleSwitch_1 = __importDefault(require("../../elements/MultiToggleSwitch"));
const card_1 = __importDefault(require("../../elements/card"));
const containers_1 = require("../containers");
const DefaultMultiToggleSwitch = (args) => {
    return (react_1.default.createElement(card_1.default, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(MultiToggleSwitch_1.default, Object.assign({}, args)))));
};
exports.DefaultMultiToggleSwitch = DefaultMultiToggleSwitch;
exports.DefaultMultiToggleSwitch.parameters = {
    docs: {
        source: {
            code: `
import MultiToggleSwitch from 'core/elements/MultiToggleSwitch'

const MyComponent = () => {
  return (
    <ToggleSwitch
        options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Hourly', value: 'hourly' },
        ]}
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
};
exports.default = ToggleSwitchStories;
//# sourceMappingURL=multiToggleSwitch.stories.js.map