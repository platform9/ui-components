"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.ReadOnly = exports.Large = exports.Small = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const Avatar_1 = __importDefault(require("../../components/Avatar"));
const meta = {
    title: 'Components/Avatar',
    component: Avatar_1.default,
    argTypes: {
        displayName: {
            control: { type: 'text' },
            description: 'Name to derive initials from',
        },
        diameter: {
            control: { type: 'number' },
            description: 'Diameter of the avatar circle in pixels',
        },
        fontSize: {
            control: { type: 'number' },
            description: 'Font size of initials',
        },
        onClick: { action: 'clicked' },
    },
};
exports.default = meta;
const baseArgs = {
    displayName: 'John Doe',
    diameter: 48,
    fontSize: 18,
};
exports.Default = {
    args: baseArgs,
};
exports.Small = {
    args: Object.assign(Object.assign({}, baseArgs), { diameter: 32, fontSize: 12 }),
};
exports.Large = {
    args: Object.assign(Object.assign({}, baseArgs), { diameter: 80, fontSize: 32 }),
};
exports.ReadOnly = {
    args: Object.assign(Object.assign({}, baseArgs), { onClick: undefined }),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'flex', gap: '20px', alignItems: 'center' } },
        react_1.default.createElement(Avatar_1.default, Object.assign({}, args, { displayName: "Admin User" })),
        react_1.default.createElement(Avatar_1.default, Object.assign({}, args, { displayName: "Guest", diameter: 32, fontSize: 12 })),
        react_1.default.createElement(Avatar_1.default, Object.assign({}, args, { displayName: "Super User", diameter: 64, fontSize: 24 })),
        react_1.default.createElement(Avatar_1.default, Object.assign({}, args, { displayName: "Read Only", onClick: undefined })))),
};
//# sourceMappingURL=Avatar.stories.js.map