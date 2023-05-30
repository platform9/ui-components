"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const Text_1 = __importDefault(require("../../elements/Text"));
const dark_1 = __importDefault(require("../../theme-manager/themes/modes/dark"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
// import { useCustomTheme } from 'core/themes/ThemeManager'
const GridColumnsPopover_1 = __importDefault(require("./GridColumnsPopover"));
const tooltip_1 = __importDefault(require("../../elements/tooltip"));
const ThemeManager_1 = require("../../theme-manager/ThemeManager");
const useToggler_1 = __importDefault(require("../../hooks/useToggler"));
const fp_1 = require("../../utils/fp");
const ramda_1 = require("ramda");
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
    filterBar: {
        transition: 'height .2s ease',
        height: ({ filtersOpen }) => (filtersOpen ? 'max-content' : 0),
        overflow: ({ filtersOpen }) => (filtersOpen ? 'visible' : 'hidden'),
        padding: ({ filtersOpen }) => (filtersOpen ? '16px' : '0px'),
        background: theme.components.table.hoverBackground,
        display: 'grid',
        gap: 16,
    },
    filterDropdowns: {
        display: 'flex',
        gap: 16,
        alignItems: 'center',
    },
    activeFilters: {
        display: 'flex',
        gap: 16,
    },
    activeFilterBox: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, max-content)',
        gap: 8,
        alignItems: 'center',
        padding: '4px 12px',
        background: theme.components.table.background,
        border: `1px solid ${theme.components.table.border}`,
    },
    activeFilterText: {
        fontSize: 12,
    },
}));
const DefaultToolbarContainer = (_a) => {
    var { children, selectedCount } = _a, props = __rest(_a, ["children", "selectedCount"]);
    const [theme] = (0, ThemeManager_1.useCustomTheme)();
    return (react_1.default.createElement(styles_1.ThemeProvider, { theme: selectedCount ? dark_1.default : theme },
        react_1.default.createElement("div", Object.assign({}, props), children)));
};
function GridToolbar(props) {
    const [isOpen, toggleIsOpen] = (0, useToggler_1.default)(false);
    const classes = useStyles(Object.assign(Object.assign({}, props), { filtersOpen: isOpen }));
    const { label, columns, columnTogglers, selectedCount, batchActions, globalFilters, filters, dropdownFilters, dropdownFilterValues, dropdownValuesByKey, onRefresh, extraToolbarContent, clearSelectedRows, multiSelectionEnabled, ToolbarContainer = DefaultToolbarContainer, columnHidingDisabled, showItemsCountInLabel = false, itemsCount = undefined, tooltip = undefined, } = props;
    const removeFilterValue = (0, react_1.useCallback)((filterValue) => {
        const keyValues = (0, fp_1.ensureArray)(dropdownValuesByKey[filterValue.key]);
        const filteredKeyValues = keyValues.filter((val) => {
            return !(0, ramda_1.equals)(val, filterValue.value);
        });
        filterValue.updateFilterValue(filteredKeyValues);
    }, [dropdownValuesByKey]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ToolbarContainer, { selectedCount: selectedCount, className: classes.gridToolbar },
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
                        "Refresh"),
                    !!(dropdownFilters === null || dropdownFilters === void 0 ? void 0 : dropdownFilters.length) && (react_1.default.createElement(Text_1.default, { noWrap: true, component: "div", className: classes.button, onClick: toggleIsOpen },
                        react_1.default.createElement(FontAwesomeIcon_1.default, null, "filter"),
                        "Filters",
                        react_1.default.createElement(FontAwesomeIcon_1.default, null, isOpen ? 'angle-up' : 'angle-down'))))) : null,
                filters.map((_a) => {
                    var { key, filterValue, filterValues, updateFilterValue, FilterComponent } = _a, rest = __rest(_a, ["key", "filterValue", "filterValues", "updateFilterValue", "FilterComponent"]);
                    return (react_1.default.createElement(FilterComponent, Object.assign({ key: String(key), value: filterValue, filterValues: filterValues, onChange: updateFilterValue }, rest)));
                }),
                extraToolbarContent ? (react_1.default.createElement("div", { className: classes.extraContent }, extraToolbarContent)) : null)),
        react_1.default.createElement("div", { className: classes.filterBar },
            react_1.default.createElement("div", { className: classes.filterDropdowns },
                react_1.default.createElement(Text_1.default, { variant: "caption1" }, "Filters:"), dropdownFilters === null || dropdownFilters === void 0 ? void 0 :
                dropdownFilters.map(({ key, filterValue, updateFilterValue, FilterComponent, filterComponentProps }) => (react_1.default.createElement(FilterComponent, Object.assign({ key: key, value: filterValue, onChange: updateFilterValue }, filterComponentProps))))),
            !!(dropdownFilterValues === null || dropdownFilterValues === void 0 ? void 0 : dropdownFilterValues.length) && (react_1.default.createElement("div", { className: classes.activeFilters }, dropdownFilterValues === null || dropdownFilterValues === void 0 ? void 0 : dropdownFilterValues.map((filterInfo) => (react_1.default.createElement("div", { key: filterInfo === null || filterInfo === void 0 ? void 0 : filterInfo.display, className: classes.activeFilterBox },
                react_1.default.createElement(Text_1.default, { variant: "body2", className: classes.activeFilterText },
                    react_1.default.createElement("b", null, filterInfo === null || filterInfo === void 0 ? void 0 :
                        filterInfo.label,
                        ":"),
                    " ", filterInfo === null || filterInfo === void 0 ? void 0 :
                    filterInfo.display),
                react_1.default.createElement(FontAwesomeIcon_1.default, { onClick: () => {
                        removeFilterValue(filterInfo);
                    }, size: "md" }, "xmark")))))))));
}
exports.default = GridToolbar;
//# sourceMappingURL=GridToolbar.js.map