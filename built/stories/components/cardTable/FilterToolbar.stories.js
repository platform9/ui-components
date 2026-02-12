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
const FilterToolbar_1 = __importDefault(require("../../../components/cardTable/FilterToolbar"));
const react_router_dom_1 = require("react-router-dom");
const meta = {
    title: 'Components/CardTable/FilterToolbar',
    component: FilterToolbar_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null))),
    ],
    argTypes: {
        searchTerm: { control: 'text' },
        onSearchChange: { action: 'searchChanged' },
        onRefresh: { action: 'refreshed' },
        showSortOption: { control: 'boolean' },
        sortBy: { control: 'text' },
        onSortChange: { action: 'sortChanged' },
    },
};
exports.default = meta;
const baseArgs = {
    searchTerm: '',
    onSearchChange: () => { },
    onRefresh: () => { },
    sortOptions: [
        { label: 'Name', value: 'name' },
        { label: 'Status', value: 'status' }
    ],
};
const Wrapper = (args) => {
    const [term, setTerm] = (0, react_1.useState)(args.searchTerm);
    const [sortBy, setSortBy] = (0, react_1.useState)(args.sortBy);
    return (react_1.default.createElement(FilterToolbar_1.default, Object.assign({}, args, { searchTerm: term, onSearchChange: (val) => {
            var _a;
            setTerm(val);
            (_a = args.onSearchChange) === null || _a === void 0 ? void 0 : _a.call(args, val);
        }, sortBy: sortBy, onSortChange: (val) => {
            var _a;
            setSortBy(val);
            (_a = args.onSortChange) === null || _a === void 0 ? void 0 : _a.call(args, val);
        } })));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.WithSorting = {
    args: Object.assign(Object.assign({}, baseArgs), { showSortOption: true, sortBy: 'name' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
//# sourceMappingURL=FilterToolbar.stories.js.map