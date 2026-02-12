"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsPreview = void 0;
const react_1 = __importStar(require("react"));
const react_router_1 = require("react-router");
const tabs_1 = __importDefault(require("../../elements/tabs"));
const Tab_1 = __importDefault(require("../../elements/tabs/Tab"));
const Text_1 = __importDefault(require("../../elements/Text"));
// import { routes } from '../utils/routes'
const meta = {
    title: 'Elements/Tabs',
    component: tabs_1.default,
    argTypes: {
        activeTab: {
            control: { type: 'text' },
            description: 'Currently active tab value when using controlled tabs',
            table: {
                type: { summary: 'string' },
            },
        },
        previewInHeader: {
            control: { type: 'boolean' },
            description: 'When true, renders tab previews in a header portal',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
    },
};
exports.default = meta;
const StatefulTabs = (args) => {
    const [activeTab, setActiveTab] = (0, react_1.useState)('tab-1');
    return (
    // <Tabs route={routes.notifications.list}>
    react_1.default.createElement(tabs_1.default, Object.assign({ activeTab: activeTab, setActiveTab: setActiveTab }, args),
        react_1.default.createElement(Tab_1.default, { value: "tab-1", label: "Tab 1" },
            react_1.default.createElement(Text_1.default, null, "I am tab 1")),
        react_1.default.createElement(Tab_1.default, { value: "tab-2", label: "Tab 2" },
            react_1.default.createElement(Text_1.default, null, "I am tab 2")),
        react_1.default.createElement(Tab_1.default, { value: "tab-3", label: "Tab 3" },
            react_1.default.createElement(Text_1.default, null, "I am tab 3"))));
};
exports.TabsPreview = {
    render: (args) => (react_1.default.createElement(react_router_1.MemoryRouter, null,
        react_1.default.createElement(StatefulTabs, Object.assign({}, args)))),
    parameters: {
        docs: {
            source: {
                code: `
import Tabs from 'core/elements/tabs'
import Tab from 'core/elements/tabs/tab'

const MyComponent = () => (
  <Tabs>
    <Tab value="tab-1" label="Tab 1">
      <Text>I am tab 1</Text>
    </Tab>
    <Tab value="tab-2" label="Tab 2">
      <Text>I am tab 2</Text>
    </Tab>
    <Tab value="tab-3" label="Tab 3">
      <Text>I am tab 3</Text>
    </Tab>
  </Tabs>
)
`,
            },
        },
    },
};
//# sourceMappingURL=tab.stories.js.map