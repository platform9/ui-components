"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsPreview = void 0;
const react_1 = __importDefault(require("react"));
const tabs_1 = __importDefault(require("../../elements/tabs"));
const Tab_1 = __importDefault(require("../../elements/tabs/Tab"));
const Text_1 = __importDefault(require("../../elements/Text"));
// import { routes } from '../utils/routes'
const TabsPreview = (args) => (
// <Tabs route={routes.notifications.list}>
react_1.default.createElement(tabs_1.default, { activeTab: "tab-1" },
    react_1.default.createElement(Tab_1.default, { value: "tab-1", label: "Tab 1" },
        react_1.default.createElement(Text_1.default, null, "I am tab 1")),
    react_1.default.createElement(Tab_1.default, { value: "tab-2", label: "Tab 2" },
        react_1.default.createElement(Text_1.default, null, "I am tab 2")),
    react_1.default.createElement(Tab_1.default, { value: "tab-3", label: "Tab 3" },
        react_1.default.createElement(Text_1.default, null, "I am tab 3"))));
exports.TabsPreview = TabsPreview;
exports.TabsPreview.parameters = {
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
};
exports.TabsPreview.args = {
    variant: 'light',
};
const TabStories = {
    title: 'Elements/Tabs',
    component: tabs_1.default,
    argTypes: {
        variant: {
            options: ['light', 'dark'],
            control: { type: 'select' },
            description: 'Theme to render the button under',
            table: {
                defaultValue: { summary: 'light' },
                type: { summary: 'select' },
            },
        },
    },
};
exports.default = TabStories;
//# sourceMappingURL=tab.stories.js.map