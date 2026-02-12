"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const BannerButton_1 = __importDefault(require("../../../components/buttons/BannerButton"));
const meta = {
    title: 'Components/Buttons/BannerButton',
    component: BannerButton_1.default,
    argTypes: {
        children: { control: 'text' },
        onClick: { action: 'clicked' },
    },
};
exports.default = meta;
exports.Default = {
    args: {
        children: 'Banner Action',
    },
};
//# sourceMappingURL=BannerButton.stories.js.map