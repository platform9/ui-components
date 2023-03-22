"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultBadge = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = __importDefault(require("../../elements/card"));
const badge_1 = __importDefault(require("../../elements/badge"));
const containers_1 = require("../containers");
exports.DefaultBadge = (args) => (react_1.default.createElement(card_1.default, null,
    react_1.default.createElement(containers_1.Row, null,
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, { variant: "default", text: "label=annotation", bold: false })),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, { variant: "primary", text: "Beta Tester" })),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, { variant: "secondary", text: "Early Access" })),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, { variant: "success", text: "Running" })),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, { variant: "warning", text: "Warning" })),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, { variant: "unknown", text: "Pending" })),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, { variant: "danger", text: "Danger" })),
        react_1.default.createElement(containers_1.Column, null,
            react_1.default.createElement(badge_1.default, { variant: "error", text: "Error" })))));
exports.DefaultBadge.parameters = {
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
};
exports.DefaultBadge.args = {
    variant: 'default',
};
const BadgeStories = {
    title: 'Elements/Badge',
    component: badge_1.default,
    argTypes: {
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
    },
};
exports.default = BadgeStories;
//# sourceMappingURL=badge.stories.js.map