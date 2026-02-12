"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.WithInfo = exports.Empty = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const MultiValuesField_1 = __importDefault(require("../../elements/MultiValuesField"));
const ValidatedForm_1 = __importDefault(require("../../components/validatedForm/ValidatedForm"));
// Wrapper to provide ValidatedForm context
const FormWrapper = ({ children, initialValues = {} }) => {
    return (react_1.default.createElement(ValidatedForm_1.default, { initialValues: initialValues, onSubmit: (values) => console.log('Submit:', values) }, children));
};
const meta = {
    title: 'Elements/MultiValuesField',
    component: MultiValuesField_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null))),
    ],
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Label for the field',
        },
        addLabel: {
            control: { type: 'text' },
            description: 'Label for the add button',
        },
        placeholderText: {
            control: { type: 'text' },
            description: 'Placeholder text for inputs',
        },
        info: {
            control: { type: 'text' },
            description: 'Tooltip info text',
        },
        id: {
            control: { type: 'text' },
            description: 'Form field ID',
            table: {
                type: { summary: 'string' }
            }
        }
    },
};
exports.default = meta;
const baseArgs = {
    id: 'multi-values-test',
    label: 'Multi Values',
    addLabel: 'Add Value',
    placeholderText: 'Enter value...',
    items: ['Value 1', 'Value 2'],
    onChange: () => { },
};
exports.Default = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement(FormWrapper, null,
        react_1.default.createElement(MultiValuesField_1.default, Object.assign({}, args)))),
};
exports.Empty = {
    args: Object.assign(Object.assign({}, baseArgs), { items: [] }),
    render: (args) => (react_1.default.createElement(FormWrapper, null,
        react_1.default.createElement(MultiValuesField_1.default, Object.assign({}, args)))),
};
exports.WithInfo = {
    args: Object.assign(Object.assign({}, baseArgs), { info: 'This is some helpful information about the field.' }),
    render: (args) => (react_1.default.createElement(FormWrapper, null,
        react_1.default.createElement(MultiValuesField_1.default, Object.assign({}, args)))),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: '20px' } },
        react_1.default.createElement(FormWrapper, null,
            react_1.default.createElement("strong", null, "Default:"),
            react_1.default.createElement(MultiValuesField_1.default, Object.assign({}, args, { id: "gallery-default" }))),
        react_1.default.createElement(FormWrapper, null,
            react_1.default.createElement("strong", null, "With Info Tooltip:"),
            react_1.default.createElement(MultiValuesField_1.default, Object.assign({}, args, { id: "gallery-info", info: "Tooltip info here", label: "Field with Info" }))))),
};
//# sourceMappingURL=MultiValuesField.stories.js.map