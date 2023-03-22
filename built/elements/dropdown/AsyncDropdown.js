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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const withProgress_1 = __importDefault(require("../../components/progress/withProgress"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const Dropdown_1 = __importDefault(require("../../elements/dropdown/Dropdown"));
const DropdownWithProgress = (0, withProgress_1.default)(Dropdown_1.default, {
    inline: true,
    overlay: true,
});
function AsyncDropdown(_a) {
    var { showAll = false, formField = false, compact = !formField, selectFirst = false, onChange, items, loading, loadingProps } = _a, props = __rest(_a, ["showAll", "formField", "compact", "selectFirst", "onChange", "items", "loading", "loadingProps"]);
    const isDataLoadedOnceRef = (0, react_1.useRef)(false);
    // Select first item when data is loaded, ie when "loading" switches from false to true (once)
    (0, react_1.useEffect)(() => {
        // TODO: Bug here where if there is a value existing, and the dropdown rerenders (for
        // example when switching wizard steps), selectFirst will reset the value
        if (selectFirst && !isDataLoadedOnceRef.current && !loading && items.length) {
            isDataLoadedOnceRef.current = true;
            onChange(items[0].value);
        }
    }, [!!loading]);
    return (react_1.default.createElement(DropdownWithProgress, Object.assign({ items: items, loading: loading, loadingProps: loadingProps, onChange: onChange, compact: compact, "data-testid": (0, test_helpers_1.default)('dropdown', 'bar'), showAll: showAll }, props)));
}
exports.default = AsyncDropdown;
//# sourceMappingURL=AsyncDropdown.js.map