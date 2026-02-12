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
exports.WithSorting = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const CardTableToolbar_1 = __importDefault(require("../../../components/cardTable/CardTableToolbar"));
const react_router_dom_1 = require("react-router-dom");
const meta = {
    title: 'Components/CardTable/CardTableToolbar',
    component: CardTableToolbar_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null))),
    ],
    argTypes: {
        title: { control: 'text' },
        searchTerm: { control: 'text' },
        onSearchChange: { action: 'searchChanged' },
        onRefresh: { action: 'refreshed' },
        orderDirection: {
            control: { type: 'select' },
            options: ['asc', 'desc'],
        },
        orderBy: { control: 'text' },
        onSortChange: { action: 'sortChanged' },
        onDirectionSwitch: { action: 'directionSwitched' },
    },
};
exports.default = meta;
const baseArgs = {
    title: 'Toolbar Title',
    searchTerm: '',
    onSearchChange: () => { },
    onRefresh: () => { },
    filters: [],
    filterValues: {},
    onFilterUpdate: () => () => { },
    onSortChange: () => { },
    onDirectionSwitch: () => { },
    orderBy: '',
    orderDirection: 'asc',
};
const Wrapper = (args) => {
    const [term, setTerm] = (0, react_1.useState)(args.searchTerm);
    const [orderBy, setOrderBy] = (0, react_1.useState)(args.orderBy);
    const [direction, setDirection] = (0, react_1.useState)(args.orderDirection || 'asc');
    return (react_1.default.createElement(CardTableToolbar_1.default, Object.assign({}, args, { searchTerm: term, onSearchChange: (val) => {
            var _a;
            setTerm(val);
            (_a = args.onSearchChange) === null || _a === void 0 ? void 0 : _a.call(args, val);
        }, orderBy: orderBy, onSortChange: (val) => {
            var _a;
            setOrderBy(val);
            (_a = args.onSortChange) === null || _a === void 0 ? void 0 : _a.call(args, val);
        }, orderDirection: direction, onDirectionSwitch: () => {
            var _a;
            const newDir = direction === 'asc' ? 'desc' : 'asc';
            setDirection(newDir);
            (_a = args.onDirectionSwitch) === null || _a === void 0 ? void 0 : _a.call(args);
        } })));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.WithSorting = {
    args: Object.assign(Object.assign({}, baseArgs), { sorting: [
            { label: 'Name', field: 'name' },
            { label: 'Date', field: 'created_at' }
        ], orderBy: 'name', orderDirection: 'asc' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
//# sourceMappingURL=CardTableToolbar.stories.js.map