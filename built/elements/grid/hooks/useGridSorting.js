"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSortingState = exports.defaultSortWith = void 0;
const react_1 = require("react");
const ramda_1 = require("ramda");
const fp_1 = require("src/utils/fp");
const defaultSortWith = (prevValue, nextValue) => (nextValue < prevValue ? -1 : 1);
exports.defaultSortWith = defaultSortWith;
exports.defaultSortingState = {
    orderBy: null,
    orderDirection: null,
};
const getNextDirection = (sortedDirection) => sortedDirection === 'asc' ? 'desc' : sortedDirection === 'desc' ? null : 'asc';
const sortingReducer = ({ orderDirection, orderBy }, { type, payload }) => {
    switch (type) {
        case 'asc':
            return { orderBy, orderDirection: 'asc' };
        case 'desc':
            return { orderBy, orderDirection: 'desc' };
        case 'clear':
            return exports.defaultSortingState;
        case 'toggle':
        default: {
            if (orderBy !== payload) {
                return { orderBy: payload, orderDirection: 'asc' };
            }
            const nextDirection = getNextDirection(orderDirection);
            return nextDirection
                ? {
                    orderBy: orderBy,
                    orderDirection: nextDirection,
                }
                : exports.defaultSortingState;
        }
    }
};
function useGridSorting(rows, { orderBy: initialOrderBy, orderDirection: initialOrderDirection, disableSorting: disableAllSorting, controlledSorting, onSortChange, columns, }) {
    const [{ orderBy, orderDirection }, dispatch] = (0, react_1.useReducer)(sortingReducer, {
        orderBy: initialOrderBy,
        orderDirection: initialOrderDirection,
    });
    const toggleSort = (0, react_1.useCallback)(async (key) => {
        if (onSortChange) {
            const nextDirection = getNextDirection(orderDirection);
            await onSortChange(nextDirection ? key : null, nextDirection);
        }
        dispatch({ type: 'toggle', payload: key });
    }, [orderDirection]);
    const sortByFieldAsc = (0, react_1.useCallback)(async (key) => {
        if (onSortChange) {
            await onSortChange(key, 'asc');
        }
        dispatch({ type: 'asc', payload: key });
    }, []);
    const sortByFieldDesc = (0, react_1.useCallback)(async (key) => {
        if (onSortChange) {
            await onSortChange(key, 'desc');
        }
        dispatch({ type: 'desc', payload: key });
    }, []);
    const clearSorting = (0, react_1.useCallback)(() => {
        dispatch({ type: 'clear' });
    }, []);
    const sortedRows = (0, react_1.useMemo)(() => {
        if (disableAllSorting || !orderBy || controlledSorting) {
            return rows;
        }
        const sortByColumn = columns.find(({ key }) => key === orderBy);
        if (!sortByColumn) {
            return rows;
        }
        const { disableSorting = false, sortFn = exports.defaultSortWith } = sortByColumn;
        const sortedRows = disableSorting
            ? rows
            : (0, ramda_1.sort)((a, b) => sortFn((0, fp_1.pathStr)(orderBy, b.item), (0, fp_1.pathStr)(orderBy, a.item)), rows);
        return orderDirection === 'desc' ? (0, ramda_1.reverse)(sortedRows) : sortedRows;
    }, [rows, columns, disableAllSorting, controlledSorting, orderBy, orderDirection]);
    if (disableAllSorting) {
        return [rows, { sortingDisabled: true }];
    }
    return [
        sortedRows,
        {
            sortedBy: orderBy,
            sortedDirection: orderDirection,
            sortByFieldAsc,
            sortByFieldDesc,
            clearSorting,
            toggleSort,
            sortingDisabled: false,
        },
    ];
}
exports.default = useGridSorting;
//# sourceMappingURL=useGridSorting.js.map