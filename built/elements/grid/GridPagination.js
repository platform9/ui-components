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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyles = void 0;
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const dropdown_1 = __importDefault(require("../../elements/dropdown"));
const ramda_1 = require("ramda");
const clsx_1 = __importDefault(require("clsx"));
exports.useStyles = (0, styles_1.makeStyles)((theme) => ({
    navigation: {
        color: theme.components.typography.passive,
        fontSize: 14,
        display: 'flex',
        gridAutoFlow: 'column',
        justifyContent: 'space-between',
        padding: '8px 8px 8px 16px',
        minHeight: 36,
        gap: 16,
        left: 0,
    },
    pageCount: {
        width: '33%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'left',
        alignItems: 'center',
    },
    perPage: {
        width: '33%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'right',
        alignItems: 'center',
    },
    controls: {
        width: '33%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
    },
    dropdown: {
        display: 'inline-flex',
        flexFlow: 'row nowrap',
        justifyContent: 'right',
        alignItems: 'center',
        '& .inputFrame': {
            borderWidth: 1,
            marginRight: theme.spacing(1),
        },
        '& .placeholder': {
            fontWeight: 400,
        },
        '& .dropdownMenu': {
            minWidth: 50,
        },
    },
    nav: {
        textAlign: 'center',
        margin: theme.spacing(0, 2),
        fontWeight: 400,
    },
    navBtn: {
        width: 24,
        height: 24,
        borderRadius: 4,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 150ms ease',
        '&:hover': {
            backgroundColor: theme.components.table.hoverBackground,
        },
    },
    pageInput: {
        width: 20,
        margin: theme.spacing(0, 0.75),
        textAlign: 'center',
        border: `1px solid ${theme.components.table.border}`,
        color: theme.components.typography.passive,
        borderRadius: 3,
        padding: theme.spacing(0.5, 1),
        backgroundColor: 'inherit',
    },
}));
const pageSizeOptions = [5, 10, 25, 50, 100].map((value) => ({ value }));
const GridPagination = ({ paginationDisabled, rowsPerPage, currentPage, currentPageItemsCount, pagesCount, itemsCount, updateRowsPerPage, goToPage, goPrevPage, goNextPage, showResultsPerPageDropdown = true, }) => {
    const classes = (0, exports.useStyles)({});
    const pageOptions = (0, react_1.useMemo)(() => (0, ramda_1.range)(1, pagesCount + 1).map((value) => ({ value })), [pagesCount]);
    const currentItemNum = (currentPage - 1) * rowsPerPage;
    if (paginationDisabled) {
        return null;
    }
    return (react_1.default.createElement("div", { className: classes.navigation },
        react_1.default.createElement("div", { className: classes.pageCount },
            currentItemNum + 1,
            "-",
            currentItemNum + currentPageItemsCount,
            " of ",
            itemsCount,
            " items"),
        react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.controls, 'paginationControls') },
            react_1.default.createElement(FontAwesomeIcon_1.default, { disabled: currentPage === 1, "aria-hidden": "true", className: classes.navBtn, onClick: goPrevPage }, "angle-left"),
            react_1.default.createElement(Text_1.default, { component: "div", variant: "inputLabel", className: classes.nav },
                react_1.default.createElement(dropdown_1.default, { className: classes.dropdown, label: "Page", compact: true, items: pageOptions, value: currentPage, onChange: goToPage }),
                "of ",
                pagesCount),
            react_1.default.createElement(FontAwesomeIcon_1.default, { disabled: currentPage === pagesCount, "aria-hidden": "true", className: classes.navBtn, onClick: goNextPage }, "angle-right")),
        showResultsPerPageDropdown && (react_1.default.createElement("div", { className: classes.perPage },
            react_1.default.createElement(dropdown_1.default, { className: classes.dropdown, label: "Results per page", compact: true, items: pageSizeOptions, value: rowsPerPage, onChange: updateRowsPerPage })))));
};
exports.default = GridPagination;
//# sourceMappingURL=GridPagination.js.map