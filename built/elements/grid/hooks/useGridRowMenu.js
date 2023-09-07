"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGridRowMenuHeader = void 0;
const react_1 = require("react");
const fp_1 = require("../../../utils/fp");
const GridDefaultActionButton_1 = __importDefault(require("../../../elements/grid/buttons/GridDefaultActionButton"));
const misc_1 = require("../../../utils/misc");
const isGridRowMenuHeader = (item) => !!item.title || !!item.insertDivider;
exports.isGridRowMenuHeader = isGridRowMenuHeader;
function useGridRowMenu(rows, { rowMenuItems: rowActionsSpec = fp_1.emptyArr, onRefresh, rowMenuOffset = {}, showRowMenuForSingleRowActions, maxRowMenuHeight, }) {
    const rowMenuItems = (0, react_1.useMemo)(() => {
        return rowActionsSpec.map((item, idx) => {
            if ((0, exports.isGridRowMenuHeader)(item))
                return item;
            const { cond, RowMenuButton = GridDefaultActionButton_1.default, label, refreshAfterSuccess, onComplete, handleClick, icon, hideIfDisabled = false, } = item;
            return {
                key: idx,
                RowMenuButton,
                icon,
                label,
                hideIfDisabled,
                getIsDisabled: (0, misc_1.memoize)((currentItem) => cond && !cond(currentItem)),
                triggerAction: async (currentItem, expandRow) => {
                    const success = handleClick ? await handleClick(currentItem, expandRow) : true;
                    if (success && refreshAfterSuccess && onRefresh) {
                        onRefresh(true);
                    }
                    if (onComplete) {
                        onComplete(success, currentItem);
                    }
                },
            };
        });
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
            maxRowMenuHeight,
        },
    ];
}
exports.default = useGridRowMenu;
//# sourceMappingURL=useGridRowMenu.js.map