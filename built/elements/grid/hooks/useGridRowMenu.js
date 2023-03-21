"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const fp_1 = require("src/utils/fp");
const GridDefaultActionButton_1 = __importDefault(require("src/elements/grid/buttons/GridDefaultActionButton"));
const misc_1 = require("src/utils/misc");
function useGridRowMenu(rows, { rowMenuItems: rowActionsSpec = fp_1.emptyArr, onRefresh, rowMenuOffset = {}, showRowMenuForSingleRowActions, }) {
    const rowMenuItems = (0, react_1.useMemo)(() => {
        return rowActionsSpec.map(({ cond, RowMenuButton = GridDefaultActionButton_1.default, label, refreshAfterSuccess, onComplete, handleClick, icon, hideIfDisabled = false, }, idx) => ({
            key: idx,
            RowMenuButton,
            icon,
            label,
            hideIfDisabled,
            getIsDisabled: (0, misc_1.memoize)((currentItem) => cond && !cond(currentItem)),
            triggerAction: async (currentItem) => {
                const success = handleClick ? await handleClick(currentItem) : true;
                if (success && refreshAfterSuccess && onRefresh) {
                    onRefresh();
                }
                if (onComplete) {
                    onComplete(success, currentItem);
                }
            },
        }));
    }, [rowActionsSpec]);
    if (!rowActionsSpec.length) {
        return [rows, { rowMenuDisabled: true }];
    }
    return [
        rows,
        {
            rowMenuDisabled: false,
            rowMenuItems,
            rowMenuOffset,
            showRowMenuForSingleRowActions,
        },
    ];
}
exports.default = useGridRowMenu;
//# sourceMappingURL=useGridRowMenu.js.map