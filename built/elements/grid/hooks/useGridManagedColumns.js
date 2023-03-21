"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const misc_1 = require("src/utils/misc");
const ramda_1 = require("ramda");
const columnsReducer = ({ visibleColumnKeys, orderedColumnKeys }, { type, payload: { key, targetIdx, columnKeys } }) => {
    switch (type) {
        case 'changeOrder':
            return {
                visibleColumnKeys,
                orderedColumnKeys: (0, ramda_1.move)(orderedColumnKeys.indexOf(key), targetIdx, orderedColumnKeys),
            };
        case 'toggleColumn': {
            if (visibleColumnKeys.includes(key)) {
                const visibleColumnsSet = new Set(visibleColumnKeys);
                visibleColumnsSet.delete(key);
                return {
                    orderedColumnKeys,
                    visibleColumnKeys: Array.from(visibleColumnsSet),
                };
            }
            return {
                orderedColumnKeys,
                visibleColumnKeys: [...visibleColumnKeys, key],
            };
        }
        case 'setVisibleColumnKeys':
            return {
                orderedColumnKeys,
                visibleColumnKeys: columnKeys,
            };
        case 'setOrderedColumnKeys':
        default:
            return {
                visibleColumnKeys,
                orderedColumnKeys: columnKeys,
            };
    }
};
const getColumnsOrder = ({ columnsOrder = [], columnSpecs = [] }) => {
    const keysList = columnSpecs.map(({ key }) => key);
    if (!columnsOrder) {
        return keysList;
    }
    // If there is a difference between saved columns and column spec, remove columns
    // that are no longer in the spec and add in any new columns in the spec
    if ((0, ramda_1.symmetricDifference)(columnsOrder, keysList).length) {
        return (0, ramda_1.union)((0, ramda_1.intersection)(columnsOrder, keysList), keysList);
    }
    return columnsOrder;
};
const getVisibleColumns = ({ visibleColumns = [], columnSpecs = [], columnsOrder = [] }) => {
    const visibleKeys = columnSpecs.reduce((acc, { display = true, key }) => {
        if (display) {
            acc.push(key);
        }
        return acc;
    }, []);
    if (!visibleColumns) {
        return visibleKeys;
    }
    // If there is a difference between saved visible columns and visible columns from the spec,
    // remove columns that are no longer in the spec and add in any visible columns that were
    // not present in the full (visible & non-visible) saved list
    if ((0, ramda_1.symmetricDifference)(visibleColumns, visibleKeys).length) {
        return (0, ramda_1.union)((0, ramda_1.intersection)(visibleColumns, visibleKeys), (0, ramda_1.difference)(visibleKeys, columnsOrder));
    }
    return visibleColumns;
};
function useGridManagedColumns(rows, { columns: columnSpecs, onColumnsChange, columnsOrder, visibleColumns, disableColumnOrdering, disableColumnHiding, }) {
    const initialState = (0, react_1.useMemo)(() => {
        return {
            orderedColumnKeys: (!disableColumnOrdering && getColumnsOrder({ columnsOrder, columnSpecs })) ||
                columnSpecs.map(({ key }) => key),
            visibleColumnKeys: (!disableColumnHiding &&
                getVisibleColumns({ visibleColumns, columnSpecs, columnsOrder })) ||
                columnSpecs.reduce((acc, { display = true, key }) => {
                    if (disableColumnHiding || display) {
                        acc.push(key);
                    }
                    return acc;
                }, []),
        };
    }, []);
    const [{ orderedColumnKeys, visibleColumnKeys }, dispatch] = (0, react_1.useReducer)(columnsReducer, initialState);
    (0, react_1.useEffect)(() => {
        if (!onColumnsChange)
            return;
        onColumnsChange(visibleColumnKeys, orderedColumnKeys);
    }, [visibleColumnKeys, orderedColumnKeys]);
    const getColumnToggler = (0, react_1.useCallback)((0, misc_1.memoize)((key) => () => {
        dispatch({ type: 'toggleColumn', payload: { key } });
    }), []);
    const getColumnReorderer = (0, react_1.useCallback)((0, misc_1.memoize)((key) => (targetIdx) => {
        dispatch({ type: 'changeOrder', payload: { key, targetIdx } });
    }), []);
    const columnTogglers = (0, react_1.useMemo)(() => {
        // We use "columns" to keep the original order
        return columnSpecs.map(({ key, label, display, canHide = !disableColumnHiding }) => ({
            key,
            label,
            visible: disableColumnHiding || visibleColumnKeys.includes(key),
            disabled: !canHide,
            toggleColumn: !canHide ? null : getColumnToggler(key),
        }));
    }, [columnSpecs, visibleColumnKeys, disableColumnHiding]);
    const columns = (0, react_1.useMemo)(() => {
        return orderedColumnKeys.reduce((acc, columnKey) => {
            if (visibleColumnKeys.includes(columnKey)) {
                const columnSpec = columnSpecs.find(({ key }) => key === columnKey);
                if (!columnSpec) {
                    // The following can happen when removing columns from the grid config but the user config
                    // is still using the previous columns, localStorage.clear() could solve that in that case
                    console.warn(`Column spec with key "${columnKey}" not found or not defined`);
                    return acc;
                }
                const { key, display, canHide } = columnSpec, rest = __rest(columnSpec, ["key", "display", "canHide"]);
                acc.push(Object.assign({ key, visible: true, changeColumnOrder: getColumnReorderer(key), toggleColumn: !canHide ? null : getColumnToggler(key) }, rest));
            }
            return acc;
        }, []);
    }, [columnSpecs, orderedColumnKeys, visibleColumnKeys]);
    const parsedRows = (0, react_1.useMemo)(() => rows.map((_a) => {
        var { getCells: baseGetCells } = _a, row = __rest(_a, ["getCells"]);
        return (Object.assign(Object.assign({}, row), { getCells: () => columns.map(({ key: columnKey }) => baseGetCells().find(({ key }) => key === columnKey)) }));
    }), [rows, columns]);
    return [
        parsedRows,
        {
            columns,
            columnTogglers,
            columnOrderingDisabled: disableColumnOrdering,
            columnHidingDisabled: disableColumnHiding,
        },
    ];
}
exports.default = useGridManagedColumns;
//# sourceMappingURL=useGridManagedColumns.js.map