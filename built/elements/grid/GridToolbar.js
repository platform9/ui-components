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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("src/components/FontAwesomeIcon"));
const Text_1 = __importDefault(require("src/elements/Text"));
const dark_1 = __importDefault(require("src/theme-manager/themes/modes/dark"));
const test_helpers_1 = __importDefault(require("src/utils/test-helpers"));
// import { useCustomTheme } from 'core/themes/ThemeManager'
const GridColumnsPopover_1 = __importDefault(require("./GridColumnsPopover"));
const tooltip_1 = __importDefault(require("src/elements/tooltip"));
const ThemeManager_1 = require("src/theme-manager/ThemeManager");
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    gridToolbar: {
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: ({ selectedCount }) => selectedCount
            ? theme.components.table.activeToolbarColor
            : theme.components.table.toolbarColor,
        backgroundColor: ({ selectedCount }) => selectedCount ? theme.components.table.activeToolbar : theme.components.table.toolbar,
        transitionTimingFunction: 'ease-in',
        transition: 'background-color .2s ease',
        border: 0,
        borderRadius: '4px 4px 0 0',
        padding: '8px 16px 8px 24px',
        minHeight: 56,
        borderBottom: `1px solid ${theme.components.table.border}`,
        boxSizing: 'border-box',
        '&:last-child td': {
            borderBottom: 0,
        },
    },
    label: Object.assign(Object.assign({}, theme.typography.subtitle2), { color: 'inherit', marginRight: theme.spacing(3) }),
    selectedCount: {
        color: 'inherit',
    },
    clearBtn: {
        cursor: 'pointer',
        color: theme.components.table.toolbarPassiveColor,
    },
    verticalLine: {
        borderLeft: `1px solid ${theme.components.typography.default}`,
        width: 1,
        height: 34,
        margin: theme.spacing(0, 1),
    },
    batchActions: {
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 12,
    },
    tools: {
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        justifyContent: 'end',
        gap: 16,
    },
    buttons: {
        display: 'grid',
        gridAutoFlow: 'column',
        marginRight: theme.spacing(1),
    },
    button: Object.assign(Object.assign({}, theme.typography.inputTable), { display: 'grid', gridAutoFlow: 'column', cursor: 'pointer', alignItems: 'center', padding: theme.spacing(1, 2), borderRadius: 4, gap: 8, '&:hover': {
            backgroundColor: theme.components.table.hoverBackground,
        } }),
    extraContent: {
        marginLeft: theme.spacing(1),
    },
    tooltip: {
        display: 'inline-block',
        marginLeft: 8,
    },
}));
const DefaultToolbarContainer = (_a) => {
    var { children, selectedCount } = _a, props = __rest(_a, ["children", "selectedCount"]);
    const [theme] = (0, ThemeManager_1.useCustomTheme)();
    return (react_1.default.createElement(styles_1.ThemeProvider, { theme: selectedCount ? dark_1.default : theme },
        react_1.default.createElement("div", Object.assign({}, props), children)));
};
function GridToolbar(props) {
    const classes = useStyles(props);
    const { label, columns, columnTogglers, selectedCount, batchActions, globalFilters, filters, onRefresh, extraToolbarContent, clearSelectedRows, multiSelectionEnabled, ToolbarContainer = DefaultToolbarContainer, columnHidingDisabled, showItemsCountInLabel = false, itemsCount = undefined, tooltip = undefined, } = props;
    return (react_1.default.createElement(ToolbarContainer, { selectedCount: selectedCount, className: classes.gridToolbar },
        react_1.default.createElement("div", { className: classes.batchActions },
            react_1.default.createElement(Text_1.default, { "data-testid": (0, test_helpers_1.default)(label, 'label'), className: classes.label, variant: "subtitle2", component: "p" },
                showItemsCountInLabel && itemsCount ? `${label} (${itemsCount})` : label,
                tooltip && (react_1.default.createElement(tooltip_1.default, { className: classes.tooltip, message: tooltip },
                    react_1.default.createElement(FontAwesomeIcon_1.default, null, "question-circle")))),
            selectedCount ? (react_1.default.createElement(react_1.default.Fragment, null,
                multiSelectionEnabled ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Text_1.default, { "data-testid": (0, test_helpers_1.default)('selected'), variant: "body2", className: classes.selectedCount, component: "p" }, `${selectedCount} Selected`),
                    react_1.default.createElement(Text_1.default, { "data-testid": (0, test_helpers_1.default)('clear', 'all'), variant: "body2", className: classes.clearBtn, component: "p", onClick: clearSelectedRows }, `Clear All`),
                    react_1.default.createElement("div", { className: classes.verticalLine }))) : null, batchActions === null || batchActions === void 0 ? void 0 :
                batchActions.map((_a) => {
                    var { key, label, triggerAction, BatchActionButton } = _a, props = __rest(_a, ["key", "label", "triggerAction", "BatchActionButton"]);
                    return (react_1.default.createElement(BatchActionButton, Object.assign({}, props, { key: key, onClick: triggerAction }), label));
                }))) : null),
        react_1.default.createElement("div", { "data-testid": (0, test_helpers_1.default)('search'), className: classes.tools },
            globalFilters.map((_a) => {
                var { key, filterValue, filterValues, updateFilterValue, FilterComponent } = _a, rest = __rest(_a, ["key", "filterValue", "filterValues", "updateFilterValue", "FilterComponent"]);
                return (react_1.default.createElement(FilterComponent, Object.assign({ key: String(key), value: filterValue, filterValues: filterValues, onChange: updateFilterValue }, rest)));
            }),
            !selectedCount ? (react_1.default.createElement("div", { className: classes.buttons },
                !columnHidingDisabled && (react_1.default.createElement(GridColumnsPopover_1.default, { columns: columns, columnTogglers: columnTogglers })),
                react_1.default.createElement(Text_1.default, { "data-testid": (0, test_helpers_1.default)('refresh'), noWrap: true, onClick: onRefresh, component: "div", className: classes.button },
                    react_1.default.createElement(FontAwesomeIcon_1.default, null, "sync-alt"),
                    "Refresh"))) : null,
            filters.map((_a) => {
                var { key, filterValue, filterValues, updateFilterValue, FilterComponent } = _a, rest = __rest(_a, ["key", "filterValue", "filterValues", "updateFilterValue", "FilterComponent"]);
                return (react_1.default.createElement(FilterComponent, Object.assign({ key: String(key), value: filterValue, filterValues: filterValues, onChange: updateFilterValue }, rest)));
            }),
            extraToolbarContent ? (react_1.default.createElement("div", { className: classes.extraContent }, extraToolbarContent)) : null)));
}
exports.default = GridToolbar;
//# sourceMappingURL=GridToolbar.js.map