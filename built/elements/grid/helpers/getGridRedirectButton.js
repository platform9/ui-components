"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
const use_react_router_1 = __importDefault(require("use-react-router"));
const react_1 = __importStar(require("react"));
const Grid_1 = require("../Grid");
const GridDefaultActionButton_1 = __importDefault(require("../../../elements/grid/buttons/GridDefaultActionButton"));
function getGridRedirectButton(targetRoute, customButtonProps = {}) {
    return (_a) => {
        var { children } = _a, buttonProps = __rest(_a, ["children"]);
        const { history } = use_react_router_1.default();
        const { selectedItems } = Grid_1.useGridContext();
        const handleRedirect = react_1.useCallback(() => {
            const [firstItem] = selectedItems;
            const targetRouteString = typeof targetRoute === 'string' ? targetRoute : targetRoute(firstItem);
            history.push(targetRouteString);
        }, [selectedItems]);
        const additionalButtonProps = react_1.useMemo(() => typeof customButtonProps === 'function'
            ? customButtonProps(selectedItems, buttonProps.disabled)
            : customButtonProps, [customButtonProps, selectedItems, buttonProps.disabled]);
        return (react_1.default.createElement(GridDefaultActionButton_1.default, Object.assign({}, buttonProps, additionalButtonProps, { onClick: handleRedirect }), children));
    };
}
exports.default = getGridRedirectButton;
//# sourceMappingURL=getGridRedirectButton.js.map