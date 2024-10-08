"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("../../elements/input/Checkbox"));
const Radio_1 = __importDefault(require("../../elements/input/Radio"));
const fp_1 = require("../../utils/fp");
const misc_1 = require("../../utils/misc");
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const GridRowMenu_1 = __importDefault(require("./GridRowMenu"));
const SelectRowColumn = (0, misc_1.memoizeShallow)(function SelectRowColumn({ className, multiSelection, isSelectable, isSelected, info = undefined, }) {
    if (isSelectable === undefined) {
        return null;
    }
    const Toggler = multiSelection ? Checkbox_1.default : Radio_1.default;
    return (react_1.default.createElement("td", { "data-testid": (0, test_helpers_1.default)('row', 'checkbox', 'selection'), className: className },
        react_1.default.createElement(Toggler, { disabled: !isSelectable, checked: isSelected, onChange: fp_1.noop, info: info })));
}, {
    maxSize: 8,
});
function GridRow(props) {
    const { isSelectable, multiSelection, isSelected, toggleSelect, getCells, rowMenuItems = [], rowMenuDisabled = !rowMenuItems.length, item, className, tdClassName, cellClassName, index, numPageItems, rowMenuOffset = {}, showRowMenuForSingleRowActions, maxRowMenuHeight, expandedRowsById, onRowExpand, rowId, disabledRowTooltip = undefined, } = props;
    const disabledTooltipMsg = isSelectable === false
        ? typeof disabledRowTooltip === 'function'
            ? disabledRowTooltip(item)
            : disabledRowTooltip
        : undefined;
    return (react_1.default.createElement("tr", { className: className, onClick: toggleSelect },
        react_1.default.createElement(SelectRowColumn, Object.assign({ className: tdClassName }, {
            multiSelection,
            isSelectable,
            isSelected,
            info: isSelectable ? null : disabledTooltipMsg,
        })),
        getCells().map(({ key, CellComponent, value, getFormattedValue }, idx) => {
            const formattedValue = getFormattedValue();
            return (react_1.default.createElement("td", { "data-testid": (0, test_helpers_1.default)(key), key: key, className: tdClassName },
                react_1.default.createElement(CellComponent, { index: idx, item: item, value: value, title: String(formattedValue), className: cellClassName, expandRow: onRowExpand ? onRowExpand(rowId) : fp_1.noop, rowIsExpanded: !!expandedRowsById[rowId] }, formattedValue)));
        }),
        rowMenuItems.length ? (react_1.default.createElement("td", null,
            react_1.default.createElement(GridRowMenu_1.default, { item: item, rowMenuItems: rowMenuItems, rowMenuDisabled: rowMenuDisabled, rowMenuOffset: index === numPageItems - 1
                    ? {
                        vertical: rowMenuOffset.vertical * -1,
                    }
                    : rowMenuOffset, showRowMenuForSingleRowActions: showRowMenuForSingleRowActions, maxRowMenuHeight: maxRowMenuHeight, expandRow: onRowExpand ? onRowExpand(rowId) : fp_1.noop, toggleRow: toggleSelect }))) : null));
}
exports.default = GridRow;
//# sourceMappingURL=GridRow.js.map