"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.WithTooltip = exports.WithRightIcon = exports.WithLeftIcon = exports.Loading = exports.Disabled = exports.CTA = exports.Tertiary = exports.Secondary = exports.Primary = void 0;
const react_1 = __importDefault(require("react"));
const button_1 = __importDefault(require("../../elements/button"));
const STATES = [
    { label: 'Default', props: {} },
    { label: 'Disabled', props: { disabled: true } },
    { label: 'Loading', props: { loading: true } },
];
const PROP_VARIATIONS = [
    { label: 'Base', props: {} },
    { label: 'With left icon', props: { icon: 'plus' } },
    { label: 'With right icon', props: { rightIcon: 'angle-right' } },
    { label: 'With tooltip', props: { info: 'Tooltip text' } },
];
const renderStates = (baseArgs) => PROP_VARIATIONS.map((variation) => (react_1.default.createElement("div", { key: variation.label, style: { marginBottom: 16 } },
    react_1.default.createElement("div", { style: { marginBottom: 4, fontWeight: 600 } }, variation.label),
    STATES.map((state) => (react_1.default.createElement("div", { key: state.label, style: { marginBottom: 4 } },
        react_1.default.createElement("span", { style: { marginRight: 8 } }, state.label),
        react_1.default.createElement(button_1.default, Object.assign({}, baseArgs, variation.props, state.props), baseArgs.children)))))));
const meta = {
    title: 'Elements/Button',
    component: button_1.default,
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'tertiary', 'cta'],
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
        children: {
            control: { type: 'text' },
            description: 'Button label content',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        icon: {
            control: { type: 'text' },
            description: 'FontAwesome icon shown on the left',
            table: {
                type: { summary: 'string' },
            },
        },
        rightIcon: {
            control: { type: 'text' },
            description: 'FontAwesome icon shown on the right',
            table: {
                type: { summary: 'string' },
            },
        },
        info: {
            control: { type: 'text' },
            description: 'Tooltip content displayed on hover',
            table: {
                type: { summary: 'string | ReactNode' },
            },
        },
        solidIcon: {
            control: { type: 'boolean' },
            description: 'Whether the icon uses the solid style',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        iconBrand: {
            control: { type: 'boolean' },
            description: 'Whether the icon uses the brand style',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler for the button',
            table: {
                type: { summary: '(event) => void' },
            },
        },
    },
};
exports.default = meta;
const baseArgs = {
    size: 'large',
    variant: 'primary',
    children: 'Click Me',
    disabled: false,
    loading: false,
};
exports.Primary = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'primary' }),
};
exports.Secondary = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'secondary' }),
};
exports.Tertiary = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'tertiary' }),
};
exports.CTA = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'cta' }),
};
exports.Disabled = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'primary', disabled: true }),
};
exports.Loading = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'primary', loading: true }),
};
exports.WithLeftIcon = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'primary', icon: 'plus' }),
};
exports.WithRightIcon = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'primary', rightIcon: 'angle-right' }),
};
exports.WithTooltip = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'primary', info: 'Tooltip text' }),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => react_1.default.createElement(react_1.default.Fragment, null, renderStates(args)),
};
//# sourceMappingURL=button.stories.js.map