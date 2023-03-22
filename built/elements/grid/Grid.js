"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGridContext = exports.GridContext = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const useGridRows_1 = __importDefault(require("./hooks/useGridRows"));
const useGridRowMenu_1 = __importDefault(require("./hooks/useGridRowMenu"));
const GridEmptyContent_1 = __importDefault(require("./GridEmptyContent"));
const GridRow_1 = __importDefault(require("./GridRow"));
const GridPagination_1 = __importDefault(require("./GridPagination"));
const useGridPagination_1 = __importDefault(require("./hooks/useGridPagination"));
const useGridSorting_1 = __importDefault(require("./hooks/useGridSorting"));
const GridHeader_1 = __importDefault(require("./GridHeader"));
const useGridFiltering_1 = __importDefault(require("./hooks/useGridFiltering"));
const GridToolbar_1 = __importDefault(require("./GridToolbar"));
const Progress_1 = __importDefault(require("../../components/progress/Progress"));
const useGridSelectableRows_1 = __importDefault(require("./hooks/useGridSelectableRows"));
const useGridManagedColumns_1 = __importDefault(require("./hooks/useGridManagedColumns"));
const useStyles = styles_1.makeStyles((theme) => ({
    noTableBorder: {
        borderColor: 'transparent !important',
        borderWidth: '0 !important',
    },
    gridContainer: {
        display: 'grid',
        minWidth: '100%',
        maxWidth: 'max-content',
        backgroundColor: theme.components.table.background,
        borderRadius: 4,
        border: `1px solid ${theme.components.table.border}`,
        boxSizing: 'border-box',
    },
    grid: {
        minWidth: '100%',
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        fontWeight: 400,
        lineHeight: 1.42857,
        textRendering: 'optimizeLegibility',
        border: 'none',
        borderBottom: `1px solid ${theme.components.table.border}`,
    },
    gridBody: {
        overflow: 'auto',
    },
    tr: {
        position: 'relative',
        border: 0,
        height: 56,
        transition: 'background-color 150ms ease',
        borderBottom: `1px solid ${theme.components.table.border}`,
        '&:last-child td': {
            borderBottom: 0,
        },
        '&:hover': {
            backgroundColor: theme.components.table.hoverBackground,
        },
    },
    td: Object.assign(Object.assign({ border: 0, margin: 0, padding: theme.spacing(1) }, theme.typography.body2), { '&:first-child': {
            borderLeft: 'none',
            paddingLeft: 16,
        }, '&:last-child': {
            borderRight: 'none',
            paddingRight: 16,
        }, '& > .checkbox': {
            padding: 4,
            marginLeft: -4,
            width: 16,
        } }),
    cell: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
}));
exports.GridContext = react_1.default.createContext({});
/**
 * Convenience shortcut for `useContext<GridContextType<T>>(GridContext)`
 */
function useGridContext() {
    return react_1.useContext(exports.GridContext);
}
exports.useGridContext = useGridContext;
function Grid(configProps) {
    var _a;
    const classes = useStyles(configProps);
    const { onRefresh, emptyContent = 'No data found', disableToolbar = false, extraToolbarContent, loading = false, loadingMessage, compact, label, ToolbarContainer, showItemsCountInLabel, tooltip, } = configProps;
    const rows = useGridRows_1.default(configProps);
    const [rowsWithActions, rowActionsProps] = useGridRowMenu_1.default(rows, configProps);
    const [selectableRows, rowBatchActionsProps] = useGridSelectableRows_1.default(rowsWithActions, configProps);
    const [filteredRows, filteringProps] = useGridFiltering_1.default(selectableRows, configProps);
    const [sortedRows, sortingProps] = useGridSorting_1.default(filteredRows, configProps);
    const [pageRows, paginationProps] = useGridPagination_1.default(sortedRows, configProps);
    const [colManagedRows, columnProps] = useGridManagedColumns_1.default(pageRows, configProps);
    const contextValue = react_1.useMemo(() => ({
        triggerRefresh: onRefresh,
        selectedItems: rowBatchActionsProps.selectedItems,
        clearSelectedRows: rowBatchActionsProps.clearSelectedRows,
    }), [onRefresh, rowBatchActionsProps.selectedItems, rowBatchActionsProps.clearSelectedRows]);
    return (react_1.default.createElement(Progress_1.default, { overlay: true, loading: loading, message: loadingMessage },
        react_1.default.createElement(exports.GridContext.Provider, { value: contextValue },
            react_1.default.createElement("div", { className: clsx_1.default(classes.gridContainer, 'grid-container', {
                    [classes.noTableBorder]: (!colManagedRows.length && compact) || (compact && disableToolbar),
                }) },
                disableToolbar ? null : (react_1.default.createElement(GridToolbar_1.default, Object.assign({ ToolbarContainer: ToolbarContainer, compact: compact, label: label, showItemsCountInLabel: showItemsCountInLabel, itemsCount: paginationProps === null || paginationProps === void 0 ? void 0 : paginationProps.itemsCount, onRefresh: onRefresh, extraToolbarContent: extraToolbarContent, tooltip: tooltip }, columnProps, filteringProps, rowBatchActionsProps))),
                react_1.default.createElement("section", { className: clsx_1.default(classes.gridBody, 'thin-scrollbar') }, colManagedRows.length ? (react_1.default.createElement("table", { className: classes.grid },
                    react_1.default.createElement(GridHeader_1.default, Object.assign({}, columnProps, sortingProps, rowBatchActionsProps, { rowMenuItemsLength: (_a = rowActionsProps.rowMenuItems) === null || _a === void 0 ? void 0 : _a.length, pageRows: pageRows })),
                    react_1.default.createElement("tbody", null, colManagedRows.map((_a, index) => {
                        var { key } = _a, rowProps = __rest(_a, ["key"]);
                        return (react_1.default.createElement(GridRow_1.default, Object.assign({ key: key, className: classes.tr, tdClassName: classes.td, cellClassName: classes.cell, index: index, numPageItems: paginationProps === null || paginationProps === void 0 ? void 0 : paginationProps.currentPageItemsCount }, rowProps, rowActionsProps, rowBatchActionsProps)));
                    })))) : (react_1.default.createElement(GridEmptyContent_1.default, null, loading ? '' : emptyContent))),
                sortedRows.length && (!compact || sortedRows.length > paginationProps.rowsPerPage) ? (react_1.default.createElement(GridPagination_1.default, Object.assign({}, paginationProps))) : null))));
}
exports.default = Grid;
//# sourceMappingURL=Grid.js.map