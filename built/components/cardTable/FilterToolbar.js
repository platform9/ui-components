"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const AsyncDropdown_1 = __importDefault(require("../../elements/dropdown/AsyncDropdown"));
const SearchBar_1 = __importDefault(require("../SearchBar"));
const RefreshButton_1 = __importDefault(require("../buttons/RefreshButton"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '32px',
    },
    filters: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifySelf: 'start',
    },
    controls: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'baseline',
        gap: '16px',
        justifySelf: 'end',
    },
}));
function FilterToolbar({ filters, showSortOption = false, sortOptions = [], onSortChange, sortBy, searchTerm, onSearchChange, onRefresh, className, }) {
    const classes = useStyles();
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.toolbar, className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.controls, 'controls') },
            onRefresh && react_1.default.createElement(RefreshButton_1.default, { onRefresh: onRefresh }),
            react_1.default.createElement(SearchBar_1.default, { searchTerm: searchTerm, onSearchChange: onSearchChange })),
        react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.filters, 'filters') },
            filters,
            showSortOption && (react_1.default.createElement(AsyncDropdown_1.default, { onChange: onSortChange, items: sortOptions, value: sortBy, name: "sort", label: "Sort", showAll: false, compact: true, selectFirst: true })))));
}
exports.default = FilterToolbar;
//# sourceMappingURL=FilterToolbar.js.map