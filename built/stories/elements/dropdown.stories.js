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
exports.ControlledDropdown = exports.DefaultDropdown = void 0;
const react_1 = __importStar(require("react"));
const dropdown_1 = __importDefault(require("../../elements/dropdown"));
const movies_list_1 = __importDefault(require("../data/movies-list"));
const containers_1 = require("../containers");
const MultiDropdown_1 = __importDefault(require("../../elements/dropdown/MultiDropdown"));
const items = movies_list_1.default.map((movie) => ({
    value: movie,
    key: movie.id,
    label: movie.title,
}));
const DefaultDropdown = (args) => {
    return (react_1.default.createElement(containers_1.ThemedContainer, null,
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(dropdown_1.default, Object.assign({}, args, { label: "Default", items: items })))),
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(MultiDropdown_1.default, Object.assign({}, args, { label: "Multi item", items: items }))))));
};
exports.DefaultDropdown = DefaultDropdown;
const ControlledDropdown = (args) => {
    const [value, setValue] = (0, react_1.useState)(movies_list_1.default[2]);
    const [multiValue, setMultiValue] = (0, react_1.useState)([movies_list_1.default[0], movies_list_1.default[2], movies_list_1.default[4]]);
    return (react_1.default.createElement(containers_1.ThemedContainer, null,
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(dropdown_1.default, Object.assign({}, args, { value: value, onChange: setValue, label: "Default", items: items })))),
        react_1.default.createElement(containers_1.Row, null,
            react_1.default.createElement(containers_1.Column, null,
                react_1.default.createElement(MultiDropdown_1.default, Object.assign({}, args, { values: multiValue, onChange: setMultiValue, label: "Multi item", items: items }))))));
};
exports.ControlledDropdown = ControlledDropdown;
exports.default = {
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
                defaultValue: { summary: 'Default Dropdown' },
                type: { summary: 'string' },
            },
        },
        enableSearch: {
            description: 'Defines wether to allow searching items by text',
            defaultValue: false,
        },
        noCheckboxes: {
            description: 'Defines wether to show checkboxes on a multiselect dropdown',
            defaultValue: false,
        },
        disabled: {
            description: 'Defines if you can interact with the dropdown',
            defaultValue: false,
        },
        loading: {
            description: 'Shows a loading state while working',
            defaultValue: false,
        },
    },
};
//# sourceMappingURL=dropdown.stories.js.map