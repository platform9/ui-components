"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/rules-of-hooks */
const react_1 = require("react");
function useGridExpandedRows(rows, { expandableRow, expandedByDefault }) {
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
    const onRowExpand = (key) => () => setExpandedRowsById(Object.assign(Object.assign({}, expandedRowsById), { [key]: !expandedRowsById[key] }));
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