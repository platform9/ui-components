"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongValues = exports.LeftAlignedKeys = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const DisplayKeyValues_1 = __importDefault(require("../../components/DisplayKeyValues"));
const Text_1 = __importDefault(require("../../elements/Text"));
const meta = {
    title: 'Components/DisplayKeyValues',
    component: DisplayKeyValues_1.default,
    argTypes: {
        keyValuePairs: {
            control: { type: 'object' },
            description: 'Array of { key, value } objects',
        },
        rowSpacing: {
            control: { type: 'number' },
            description: 'Spacing between rows in px',
        },
        alignKeyRight: {
            control: { type: 'boolean' },
            description: 'Align keys to the right',
        },
        limitValueLength: {
            control: { type: 'boolean' },
            description: 'Truncate long values',
        },
    },
};
exports.default = meta;
const baseArgs = {
    keyValuePairs: [
        { key: 'Name', value: 'John Doe' },
        { key: 'Email', value: 'john.doe@example.com' },
        { key: 'Role', value: 'Administrator' },
        { key: 'Status', value: react_1.default.createElement(Text_1.default, { variant: "body2", style: { color: 'green' } }, "Active") },
    ],
    rowSpacing: 12,
    alignKeyRight: true,
};
exports.Default = {
    args: baseArgs,
};
exports.LeftAlignedKeys = {
    args: Object.assign(Object.assign({}, baseArgs), { alignKeyRight: false }),
};
exports.LongValues = {
    args: Object.assign(Object.assign({}, baseArgs), { limitValueLength: true, keyValuePairs: [
            { key: 'Short', value: 'Short value' },
            {
                key: 'Long',
                value: 'This is a very long value that should be truncated because it exceeds the character limit set by the component logic when limitValueLength is true. ' + 'repeat '.repeat(50)
            },
        ] }),
};
//# sourceMappingURL=DisplayKeyValues.stories.js.map