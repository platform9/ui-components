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
exports.WithSorting = exports.Empty = exports.Loading = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const CardTable_1 = __importDefault(require("../../../components/cardTable/CardTable"));
const card_1 = __importDefault(require("../../../elements/card"));
const Text_1 = __importDefault(require("../../../elements/Text"));
const react_router_dom_1 = require("react-router-dom");
const meta = {
    title: 'Components/CardTable/CardTable',
    component: CardTable_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null))),
    ],
    argTypes: {
        data: { control: 'object' },
        searchTarget: { control: 'text' },
        loading: { control: 'boolean' },
        loadingMessage: { control: 'text' },
        emptyItemsMessage: { control: 'text' },
        showSortOption: { control: 'boolean' },
        sortBy: {
            control: { type: 'select' },
            options: ['asc', 'desc'],
        },
        sortTarget: { control: 'text' },
        onSortChange: { action: 'sortChanged' },
        handleRefresh: { action: 'refreshed' },
    },
};
exports.default = meta;
const mockData = [
    { id: 1, name: 'Cluster Alpha', region: 'us-west-1', status: 'Active' },
    { id: 2, name: 'Cluster Beta', region: 'us-east-1', status: 'Provisioning' },
    { id: 3, name: 'Cluster Gamma', region: 'eu-central-1', status: 'Error' },
    { id: 4, name: 'Cluster Delta', region: 'us-west-2', status: 'Active' },
    { id: 5, name: 'Cluster Epsilon', region: 'ap-northeast-1', status: 'Active' },
];
const baseArgs = {
    data: mockData,
    searchTarget: 'name',
    loading: false,
    handleRefresh: () => console.log('Refresh clicked'),
    children: (item) => (react_1.default.createElement("div", { key: item.id, style: { width: 368, height: 200 } },
        react_1.default.createElement(card_1.default, { title: item.name },
            react_1.default.createElement("div", { style: { padding: 16 } },
                react_1.default.createElement(Text_1.default, { variant: "body1" },
                    "Region: ",
                    item.region),
                react_1.default.createElement(Text_1.default, { variant: "body2" },
                    "Status: ",
                    item.status))))),
    emptyItemsMessage: 'No items found',
};
const Wrapper = (args) => {
    const [sortBy, setSortBy] = (0, react_1.useState)(args.sortBy);
    return (react_1.default.createElement(CardTable_1.default, Object.assign({}, args, { sortBy: sortBy, onSortChange: (val) => {
            var _a;
            setSortBy(val);
            (_a = args.onSortChange) === null || _a === void 0 ? void 0 : _a.call(args, val);
        } })));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.Loading = {
    args: Object.assign(Object.assign({}, baseArgs), { loading: true, loadingMessage: 'Loading clusters...' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.Empty = {
    args: Object.assign(Object.assign({}, baseArgs), { data: [] }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.WithSorting = {
    args: Object.assign(Object.assign({}, baseArgs), { showSortOption: true, sortOptions: [
            { label: 'Name', value: 'name' },
            { label: 'Region', value: 'region' }
        ], sortTarget: 'name', sortBy: 'asc' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
//# sourceMappingURL=CardTable.stories.js.map