"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/rules-of-hooks */
const ramda_1 = require("ramda");
const react_1 = require("react");
const fp_1 = require("../../..//utils/fp");
const misc_1 = require("../../../utils/misc");
const GridDefaultActionButton_1 = __importDefault(require("../buttons/GridDefaultActionButton"));
const selectedRowReducer = (selectedRows, { type, payload: { row, rows, multiSelection } }) => {
    const newMap = new Map(type === 'set' ? rows.map((row) => [row.key, row]) : selectedRows);
    switch (type) {
        case 'addSome':
            rows.forEach((row) => newMap.set(row.key, row));
            break;
        case 'removeSome':
            rows.forEach(({ key }) => newMap.delete(key));
            break;
        case 'clear':
            newMap.clear();
            break;
        case 'add':
            newMap.set(row.key, row);
            break;
        case 'remove':
            newMap.delete(row.key);
            break;
        case 'toggle':
            if (newMap.has(row.key)) {
                newMap.delete(row.key);
                break;
            }
            if (!multiSelection) {
                newMap.clear();
            }
            newMap.set(row.key, row);
            break;
    }
    return newMap;
};
const maxSize = 1000000;
function useGridSelectableRows(rows, { batchActions: rowActionsSpec = fp_1.emptyArr, multiSelection, rowIsSelectableFn, totalItems = rows.length, selectedItems, onSelectChange, isControlled = !!selectedItems, disableRowSelection = (0, fp_1.isNilOrEmpty)(rowActionsSpec) && !isControlled, onRefresh, disabledRowTooltip = undefined, }) {
    if (disableRowSelection) {
        return [rows, { rowsSelectionDisabled: true, batchActionsDisabled: true }];
    }
    const initialState = (0, react_1.useMemo)(() => new Map(), []);
    const [selectedRows, dispatch] = (0, react_1.useReducer)(selectedRowReducer, initialState);
    const [locallySelectedItems, setLocallySelectedItems] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        setLocallySelectedItems(Array.from(selectedRows.values()).map(({ item }) => item));
    }, [selectedRows, selectedItems]);
    (0, react_1.useEffect)(() => {
        // This should only happen when locally selected
        // items are out of sync (ie changed by an external agent)
        if (isControlled && !(0, ramda_1.equals)(selectedItems, locallySelectedItems)) {
            const selectedRows = rows.filter((row) => selectedItems.includes(row.item));
            dispatch({ type: 'set', payload: { rows: selectedRows } });
        }
    }, [selectedItems, rows]);
    (0, react_1.useEffect)(() => {
        if (!isControlled || (0, ramda_1.equals)(selectedItems, locallySelectedItems))
            return;
        onSelectChange && onSelectChange(locallySelectedItems);
    }, [locallySelectedItems, onSelectChange]);
    const getSelectToggler = (0, react_1.useCallback)((0, misc_1.memoize)((row, type) => () => {
        dispatch({ type, payload: { row, multiSelection } });
    }, { maxSize }), [multiSelection]);
    const getRowIsSelectable = (0, react_1.useCallback)((0, misc_1.memoize)((row, isSelected) => {
        const isSelectable = rowIsSelectableFn ? rowIsSelectableFn(row.item) : true;
        return Object.assign(Object.assign({}, row), { isSelectable,
            isSelected,
            multiSelection, toggleSelect: isSelectable ? getSelectToggler(row, 'toggle') : fp_1.noop, select: isSelectable ? getSelectToggler(row, 'add') : fp_1.noop, unselect: isSelectable ? getSelectToggler(row, 'remove') : fp_1.noop });
    }, { maxSize }), [multiSelection, rowIsSelectableFn]);
    const selectableRows = (0, react_1.useMemo)(() => rows.map((row) => {
        const { key } = row;
        const isSelected = selectedRows.has(key);
        if (isSelected) {
            // Update the existing row
            selectedRows.set(key, row);
        }
        return getRowIsSelectable(row, isSelected);
    }), [rows, selectedRows, getRowIsSelectable]);
    const toggleSelectAll = (0, react_1.useCallback)((rows = selectableRows) => {
        const keys = rows.map(({ key }) => key);
        if ((0, ramda_1.difference)(keys, Array.from(selectedRows.keys())).length) {
            dispatch({ type: 'addSome', payload: { rows: rows.filter((r) => r.isSelectable) } });
            return;
        }
        dispatch({ type: 'removeSome', payload: { rows } });
    }, [selectableRows]);
    const clearSelectedRows = (0, react_1.useCallback)(() => {
        dispatch({ type: 'clear', payload: {} });
    }, []);
    const batchActions = (0, react_1.useMemo)(() => {
        if (!rowActionsSpec) {
            return fp_1.emptyArr;
        }
        return rowActionsSpec.map(({ cond, BatchActionButton = GridDefaultActionButton_1.default, label, keepRowsSelected, refreshAfterSuccess = true, onComplete, handleAction, icon, }, idx) => ({
            key: idx,
            BatchActionButton: BatchActionButton,
            label,
            disabled: cond && locallySelectedItems.length && !cond(locallySelectedItems),
            triggerAction: async () => {
                const success = handleAction ? await handleAction(locallySelectedItems) : true;
                if (success !== false) {
                    if (refreshAfterSuccess && onRefresh) {
                        onRefresh();
                    }
                    if (!keepRowsSelected) {
                        dispatch({ type: 'clear', payload: {} });
                    }
                }
                if (onComplete) {
                    onComplete(success, locallySelectedItems);
                }
            },
            icon,
        }));
    }, [rowActionsSpec, locallySelectedItems]);
    const selectedCount = selectedRows.size;
    const selectionStatus = selectedCount === totalItems ? 'all' : selectedCount ? 'some' : 'none';
    return [
        selectableRows,
        {
            toggleSelectAll,
            clearSelectedRows,
            selectedItems: locallySelectedItems,
            selectedCount,
            selectionStatus,
            multiSelectionEnabled: multiSelection,
            rowsSelectionDisabled: false,
            batchActionsDisabled: (0, fp_1.isNilOrEmpty)(rowActionsSpec),
            batchActions,
            disabledRowTooltip,
        },
    ];
}
exports.default = useGridSelectableRows;
//# sourceMappingURL=useGridSelectableRows.js.map