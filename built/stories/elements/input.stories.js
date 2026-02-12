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
exports.Password = exports.Disabled = exports.ErrorState = exports.WithInfo = exports.WithIcon = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const Input_1 = __importDefault(require("../../elements/input/Input"));
const useToggler_1 = __importDefault(require("../../hooks/useToggler"));
const meta = {
    title: 'Elements/Input',
    component: Input_1.default,
    argTypes: {
        label: {
            control: 'text',
            description: 'Label for the input',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text',
        },
        value: {
            control: 'text',
            description: 'Input value',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the input',
        },
        error: {
            control: 'text',
            description: 'Error message to display',
        },
        info: {
            control: 'text',
            description: 'Tooltip info text',
        },
        icon: {
            control: 'text',
            description: 'Name of the FontAwesome icon',
        },
        compact: {
            control: 'boolean',
            description: 'Reduces padding/size',
        },
        variant: {
            options: ['light', 'dark'],
            control: { type: 'radio' },
            description: 'Visual variant',
        },
        onChange: { action: 'changed' },
        iconProps: {
            control: 'object',
            description: 'Props for the icon (onClick, placement)',
        },
    },
};
exports.default = meta;
const baseArgs = {
    label: 'Label',
    placeholder: 'Placeholder label',
};
const StatefulInput = (args) => {
    const [value, setValue] = (0, react_1.useState)(args.value || '');
    (0, react_1.useEffect)(() => {
        setValue(args.value || '');
    }, [args.value]);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return react_1.default.createElement(Input_1.default, Object.assign({}, args, { value: value, onChange: handleChange }));
};
const PasswordInputStory = (args) => {
    const [value, setValue] = (0, react_1.useState)('');
    const [isPasswordHidden, toggleIsPasswordHidden] = (0, useToggler_1.default)(true);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const iconProps = {
        onClick: toggleIsPasswordHidden,
        placement: 'end',
    };
    return (react_1.default.createElement(Input_1.default, Object.assign({}, args, { type: isPasswordHidden ? 'password' : 'text', icon: isPasswordHidden ? 'eye' : 'eye-slash', iconProps: iconProps, value: value, onChange: handleChange })));
};
exports.Default = {
    args: Object.assign({}, baseArgs),
    render: (args) => react_1.default.createElement(StatefulInput, Object.assign({}, args)),
};
exports.WithIcon = {
    args: Object.assign(Object.assign({}, baseArgs), { label: 'Search', placeholder: 'Search...', icon: 'search' }),
    render: (args) => react_1.default.createElement(StatefulInput, Object.assign({}, args)),
};
exports.WithInfo = {
    args: Object.assign(Object.assign({}, baseArgs), { label: 'With Info', placeholder: 'Hover the info icon', info: 'This is some helpful information' }),
    render: (args) => react_1.default.createElement(StatefulInput, Object.assign({}, args)),
};
exports.ErrorState = {
    args: Object.assign(Object.assign({}, baseArgs), { label: 'Error', placeholder: 'Invalid input', error: 'This field is required', value: '' }),
    render: (args) => react_1.default.createElement(StatefulInput, Object.assign({}, args)),
};
exports.Disabled = {
    args: Object.assign(Object.assign({}, baseArgs), { label: 'Disabled', placeholder: 'Cannot type here', disabled: true, value: 'Disabled Value' }),
    render: (args) => react_1.default.createElement(StatefulInput, Object.assign({}, args)),
};
exports.Password = {
    args: Object.assign(Object.assign({}, baseArgs), { label: 'Password', placeholder: 'Enter password', info: 'Click the eye icon to toggle visibility' }),
    render: (args) => react_1.default.createElement(PasswordInputStory, Object.assign({}, args)),
};
//# sourceMappingURL=input.stories.js.map