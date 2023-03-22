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
const react_1 = __importStar(require("react"));
const use_react_router_1 = __importDefault(require("use-react-router"));
const styles_1 = require("@material-ui/styles");
const TabContext_1 = require("./TabContext");
const TabPreview_1 = __importDefault(require("./TabPreview"));
function Tabs({ route, routeKey = 'tab', activeTab, setActiveTab, onClick, children, previewInHeader, HeaderTitlePortal, }) {
    const { history, match: { params }, } = (0, use_react_router_1.default)();
    const classes = useStyles({ previewInHeader });
    const currentTab = route && routeKey ? params[routeKey] : activeTab;
    const [tabs, setTabs] = (0, react_1.useState)([]);
    const addTab = (0, react_1.useCallback)((tab) => {
        setTabs((tabs) => Array.from(new Set([...tabs, tab])));
    }, [setTabs]);
    const handleClick = (0, react_1.useCallback)((tab) => {
        if (!!onClick) {
            onClick(tab);
        }
        if (route && routeKey) {
            history.push(route.path(Object.assign(Object.assign({}, params), { [routeKey]: tab })));
        }
        else {
            setActiveTab(tab);
        }
    }, [route, routeKey, params, setActiveTab]);
    const providerValue = (0, react_1.useMemo)(() => ({
        activeTab: currentTab,
        addTab,
    }), [currentTab, addTab]);
    const Container = previewInHeader ? HeaderTitlePortal : react_1.default.Fragment;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Container, null,
            react_1.default.createElement("div", { className: classes.tabsPreviewContainer }, tabs.map((tab) => (react_1.default.createElement(TabPreview_1.default, { key: tab.value, value: tab.value, label: tab.label, isActive: currentTab === tab.value, onClick: handleClick }))))),
        react_1.default.createElement(TabContext_1.TabContext.Provider, { value: providerValue }, children)));
}
exports.default = Tabs;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    tabsPreviewContainer: {
        display: 'grid',
        gridAutoFlow: 'column',
        justifyContent: 'start',
        gap: 4,
        borderBottom: `1px solid ${theme.components.tab.border}`,
        marginBottom: ({ previewInHeader }) => (previewInHeader ? 0 : 16),
        marginTop: ({ previewInHeader }) => (previewInHeader ? 16 : 0),
    },
}));
//# sourceMappingURL=Tabs.js.map