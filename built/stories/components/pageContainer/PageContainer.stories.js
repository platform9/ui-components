"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithoutFloatingHeader = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const PageContainer_1 = __importDefault(require("../../../components/pageContainer/PageContainer"));
const PageContainerHeader_1 = __importDefault(require("../../../components/pageContainer/PageContainerHeader"));
const Text_1 = __importDefault(require("../../../elements/Text"));
const button_1 = __importDefault(require("../../../elements/button"));
const meta = {
    title: 'Components/PageContainer',
    component: PageContainer_1.default,
    argTypes: {
        header: { control: 'text' },
        floatingHeader: { control: 'boolean' },
    },
};
exports.default = meta;
const baseArgs = {
    header: react_1.default.createElement(Text_1.default, { variant: "h3" }, "Page Title"),
    floatingHeader: true,
    children: react_1.default.createElement("div", null, "Page Content"),
};
const Wrapper = (args) => {
    return (react_1.default.createElement("div", { style: { border: '1px solid #ccc', height: 400, overflow: 'hidden' } },
        react_1.default.createElement(PageContainer_1.default, Object.assign({}, args),
            react_1.default.createElement("div", { style: { padding: 20, backgroundColor: '#f5f5f5', height: '100%' } },
                react_1.default.createElement(Text_1.default, { variant: "body1" }, "This is the page content area."),
                react_1.default.createElement("div", { style: { marginTop: 20 } },
                    react_1.default.createElement(Text_1.default, { variant: "body2" }, "The PageContainerHeader component can be used to portal content into the header area from within the content."),
                    react_1.default.createElement(PageContainerHeader_1.default, null,
                        react_1.default.createElement("div", { style: { display: 'flex', gap: 10 } },
                            react_1.default.createElement(button_1.default, { variant: "secondary" }, "Cancel"),
                            react_1.default.createElement(button_1.default, { variant: "primary" }, "Save"))))))));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.WithoutFloatingHeader = {
    args: Object.assign(Object.assign({}, baseArgs), { floatingHeader: false }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
//# sourceMappingURL=PageContainer.stories.js.map