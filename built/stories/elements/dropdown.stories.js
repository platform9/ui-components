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
exports.Gallery = exports.Searchable = exports.Controlled = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const DropdownButtons_1 = __importDefault(require("src/components/DropdownButtons"));
const dropdown_1 = __importDefault(require("../../elements/dropdown"));
const MultiDropdown_1 = __importDefault(require("../../elements/dropdown/MultiDropdown"));
const containers_1 = require("../containers");
const movies_list_1 = __importDefault(require("../data/movies-list"));
const items = movies_list_1.default.map((movie) => ({
    value: movie,
    key: movie.id,
    label: movie.title,
}));
const dropdownButtons = [
    { label: 'Edit', icon: 'edit' },
    { label: 'Delete', icon: 'trash', disabled: true },
    { label: 'Copy', icon: 'copy' },
];
const meta = {
    title: 'Elements/Dropdown',
    component: dropdown_1.default,
    subcomponents: {
        MultiDropdown: MultiDropdown_1.default,
    },
    argTypes: {
        placeholder: {
            control: { type: 'text' },
            defaultValue: 'Select a movie',
            table: {
                defaultValue: { summary: 'Select a movie' },
                type: { summary: 'string' },
            },
        },
        enableSearch: {
            control: { type: 'boolean' },
            description: 'Defines whether to allow searching items by text',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        noCheckboxes: {
            control: { type: 'boolean' },
            description: 'Defines whether to show checkboxes on a multiselect dropdown',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Defines if you can interact with the dropdown',
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
exports.default = meta;
const baseArgs = {
    placeholder: 'Select a movie',
    enableSearch: false,
    disabled: false,
    loading: false,
};
const ControlledDropdownStory = (args) => {
    const [value, setValue] = (0, react_1.useState)(movies_list_1.default[2]);
    const [multiValue, setMultiValue] = (0, react_1.useState)([movies_list_1.default[0], movies_list_1.default[2], movies_list_1.default[4]]);
    const handleMultiChange = (selectedValues) => {
        const moviesOnly = selectedValues.filter((selected) => typeof selected === 'object' && selected !== null);
        setMultiValue(moviesOnly);
    };
    return (react_1.default.createElement(containers_1.ThemedContainer, null,
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(dropdown_1.default, Object.assign({}, args, { value: value, onChange: setValue, label: "Default", items: items })))),
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(MultiDropdown_1.default, Object.assign({}, args, { value: multiValue, onChange: handleMultiChange, label: "Multi item", items: items }))))));
};
exports.Default = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement(containers_1.ThemedContainer, null,
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(dropdown_1.default, Object.assign({}, args, { label: "Default", items: items })))),
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(MultiDropdown_1.default, Object.assign({}, args, { label: "Multi item", items: items })))),
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(DropdownButtons_1.default, { label: "Dropdown Buttons", buttons: dropdownButtons }))))),
};
exports.Controlled = {
    args: Object.assign({}, baseArgs),
    render: (args) => react_1.default.createElement(ControlledDropdownStory, Object.assign({}, args)),
};
exports.Searchable = {
    args: Object.assign(Object.assign({}, baseArgs), { enableSearch: true }),
    render: (args) => (react_1.default.createElement(containers_1.ThemedContainer, null,
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(dropdown_1.default, Object.assign({}, args, { label: "Searchable", items: items })))))),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement(containers_1.ThemedContainer, null,
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(dropdown_1.default, Object.assign({}, args, { label: "Default", items: items }))),
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(dropdown_1.default, Object.assign({}, args, { label: "Disabled", disabled: true, items: items }))),
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(dropdown_1.default, Object.assign({}, args, { label: "With search", enableSearch: true, items: items })))))),
};
//# sourceMappingURL=dropdown.stories.js.map