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
exports.Default = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const FilterSpec_1 = __importDefault(require("../../components/FilterSpec"));
// Filter is the default export from FilterSpec.tsx
const meta = {
    title: 'Components/FilterSpec',
    component: FilterSpec_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(Story, null)))
    ]
};
exports.default = meta;
const data = [
    { id: 1, name: 'Cluster A', region: 'US', status: 'Active' },
    { id: 2, name: 'Cluster B', region: 'EU', status: 'Inactive' },
    { id: 3, name: 'Cluster C', region: 'US', status: 'Active' },
    { id: 4, name: 'Cluster D', region: 'ASIA', status: 'Maintenance' },
];
const baseArgs = {
    data: data,
    setFilteredData: () => { },
    searchTarget: 'name',
    filters: [
        { name: 'region', label: 'Region', options: ['US', 'EU', 'ASIA'], target: 'region' },
        { name: 'status', label: 'Status', options: ['Active', 'Inactive', 'Maintenance'], target: 'status' }
    ]
};
const Wrapper = (args) => {
    const [filtered, setFiltered] = (0, react_1.useState)(args.data);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(FilterSpec_1.default, Object.assign({}, args, { setFilteredData: setFiltered })),
        react_1.default.createElement("div", { style: { marginTop: 20 } },
            react_1.default.createElement("strong", null, "Filtered Results:"),
            react_1.default.createElement("pre", null, JSON.stringify(filtered, null, 2)))));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
//# sourceMappingURL=FilterSpec.stories.js.map