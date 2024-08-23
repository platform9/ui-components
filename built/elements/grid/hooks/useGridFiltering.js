"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const react_1 = require("react");
const constants_1 = require("../../../constants");
const fp_1 = require("../../../utils/fp");
const misc_1 = require("../../../utils/misc");
const defaultFilteringState = {
    globalValuesByKey: {},
    valuesByKey: {},
    dropdownValuesByKey: {},
};
function filteringReducer(state, { type, payload: { global, dropdownFilter, key, value } }) {
    const basePath = global
        ? 'globalValuesByKey'
        : dropdownFilter
            ? 'dropdownValuesByKey'
            : 'valuesByKey';
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
function useGridFiltering(rows, { onClearFilters, globalFilters: globalFilterSpecs = fp_1.emptyArr, filters: filterSpecs = fp_1.emptyArr, dropdownFilters: dropdownFilterSpecs = fp_1.emptyArr, }) {
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
            dropdownValuesByKey: dropdownFilterSpecs.reduce((acc, { key, initialValue }) => {
                acc[key] = initialValue;
                return acc;
            }, {}),
        };
    }, []);
    const [{ globalValuesByKey, valuesByKey, dropdownValuesByKey }, dispatch] = (0, react_1.useReducer)(filteringReducer, initialFilteringState);
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
    const dropdownFilterHandlers = (0, react_1.useMemo)(() => dropdownFilterSpecs.reduce((acc, { key, onChange }) => {
        if (onChange) {
            acc[key] = onChange;
        }
        return acc;
    }, {}), [dropdownFilterSpecs]);
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
    const getDropdownFilterUpdater = (0, react_1.useCallback)((0, misc_1.memoize)((key) => (value) => {
        dispatch({ type: 'update', payload: { key, dropdownFilter: true, value } });
        if (dropdownFilterHandlers[key]) {
            return dropdownFilterHandlers[key](value);
        }
    }), [dropdownFilterHandlers]);
    const getDropdownFilterClearFn = (0, react_1.useCallback)((0, misc_1.memoize)((key) => () => {
        dispatch({ type: 'clear', payload: { key, dropdownFilter: true } });
        if (dropdownFilterHandlers[key]) {
            return dropdownFilterHandlers[key](null);
        }
    }), [dropdownFilterHandlers]);
    const clearFilters = (0, react_1.useCallback)(async () => {
        dispatch({ type: 'clearAll' });
        if (onClearFilters) {
            return onClearFilters();
        }
    }, [onClearFilters]);
    const dropdownFilteredRows = (0, react_1.useMemo)(() => {
        return dropdownFilterSpecs.reduce((rows, { key, controlled, equalityComparerFn = ramda_1.equals, allowEmpty = false }) => {
            if (dropdownValuesByKey[key] !== undefined &&
                (allowEmpty || !(0, fp_1.isNilOrEmpty)(dropdownValuesByKey[key]))) {
                if (controlled || dropdownValuesByKey[key] === constants_1.allKey) {
                    return rows;
                }
                return rows.filter((row) => equalityComparerFn(row.item, dropdownValuesByKey[key]));
            }
            return rows;
        }, rows);
    }, [dropdownFilterSpecs, rows, dropdownValuesByKey]);
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
        }, dropdownFilteredRows);
    }, [globalFilterSpecs, dropdownFilteredRows, globalValuesByKey]);
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
    // const dropdownFilters = useMemo(() => {
    const dropdownFilters = (0, react_1.useMemo)(() => {
        return dropdownFilterSpecs.map(({ key, label, FilterComponent, filterComponentProps, getOptionsFn, filterComponentOptionsPropName, }) => {
            const items = filteredRows.map((row) => row.item);
            const dropdownOptions = getOptionsFn(items);
            return {
                key,
                label,
                updateFilterValue: getDropdownFilterUpdater(key),
                filterValue: dropdownValuesByKey[key],
                clearFilter: getDropdownFilterClearFn(key),
                filterValues: dropdownValuesByKey,
                FilterComponent,
                filterComponentProps: Object.assign(Object.assign({}, filterComponentProps), { [filterComponentOptionsPropName]: dropdownOptions }),
            };
        });
    }, [dropdownValuesByKey, filteredRows]);
    const dropdownFilterValues = (0, react_1.useMemo)(() => {
        const filterInfo = dropdownFilters.map((filter) => {
            return { key: filter.key, updateFilterValue: filter.updateFilterValue, label: filter === null || filter === void 0 ? void 0 : filter.label };
        });
        const activeFilters = filterInfo.reduce((accum, current) => {
            const keyValues = dropdownValuesByKey[current === null || current === void 0 ? void 0 : current.key] || [];
            // @ts-ignore not sure how to resolve this ts error
            const transformedValues = keyValues.map((value) => {
                return {
                    key: current.key,
                    label: current.label,
                    updateFilterValue: current.updateFilterValue,
                    value: value,
                    display: typeof value === 'object' ? `${value.key}=${value.value}` : value,
                };
            });
            return [...accum, ...transformedValues];
        }, []);
        return activeFilters;
    }, [dropdownValuesByKey, dropdownFilters]);
    return [
        filteredRows,
        {
            globalFilters,
            filters,
            dropdownFilters,
            dropdownFilterValues,
            dropdownValuesByKey,
            clearFilters,
        },
    ];
}
exports.default = useGridFiltering;
//# sourceMappingURL=useGridFiltering.js.map