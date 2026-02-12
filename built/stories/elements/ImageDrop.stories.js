"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.WithImage = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ImageDrop_1 = __importDefault(require("../../elements/ImageDrop"));
const ValidatedForm_1 = __importDefault(require("../../components/validatedForm/ValidatedForm"));
// Wrapper to provide ValidatedForm context
const FormWrapper = ({ children, initialValues = {} }) => {
    return (react_1.default.createElement(ValidatedForm_1.default, { initialValues: initialValues, onSubmit: (values) => console.log('Submit:', values) }, children));
};
const meta = {
    title: 'Elements/ImageDrop',
    component: ImageDrop_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null))),
    ],
    argTypes: {
        id: {
            control: { type: 'text' },
            description: 'Form field ID',
            table: {
                type: { summary: 'string' },
            },
        },
        imageUpdater: {
            action: 'imageUpdated',
            description: 'Callback with base64 image data'
        },
        onChange: {
            action: 'changed',
            description: 'Callback with file object'
        }
    },
};
exports.default = meta;
const baseArgs = {
    id: 'image-drop-test',
    onChange: () => { },
    imageUpdater: () => { },
};
exports.Default = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement(FormWrapper, null,
        react_1.default.createElement(ImageDrop_1.default, Object.assign({}, args)))),
};
exports.WithImage = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement(FormWrapper, { initialValues: { 'image-drop-test': 'initial-value' } },
        react_1.default.createElement("div", { style: { marginBottom: 10 } }, "Note: Preview relies on `imageData` prop (base64 string)."),
        react_1.default.createElement(ImageDrop_1.default, Object.assign({}, args, { imageData: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" })))),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: '20px' } },
        react_1.default.createElement(FormWrapper, null,
            react_1.default.createElement("strong", null, "Default State:"),
            react_1.default.createElement(ImageDrop_1.default, Object.assign({}, args, { id: "gallery-default" }))),
        react_1.default.createElement(FormWrapper, null,
            react_1.default.createElement("strong", null, "With Existing Image:"),
            react_1.default.createElement(ImageDrop_1.default, Object.assign({}, args, { id: "gallery-with-image", imageData: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" }))),
        react_1.default.createElement(FormWrapper, null,
            react_1.default.createElement("strong", null, "With Error (Simulated):"),
            react_1.default.createElement(ImageDrop_1.default, Object.assign({}, args, { id: "gallery-error", hasError: true, errorMessage: "Image is required" }))))),
};
//# sourceMappingURL=ImageDrop.stories.js.map