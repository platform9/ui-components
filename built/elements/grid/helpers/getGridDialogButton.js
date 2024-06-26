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
const styles_1 = require("@material-ui/styles");
const react_1 = __importStar(require("react"));
const Grid_1 = require("../../../elements/grid/Grid");
const useToggler_1 = __importDefault(require("../../../hooks/useToggler"));
const ThemeManager_1 = require("../../../theme-manager/ThemeManager");
const GridDefaultActionButton_1 = __importDefault(require("../buttons/GridDefaultActionButton"));
function getGridDialogButton(DialogComponent, customDialogProps, customButtonProps = {}) {
    return (_a) => {
        var { children } = _a, buttonProps = __rest(_a, ["children"]);
        const { triggerRefresh, selectedItems, clearSelectedRows } = (0, Grid_1.useGridContext)();
        const [theme] = (0, ThemeManager_1.useCustomTheme)();
        const [dialogOpened, toggleDialogOpened, setDialogOpened] = (0, useToggler_1.default)();
        const handleDialogClose = (0, react_1.useCallback)((success) => {
            if (success === true && triggerRefresh) {
                clearSelectedRows();
                triggerRefresh();
            }
            setDialogOpened(false);
        }, []);
        const additionalButtonProps = (0, react_1.useMemo)(() => typeof customButtonProps === 'function'
            ? customButtonProps(selectedItems, buttonProps.disabled)
            : customButtonProps, [customButtonProps, selectedItems, buttonProps.disabled]);
        return (react_1.default.createElement(styles_1.ThemeProvider, { theme: theme },
            react_1.default.createElement(GridDefaultActionButton_1.default, Object.assign({}, buttonProps, additionalButtonProps, { onClick: toggleDialogOpened }), children),
            dialogOpened && (react_1.default.createElement(DialogComponent, Object.assign({ onClose: handleDialogClose, rows: selectedItems }, (customDialogProps || {}))))));
    };
}
exports.default = getGridDialogButton;
//# sourceMappingURL=getGridDialogButton.js.map