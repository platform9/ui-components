"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultButton = void 0;
const react_1 = __importDefault(require("react"));
const button_1 = __importDefault(require("../../elements/button"));
const Text_1 = __importDefault(require("../../elements/Text"));
const card_1 = __importDefault(require("../../elements/card"));
const containers_1 = require("../containers");
exports.DefaultButton = (args) => (react_1.default.createElement(card_1.default, null,
    react_1.default.createElement(containers_1.Row, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "Primary"),
            react_1.default.createElement(button_1.default, Object.assign({}, args), "Click Me")),
        ' ',
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "Secondary"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { variant: "secondary" }), "Click Me")),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "Tertiary"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { variant: "tertiary" }), "Click Me")),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "CTA"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { variant: "cta" }), "Click Me"))),
    react_1.default.createElement(containers_1.Row, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "Primary Disabled"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { disabled: true }), "Click Me")),
        ' ',
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "Secondary Disabled"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { disabled: true, variant: "secondary" }), "Click Me")),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "Tertiary Disabled"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { disabled: true, variant: "tertiary" }), "Click Me")),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "CTA Disabled"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { disabled: true, variant: "cta" }), "Click Me"))),
    react_1.default.createElement(containers_1.Row, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "Primary Loading"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { loading: true }), "Click Me")),
        ' ',
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "Secondary Loading"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { loading: true, variant: "secondary" }), "Click Me")),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "Tertiary Loading"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { loading: true, variant: "tertiary" }), "Click Me")),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(Text_1.default, { variant: "caption1" }, "CTA Loading"),
            react_1.default.createElement(button_1.default, Object.assign({}, args, { loading: true, variant: "cta" }), "Click Me")))));
exports.DefaultButton.parameters = {
    docs: {
        source: {
            code: `
import Button from 'core/elements/button'

const ButtonGroup = () => (
  <>
    <Button size="large">
      Click Me
    </Button>
    <Button size="large" variant="secondary">
      Click Me
    </Button>
    <Button size="large" variant="secondary">
      Click Me
    </Button>
  </>
)
`,
        },
    },
};
exports.DefaultButton.args = {
    size: 'large',
    variant: 'primary',
};
const ButtonStories = {
    title: 'Elements/Button',
    component: button_1.default,
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'table'],
            control: { type: 'select' },
            description: 'Defines the buttons state',
            table: {
                defaultValue: { summary: 'primary' },
                type: { summary: 'select' },
            },
        },
        size: {
            options: ['small', 'medium', 'large'],
            control: { type: 'select' },
            description: 'Controls the height and font-size of the button',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'select' },
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Defines if you can interact with the button',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        loading: {
            control: { type: 'boolean' },
            description: 'Shows a loading state while working',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
    },
};
exports.default = ButtonStories;
//# sourceMappingURL=button.stories.js.map