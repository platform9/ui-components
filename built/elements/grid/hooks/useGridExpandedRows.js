"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/rules-of-hooks */
const react_1 = require("react");
function useGridExpandedRows(rows, { expandableRow, expandedByDefault, allowMultipleExpandedRows = false, expandRowsUponSelection = false, }) {
    if (!expandableRow) {
        return [rows, { expandedRowsById: {} }];
    }
    const initialExpandedRows = (0, react_1.useMemo)(() => {
        return expandableRow
            ? rows === null || rows === void 0 ? void 0 : rows.reduce((accum, row) => {
                return Object.assign(Object.assign({}, accum), { [row.key]: expandedByDefault ? expandedByDefault(row.item) : false });
            }, {})
            : rows;
    }, [rows]);
    const [expandedRowsById, setExpandedRowsById] = (0, react_1.useState)(initialExpandedRows);
    const onRowExpand = (key) => () => {
        var _a;
        if (allowMultipleExpandedRows) {
            setExpandedRowsById(Object.assign(Object.assign({}, expandedRowsById), { [key]: !expandedRowsById[key] }));
        }
        else {
            // Only one row should be expanded at one time. Check to see if any row is currently expanded
            const currentExpandedRowKey = (_a = Object.entries(expandedRowsById).find(([key, expanded]) => expanded === true)) === null || _a === void 0 ? void 0 : _a[0];
            setExpandedRowsById(Object.assign(Object.assign(Object.assign({}, expandedRowsById), (currentExpandedRowKey ? { [currentExpandedRowKey]: false } : {})), { [key]: !expandedRowsById[key] }));
        }
    };
    (0, react_1.useEffect)(() => {
        if (!expandRowsUponSelection)
            return;
        const rowsToExpand = rows.reduce((accum, row) => {
            if (!row.isSelected)
                return accum;
            accum[row.key] = true;
            return accum;
        }, {});
        setExpandedRowsById(rowsToExpand);
    }, [expandRowsUponSelection, rows]);
    return [
        rows,
        {
            expandedRowsById,
            onRowExpand,
        },
    ];
}
exports.default = useGridExpandedRows;
//# sourceMappingURL=useGridExpandedRows.js.map