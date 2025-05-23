"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const react_1 = require("react");
const misc_1 = require("../../../utils/misc");
const GridDefaultCell_1 = __importDefault(require("../cells/GridDefaultCell"));
const maxSize = 100000;
function itemValueGetter(accessor, item) {
    return typeof accessor === 'function'
        ? accessor(item)
        : (0, ramda_1.path)(String(accessor).split('.'), item);
}
const useGridRows = ({ uniqueIdentifier, columns, data, }) => {
    const getMoizedCell = (0, react_1.useCallback)((0, misc_1.memoize)((CellComponent, memoizeCell) => memoizeCell ? (0, misc_1.memoizeShallow)(CellComponent, { maxSize }) : CellComponent), []);
    const getMoizedRenderCell = (0, react_1.useCallback)((0, misc_1.memoize)((render, memoizeCell) => {
        const CellComponent = ({ value, item }) => {
            return render(value, item);
        };
        return memoizeCell ? (0, misc_1.memoizeShallow)(CellComponent, { maxSize }) : CellComponent;
    }), []);
    const getItemValue = (0, react_1.useCallback)((0, misc_1.memoize)(itemValueGetter, { maxSize }), []);
    const getItemValueFormatter = (0, react_1.useCallback)((0, misc_1.memoize)((formatFn, value, item) => () => formatFn ? formatFn(value, item) : value, {
        maxSize,
    }), []);
    const getRow = (0, react_1.useCallback)((0, misc_1.memoize)((item) => ({
        key: String(item[uniqueIdentifier]),
        item,
        getCells: (0, misc_1.memoize)(() => columns.map(({ key, accessor = key, formatFn, render, width, CellComponent = GridDefaultCell_1.default, memoizeCell = true, }) => {
            const value = getItemValue(accessor, item);
            // Don't format the value unless explicitly requested (eg when rendering the rows)
            const getFormattedValue = getItemValueFormatter(formatFn, value, item);
            return {
                key: String(key),
                value,
                width,
                getFormattedValue,
                CellComponent: render
                    ? getMoizedRenderCell(render, memoizeCell)
                    : getMoizedCell(CellComponent, memoizeCell),
            };
        })),
    }), { maxSize }), [uniqueIdentifier, columns]);
    return (0, react_1.useMemo)(() => data.map(getRow), [data, getRow]);
};
exports.default = useGridRows;
//# sourceMappingURL=useGridRows.js.map