"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.CustomBodyAndFooter = exports.WithCustomHeader = exports.WithFooter = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const Card_1 = __importDefault(require("../../elements/card/Card"));
const CardBody_1 = __importDefault(require("../../elements/card/CardBody"));
const CardFooter_1 = __importDefault(require("../../elements/card/CardFooter"));
const CardHeader_1 = __importDefault(require("../../elements/card/CardHeader"));
const CardHeaderWithLink_1 = __importDefault(require("../../elements/card/CardHeaderWithLink"));
const Button_1 = __importDefault(require("../../elements/button/Button"));
const meta = {
    title: 'Elements/Card',
    component: Card_1.default,
    subcomponents: { CardBody: CardBody_1.default, CardFooter: CardFooter_1.default, CardHeader: CardHeader_1.default, CardHeaderWithLink: CardHeaderWithLink_1.default },
    argTypes: {
        title: {
            control: { type: 'text' },
            description: 'Card title (string or ReactNode)',
        },
        footer: {
            control: { type: 'text' },
            description: 'Card footer content',
        },
        withCustomBody: {
            control: { type: 'boolean' },
            description: 'If true, renders children without wrapping in CardBody',
            table: { defaultValue: { summary: false } },
        },
        withCustomFooter: {
            control: { type: 'boolean' },
            description: 'If true, renders footer without wrapping in CardFooter',
            table: { defaultValue: { summary: false } },
        },
    },
};
exports.default = meta;
const baseArgs = {
    title: 'Card Title',
    children: 'Card content goes here. This is wrapped in CardBody by default.',
};
exports.Default = {
    args: baseArgs,
};
exports.WithFooter = {
    args: Object.assign(Object.assign({}, baseArgs), { footer: 'Card Footer Content' }),
};
exports.WithCustomHeader = {
    args: Object.assign(Object.assign({}, baseArgs), { title: (react_1.default.createElement(CardHeaderWithLink_1.default, { linkComponent: react_1.default.createElement(Button_1.default, { variant: "secondary" }, "Action") }, "Custom Header")) }),
};
exports.CustomBodyAndFooter = {
    args: {
        title: 'Custom Body & Footer',
        withCustomBody: true,
        withCustomFooter: true,
        footer: react_1.default.createElement("div", { style: { padding: 10, background: '#eee' } }, "Custom Footer Div"),
        children: react_1.default.createElement("div", { style: { padding: 10, background: '#f9f9f9' } }, "Custom Body Content"),
    },
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: '20px', maxWidth: '600px' } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Default:"),
            react_1.default.createElement(Card_1.default, Object.assign({}, args))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "With Footer:"),
            react_1.default.createElement(Card_1.default, Object.assign({}, args, { footer: "Footer Content" }))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Custom Header with Link:"),
            react_1.default.createElement(Card_1.default, { title: react_1.default.createElement(CardHeaderWithLink_1.default, { linkComponent: react_1.default.createElement(Button_1.default, { size: "small" }, "Edit") }, "User Profile") },
                react_1.default.createElement("p", null, "User details..."))))),
};
//# sourceMappingURL=Card.stories.js.map