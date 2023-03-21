"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ramda_1 = require("ramda");
const fp_1 = require("src/utils/fp");
const misc_1 = require("src/utils/misc");
const constants_1 = require("src/constants");
const defaultFilteringState = {
    globalValuesByKey: {},
    valuesByKey: {},
};
function filteringReducer(state, { type, payload: { global, key, value } }) {
    const basePath = global ? 'globalValuesByKey' : 'valuesByKey';
    switch (type) {
        case 'update':
            return (0, ramda_1.assocPath)([basePath, key], value, state);
        case 'clear':
            return (0, ramda_1.dissocPath)([basePath, key], state);
        case 'clearAll':
        default:
            return defaultFilteringState;
    }
}
function useGridFiltering(rows, { onClearFilters, globalFilters: globalFilterSpecs = fp_1.emptyArr, filters: filterSpecs = fp_1.emptyArr, }) {
    const initialFilteringState = (0, react_1.useMemo)(() => {
        return {
            globalValuesByKey: globalFilterSpecs.reduce((acc, { key, initialValue }) => {
                acc[key] = initialValue;
                return acc;
            }, {}),
            valuesByKey: filterSpecs.reduce((acc, { columnKey, initialValue }) => {
                acc[columnKey] = initialValue;
                return acc;
            }, {}),
        };
    }, []);
    const [{ globalValuesByKey, valuesByKey }, dispatch] = (0, react_1.useReducer)(filteringReducer, initialFilteringState);
    const filterHandlers = (0, react_1.useMemo)(() => filterSpecs.reduce((acc, { columnKey, onChange }) => {
        if (onChange) {
            acc[columnKey] = onChange;
        }
        return acc;
    }, {}), [filterSpecs]);
    const globalFilterHandlers = (0, react_1.useMemo)(() => globalFilterSpecs.reduce((acc, { key, onChange }) => {
        if (onChange) {
            acc[key] = onChange;
        }
        return acc;
    }, {}), [globalFilterSpecs]);
    const getFilterUpdater = (0, react_1.useCallback)((0, misc_1.memoize)((key) => async (value) => {
        dispatch({ type: 'update', payload: { key, value } });
        if (filterHandlers[key]) {
            return filterHandlers[key](value);
        }
    }), [filterHandlers]);
    const getFilterClearFn = (0, react_1.useCallback)((0, misc_1.memoize)((key) => () => {
        dispatch({ type: 'clear', payload: { key } });
        if (filterHandlers[key]) {
            return filterHandlers[key](null);
        }
    }), [filterHandlers]);
    const getGlobalFilterUpdater = (0, react_1.useCallback)((0, misc_1.memoize)((key) => (value) => {
        dispatch({ type: 'update', payload: { key, global: true, value } });
        if (globalFilterHandlers[key]) {
            return globalFilterHandlers[key](value);
        }
    }), [globalFilterHandlers]);
    const getGlobalFilterClearFn = (0, react_1.useCallback)((0, misc_1.memoize)((key) => () => {
        dispatch({ type: 'clear', payload: { key, global: true } });
        if (globalFilterHandlers[key]) {
            return globalFilterHandlers[key](null);
        }
    }), [globalFilterHandlers]);
    const clearFilters = (0, react_1.useCallback)(async () => {
        dispatch({ type: 'clearAll' });
        if (onClearFilters) {
            return onClearFilters();
        }
    }, [onClearFilters]);
    const globalFilteredRows = (0, react_1.useMemo)(() => {
        return globalFilterSpecs.reduce((rows, { key, controlled, equalityComparerFn = ramda_1.equals, allowEmpty = false }) => {
            if (globalValuesByKey[key] !== undefined &&
                (allowEmpty || !(0, fp_1.isNilOrEmpty)(globalValuesByKey[key]))) {
                if (controlled || globalValuesByKey[key] === constants_1.allKey) {
                    return rows;
                }
                return rows.filter((row) => equalityComparerFn(row.item, globalValuesByKey[key]));
            }
            return rows;
        }, rows);
    }, [globalFilterSpecs, rows, globalValuesByKey]);
    const filteredRows = (0, react_1.useMemo)(() => {
        return filterSpecs.reduce((rows, { columnKey, controlled, equalityComparerFn = ramda_1.equals, allowEmpty = false }) => {
            if (valuesByKey[String(columnKey)] !== undefined &&
                (allowEmpty || !(0, fp_1.isNilOrEmpty)(valuesByKey[String(columnKey)]))) {
                if (controlled || valuesByKey[String(columnKey)] === constants_1.allKey) {
                    return rows;
                }
                return rows.filter((row) => 
                // @fixme apparently TS is unable to understand that "keyof F" is equivalent to
                // "keyof T" here, so we are forced to use these ugly typecasts for now
                equalityComparerFn(row.item[columnKey], valuesByKey[String(columnKey)]));
            }
            return rows;
        }, globalFilteredRows);
    }, [filterSpecs, globalFilteredRows, valuesByKey]);
    const globalFilters = (0, react_1.useMemo)(() => {
        return globalFilterSpecs.map(({ key, FilterComponent }) => ({
            key,
            updateFilterValue: getGlobalFilterUpdater(key),
            filterValue: globalValuesByKey[key],
            clearFilter: getGlobalFilterClearFn(key),
            filterValues: globalValuesByKey,
            FilterComponent,
        }));
    }, [globalValuesByKey]);
    const filters = (0, react_1.useMemo)(() => {
        return filterSpecs.map(({ columnKey, FilterComponent }) => ({
            key: columnKey,
            updateFilterValue: getFilterUpdater(columnKey),
            filterValue: valuesByKey[columnKey],
            clearFilter: getFilterClearFn(columnKey),
            filterValues: valuesByKey,
            FilterComponent,
        }));
    }, [valuesByKey]);
    return [
        filteredRows,
        {
            globalFilters,
            filters,
            clearFilters,
        },
    ];
}
exports.default = useGridFiltering;
//# sourceMappingURL=useGridFiltering.js.map