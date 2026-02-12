"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.WithTooltip = exports.TruncatedText = exports.WithAdditionalText = exports.Primary = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = __importDefault(require("../../elements/card"));
const badge_1 = __importDefault(require("../../elements/badge"));
const containers_1 = require("../containers");
const VARIANT_ITEMS = [
    { label: 'Default', variant: 'default' },
    { label: 'Primary', variant: 'primary' },
    { label: 'Secondary', variant: 'secondary' },
    { label: 'Success', variant: 'success' },
    { label: 'Warning', variant: 'warning' },
    { label: 'Unknown', variant: 'unknown' },
    { label: 'Danger', variant: 'danger' },
    { label: 'Error', variant: 'error' },
];
const renderGallery = (baseArgs) => (react_1.default.createElement(card_1.default, null,
    react_1.default.createElement(containers_1.Row, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, Object.assign({}, baseArgs, { variant: "default", text: "label=annotation", bold: false }))),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, Object.assign({}, baseArgs, { variant: "primary", text: "Beta Tester" }))),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, Object.assign({}, baseArgs, { variant: "secondary", text: "Early Access" }))),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, Object.assign({}, baseArgs, { variant: "success", text: "Running" }))),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, Object.assign({}, baseArgs, { variant: "warning", text: "Warning" }))),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, Object.assign({}, baseArgs, { variant: "unknown", text: "Pending" }))),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, Object.assign({}, baseArgs, { variant: "danger", text: "Danger" }))),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, Object.assign({}, baseArgs, { variant: "error", text: "Error" }))))));
const meta = {
    title: 'Elements/Badge',
    component: badge_1.default,
    argTypes: {
        text: {
            control: { type: 'text' },
            description: 'Primary badge label text',
            table: {
                type: { summary: 'string' },
            },
        },
        additionalText: {
            control: { type: 'text' },
            description: 'Optional additional text segment appended to the badge',
            table: {
                type: { summary: 'string' },
            },
        },
        variant: {
            options: [
                'default',
                'primary',
                'secondary',
                'success',
                'warning',
                'unknown',
                'danger',
                'error',
            ],
            control: { type: 'select' },
            description: 'Defines the badges primary color',
            table: {
                defaultValue: { summary: 'default' },
                type: { summary: 'select' },
            },
        },
        ellipsisAt: {
            control: { type: 'number' },
            description: 'Character count at which the label is truncated with an ellipsis',
            table: {
                defaultValue: { summary: 15 },
                type: { summary: 'number' },
            },
        },
        canDismissEllipsis: {
            control: { type: 'boolean' },
            description: 'Allows users to toggle between truncated and full text',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        bold: {
            control: { type: 'boolean' },
            description: 'Renders the text using the bold caption style when true',
            table: {
                defaultValue: { summary: true },
                type: { summary: 'boolean' },
            },
        },
        tooltipBody: {
            control: { type: 'text' },
            description: 'Tooltip content to display on hover. Defaults to the badge text.',
            table: {
                type: { summary: 'string | ReactNode' },
            },
        },
    },
};
exports.default = meta;
const baseArgs = {
    text: 'label=annotation',
    variant: 'default',
    bold: false,
    ellipsisAt: 15,
    canDismissEllipsis: false,
};
exports.Default = {
    args: Object.assign({}, baseArgs),
};
exports.Primary = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'primary', text: 'Beta Tester' }),
};
exports.WithAdditionalText = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'primary', text: 'Version', additionalText: '1.2.3' }),
};
exports.TruncatedText = {
    args: Object.assign(Object.assign({}, baseArgs), { text: 'This is a very long label that will be truncated with an ellipsis', ellipsisAt: 20, canDismissEllipsis: true }),
};
exports.WithTooltip = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'success', text: 'Hover for details', tooltipBody: 'This badge includes a custom tooltip body.' }),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => renderGallery(args),
    parameters: {
        docs: {
            source: {
                code: `
import Badge from 'core/elements/badge'

const BadgeGroup = () => (
  <>
    <Badge variant="success" text="Success" />
    <Badge variant="error" text="Error" />
    <Badge variant="default" text="label=annotation"/>
  </>
)
`,
            },
        },
    },
};
//# sourceMappingURL=badge.stories.js.map