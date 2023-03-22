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
exports.filterSpecPropType = void 0;
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/styles");
const SearchBar_1 = __importDefault(require("../../components/SearchBar"));
const react_1 = __importStar(require("react"));
const AsyncDropdown_1 = __importDefault(require("../../elements/dropdown/AsyncDropdown"));
const prop_types_1 = __importDefault(require("prop-types"));
const fp_1 = require("../../utils/fp");
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const Text_1 = __importDefault(require("../../elements/Text"));
const tooltip_1 = __importDefault(require("../../elements/tooltip"));
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        paddingRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& .MuiOutlinedInput-root': {
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(2),
        },
    },
    spacer: {
        flex: '1 1 100%',
    },
    search: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
    },
    sortBy: {
        marginRight: 0,
    },
    actions: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        color: theme.palette.text.secondary,
        width: '100%',
    },
    button: {
        cursor: 'pointer',
        fontWeight: 300,
        margin: theme.spacing(1, 1, 0, 0),
        height: theme.spacing(3),
        outline: 'none',
    },
    filters: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'left',
    },
    controls: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'right',
    },
    title: {
        flex: '0 0 auto',
    },
}));
const FilterDropdown = ({ field, type = '', label = '', onChange, value = '', items = undefined, }) => {
    switch (type) {
        case 'select':
            return (react_1.default.createElement(AsyncDropdown_1.default, { name: field, label: label, items: items, value: value || '', onChange: onChange }));
        default:
            return react_1.default.createElement("div", null);
    }
};
const CardTableToolbar = ({ title, sorting = [], orderDirection, orderBy, filters = [], filterValues, onSortChange, onDirectionSwitch, onFilterUpdate, onRefresh, onSearchChange, searchTerm, }) => {
    const classes = useStyles({});
    const sortDirection = react_1.useMemo(() => onDirectionSwitch && (react_1.default.createElement("div", null,
        react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.button, solid: true, size: "lg", "aria-label": "Change direction", onClick: onDirectionSwitch }, orderDirection === 'asc' ? 'arrow-down' : 'arrow-up'))), [orderDirection, onDirectionSwitch]);
    const refreshButton = react_1.useMemo(() => onRefresh && (react_1.default.createElement(tooltip_1.default, { message: "Refresh" },
        react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.button, solid: true, size: "lg", "aria-label": "Refresh list", onClick: onRefresh }, 'sync'))), [onRefresh]);
    return (react_1.default.createElement(core_1.Toolbar, { className: classes.root },
        title && (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: classes.title },
                react_1.default.createElement(Text_1.default, { variant: "subtitle2" }, title)),
            react_1.default.createElement("div", { className: classes.spacer }))),
        react_1.default.createElement("div", { className: classes.actions },
            react_1.default.createElement("div", { className: classes.filters }, Array.isArray(filters)
                ? filters.map((_a) => {
                    var { field, value } = _a, filterProps = __rest(_a, ["field", "value"]);
                    return (react_1.default.createElement(FilterDropdown, { key: field, 
                        // classes={classes}
                        onChange: onFilterUpdate(field), field: field, value: value !== undefined ? value : filterValues[field] }));
                })
                : filters),
            react_1.default.createElement("div", { className: classes.controls },
                sorting.length && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(AsyncDropdown_1.default, { className: classes.sortBy, disabled: false, showAll: false, name: 'sort', label: 'Sort By', items: fp_1.projectAs({ label: 'label', value: 'field' }, sorting), value: orderBy || '', onChange: onSortChange }),
                    sortDirection)),
                onSearchChange && (react_1.default.createElement(SearchBar_1.default, { className: classes.search, onSearchChange: onSearchChange, searchTerm: searchTerm })),
                refreshButton))));
};
exports.filterSpecPropType = prop_types_1.default.shape({
    field: prop_types_1.default.string.isRequired,
    label: prop_types_1.default.string,
    type: prop_types_1.default.oneOf(['select', 'multiselect', 'checkbox', 'custom']).isRequired,
    render: prop_types_1.default.func,
    filterWith: prop_types_1.default.func,
    items: prop_types_1.default.array,
});
CardTableToolbar.propTypes = {
    orderDirection: prop_types_1.default.oneOf(['asc', 'desc']),
    orderBy: prop_types_1.default.string,
    onSortChange: prop_types_1.default.func,
    onDirectionSwitch: prop_types_1.default.func,
    onSearchChange: prop_types_1.default.func,
    onRefresh: prop_types_1.default.func,
    searchTerm: prop_types_1.default.string,
    title: prop_types_1.default.string,
    filters: prop_types_1.default.oneOfType([prop_types_1.default.element, prop_types_1.default.arrayOf(exports.filterSpecPropType)]),
    filterValues: prop_types_1.default.object,
    onFilterUpdate: prop_types_1.default.func,
};
exports.default = CardTableToolbar;
//# sourceMappingURL=CardTableToolbar.js.map