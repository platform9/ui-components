"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotElevated = exports.Elevated = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const ValidatedForm_1 = __importDefault(require("../../../components/validatedForm/ValidatedForm"));
const TextField_1 = __importDefault(require("../../../components/validatedForm/TextField"));
const CheckboxField_1 = __importDefault(require("../../../components/validatedForm/CheckboxField"));
const DropdownField_1 = __importDefault(require("../../../components/validatedForm/DropdownField"));
const ToggleSwitchField_1 = __importDefault(require("../../../components/validatedForm/ToggleSwitchField"));
const button_1 = __importDefault(require("../../../elements/button"));
const AsyncDropdown_1 = __importDefault(require("../../../elements/dropdown/AsyncDropdown"));
const react_router_dom_1 = require("react-router-dom");
// Mocking AsyncDropdown for DropdownField
const MockDropdown = (props) => react_1.default.createElement(AsyncDropdown_1.default, Object.assign({}, props));
const meta = {
    title: 'Components/ValidatedForm/ValidatedForm',
    component: ValidatedForm_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null))),
    ],
    argTypes: {
        title: { control: 'text' },
        clearOnSubmit: { control: 'boolean' },
        debug: { control: 'boolean' },
        elevated: { control: 'boolean' },
    },
};
exports.default = meta;
const initialValues = {
    username: '',
    email: '',
    role: 'user',
    terms: false,
    notifications: true,
};
const Wrapper = (args) => {
    return (react_1.default.createElement(ValidatedForm_1.default, Object.assign({}, args, { onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            return Promise.resolve(true);
        }, formActions: react_1.default.createElement(button_1.default, { type: "submit", variant: "primary" }, "Submit") }),
        react_1.default.createElement(TextField_1.default, { id: "username", label: "Username", required: true }),
        react_1.default.createElement(TextField_1.default, { id: "email", label: "Email", type: "email", required: true }),
        react_1.default.createElement(DropdownField_1.default, { id: "role", label: "Role", DropdownComponent: MockDropdown, items: [
                { label: 'User', value: 'user' },
                { label: 'Admin', value: 'admin' },
            ] }),
        react_1.default.createElement(ToggleSwitchField_1.default, { id: "notifications", label: "Enable Notifications" }),
        react_1.default.createElement(CheckboxField_1.default, { id: "terms", label: "I agree to the terms", required: true })));
};
exports.Default = {
    args: {
        initialValues: initialValues,
        title: 'User Registration',
    },
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.Elevated = {
    args: {
        initialValues: initialValues,
        title: 'Elevated Form',
        elevated: true,
    },
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.NotElevated = {
    args: {
        initialValues: initialValues,
        title: 'Flat Form',
        elevated: false,
    },
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
//# sourceMappingURL=ValidatedForm.stories.js.map