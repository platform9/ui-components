"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const RefreshButton_1 = __importDefault(require("../../../components/buttons/RefreshButton"));
const meta = {
    title: 'Components/Buttons/RefreshButton',
    component: RefreshButton_1.default,
    argTypes: {
        onRefresh: { action: 'refreshed' },
    },
};
exports.default = meta;
exports.Default = {
    args: {},
};
//# sourceMappingURL=RefreshButton.stories.js.map