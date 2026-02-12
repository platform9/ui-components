"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayItems = exports.CustomBody = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const InfoPanel_1 = __importDefault(require("../../components/InfoPanel"));
const Text_1 = __importDefault(require("../../elements/Text"));
const meta = {
    title: 'Components/InfoPanel',
    component: InfoPanel_1.default,
    argTypes: {
        title: {
            control: { type: 'text' },
            description: 'Panel title',
        },
        items: {
            control: { type: 'object' },
            description: 'Items to display (array of props or object)',
        },
    },
};
exports.default = meta;
const baseArgs = {
    title: 'Info Panel',
    items: {
        'Name': { value: 'Cluster-1' },
        'Status': { value: 'Active', helpMessage: 'The cluster is running normally.' },
        'Region': { value: 'US-West' },
        'Version': { value: '1.21.5' },
    },
};
exports.Default = {
    args: baseArgs,
};
exports.CustomBody = {
    args: {
        title: 'Custom Body Panel',
        customBody: (react_1.default.createElement("div", { style: { padding: 16 } },
            react_1.default.createElement(Text_1.default, { variant: "body1" }, "This is a custom body content."),
            react_1.default.createElement(Text_1.default, { variant: "body2" }, "It replaces the default table view.")))
    },
};
exports.ArrayItems = {
    args: {
        title: 'Array Items',
        items: [
            { 'Field A': { value: 'Value A' } },
            { 'Field B': { value: 'Value B', helpMessage: 'Help for B' } }
        ]
    }
};
//# sourceMappingURL=InfoPanel.stories.js.map