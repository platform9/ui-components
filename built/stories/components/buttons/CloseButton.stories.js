"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithLink = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const CloseButton_1 = __importDefault(require("../../../components/buttons/CloseButton"));
const react_router_dom_1 = require("react-router-dom");
const meta = {
    title: 'Components/Buttons/CloseButton',
    component: CloseButton_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null)))
    ],
    argTypes: {
        to: { control: 'text' },
        tooltip: { control: 'text' },
        onClick: { action: 'clicked' },
    },
};
exports.default = meta;
exports.Default = {
    args: {
        onClick: () => console.log('Close clicked')
    },
};
exports.WithLink = {
    args: {
        to: '/home',
        tooltip: 'Go to Home',
    },
};
//# sourceMappingURL=CloseButton.stories.js.map