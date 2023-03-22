"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordInput = exports.DefaultInput = void 0;
const react_1 = __importStar(require("react"));
const Input_1 = __importDefault(require("../../elements/input/Input"));
const containers_1 = require("../containers");
const useToggler_1 = __importDefault(require("../../hooks/useToggler"));
exports.DefaultInput = (args) => {
    const [value, setValue] = react_1.useState('');
    const updateValue = (event) => {
        const value = event.target.value;
        setValue(value);
    };
    return (react_1.default.createElement(containers_1.Container, null,
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, { padding: "20px 0px", variant: "card" },
                react_1.default.createElement(Input_1.default, Object.assign({}, args, { label: "Label", placeholder: "Placeholder label", icon: "search", info: "This is the help message", value: value, onChange: updateValue }))),
            react_1.default.createElement(containers_1.Column, { padding: "20px 0px", variant: "frame" },
                react_1.default.createElement(Input_1.default, Object.assign({}, args, { label: "Label", placeholder: "Placeholder label", icon: "search", info: "This is the help message", value: "" })))),
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, { variant: "card" },
                react_1.default.createElement(Input_1.default, Object.assign({}, args, { label: "Error", placeholder: "Placeholder label", icon: "search", info: "This is the help message", error: "Field is required.", value: "" }))),
            react_1.default.createElement(containers_1.Column, { variant: "frame" },
                react_1.default.createElement(Input_1.default, Object.assign({}, args, { label: "Error", placeholder: "Placeholder label", icon: "search", info: "This is the help message", error: "Invalid value", value: "Oops this is a bad value" })))),
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, { padding: "20px 0px 40px 0px", variant: "card" },
                react_1.default.createElement(Input_1.default, Object.assign({}, args, { label: "Disabled", placeholder: "Placeholder label", icon: "search", info: "This is the help message", disabled: true, value: "" }))),
            react_1.default.createElement(containers_1.Column, { padding: "20px 0px 40px 0px", variant: "frame" },
                react_1.default.createElement(Input_1.default, Object.assign({}, args, { label: "Disabled", placeholder: "Placeholder label", icon: "search", info: "This is the help message", disabled: true, value: "Disabled with a value" }))))));
};
exports.DefaultInput.parameters = {
    docs: {
        source: {
            code: `
import Input from 'core/elements/input'

const MyComponent = () => {
  const [value, setValue] = useState(false)
  return (
    <Input
      label="Label"
      value={value}
      onChange={(val) => setValue(val)}
    />
  )
}
`,
        },
    },
};
exports.DefaultInput.args = {
    disabled: false,
};
exports.PasswordInput = (args) => {
    const [value, setValue] = react_1.useState('');
    const updateValue = (event) => {
        const value = event.target.value;
        setValue(value);
    };
    const [isPasswordHidden, toggleIsPasswordHidden] = useToggler_1.default(true);
    const handleIconClick = () => {
        toggleIsPasswordHidden();
    };
    const iconProps = {
        onClick: handleIconClick,
        placement: 'end',
    };
    return (react_1.default.createElement(containers_1.Container, null,
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, { padding: "20px 0px 40px 0px", variant: "card" },
                react_1.default.createElement(Input_1.default, Object.assign({}, args, { label: "Password", placeholder: "Your Password", type: isPasswordHidden ? 'password' : 'text', icon: isPasswordHidden ? 'eye' : 'eye-slash', iconProps: iconProps, info: "Please enter your current password. If you've forgotten it, try forgot password.", value: value, onChange: updateValue }))),
            react_1.default.createElement(containers_1.Column, { padding: "20px 0px 40px 0px", variant: "frame" },
                react_1.default.createElement(Input_1.default, Object.assign({}, args, { label: "Password", placeholder: "Your Password", type: isPasswordHidden ? 'password' : 'text', icon: isPasswordHidden ? 'eye' : 'eye-slash', iconProps: iconProps, info: "Please enter your current password. If you've forgotten it, try forgot password.", value: value, onChange: updateValue }))))));
};
exports.PasswordInput.args = {
    disabled: false,
};
const InputStories = {
    title: 'Elements/Input',
    component: Input_1.default,
    argTypes: {
        disabled: {
            control: { type: 'boolean' },
            description: 'Defines the disabled state of the input',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
    },
};
exports.default = InputStories;
//# sourceMappingURL=input.stories.js.map