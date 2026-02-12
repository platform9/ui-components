"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoImage = exports.Inline = exports.Overlay = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const Progress_1 = __importDefault(require("../../../components/progress/Progress"));
const Text_1 = __importDefault(require("../../../elements/Text"));
const button_1 = __importDefault(require("../../../elements/button"));
const constants_1 = require("../../../constants");
const meta = {
    title: 'Components/Progress/Progress',
    component: Progress_1.default,
    argTypes: {
        loading: { control: 'boolean' },
        overlay: { control: 'boolean' },
        inline: { control: 'boolean' },
        message: { control: 'text' },
        loadingImageHeight: { control: 'number' },
        renderContentOnMount: { control: 'boolean' },
        renderLoadingImage: { control: 'boolean' },
        loadingImage: {
            control: { type: 'select' },
            options: Object.values(constants_1.LoadingGifs),
        },
    },
};
exports.default = meta;
const baseArgs = {
    loading: true,
    message: 'Loading Data...',
};
const Content = () => (react_1.default.createElement("div", { style: { padding: 20, border: '1px solid #ccc', borderRadius: 4 } },
    react_1.default.createElement(Text_1.default, { variant: "subtitle2" }, "Content Title"),
    react_1.default.createElement(Text_1.default, { variant: "body1" }, "This is the content that is being protected by the progress loader."),
    react_1.default.createElement("div", { style: { marginTop: 10 } },
        react_1.default.createElement(button_1.default, null, "Action"))));
exports.Default = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement(Progress_1.default, Object.assign({}, args),
        react_1.default.createElement(Content, null)))
};
exports.Overlay = {
    args: Object.assign(Object.assign({}, baseArgs), { overlay: true }),
    render: (args) => (react_1.default.createElement(Progress_1.default, Object.assign({}, args),
        react_1.default.createElement(Content, null)))
};
exports.Inline = {
    args: Object.assign(Object.assign({}, baseArgs), { inline: true, message: 'Saving...' }),
    render: (args) => (react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
        react_1.default.createElement(Text_1.default, { variant: "body1", style: { marginRight: 10 } }, "Status:"),
        react_1.default.createElement(Progress_1.default, Object.assign({}, args))))
};
exports.NoImage = {
    args: Object.assign(Object.assign({}, baseArgs), { renderLoadingImage: false, message: 'Just Text Loading...' }),
    render: (args) => (react_1.default.createElement(Progress_1.default, Object.assign({}, args),
        react_1.default.createElement(Content, null)))
};
//# sourceMappingURL=Progress.stories.js.map