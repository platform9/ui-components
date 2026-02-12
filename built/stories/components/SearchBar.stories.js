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
exports.PreFilled = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const SearchBar_1 = __importDefault(require("../../components/SearchBar"));
const meta = {
    title: 'Components/SearchBar',
    component: SearchBar_1.default,
    argTypes: {
        searchTerm: {
            control: { type: 'text' },
            description: 'Current search term',
        },
        onSearchChange: { action: 'changed' },
    },
};
exports.default = meta;
const baseArgs = {
    searchTerm: '',
    onSearchChange: () => { },
};
const Wrapper = (args) => {
    const [term, setTerm] = (0, react_1.useState)(args.searchTerm);
    return (react_1.default.createElement(SearchBar_1.default, Object.assign({}, args, { searchTerm: term, onSearchChange: (t) => {
            var _a;
            setTerm(t);
            (_a = args.onSearchChange) === null || _a === void 0 ? void 0 : _a.call(args, t);
        } })));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.PreFilled = {
    args: Object.assign(Object.assign({}, baseArgs), { searchTerm: 'initial search' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
//# sourceMappingURL=SearchBar.stories.js.map