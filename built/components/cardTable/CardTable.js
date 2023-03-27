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
const styles_1 = require("@material-ui/styles");
const constants_1 = require("../../constants");
const ramda_1 = require("ramda");
const react_1 = __importStar(require("react"));
const fp_1 = require("../../utils/fp");
const Progress_1 = __importDefault(require("../progress/Progress"));
const FilterToolbar_1 = __importDefault(require("./FilterToolbar"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    appCatalog: {
        width: '100%',
        marginTop: theme.spacing(2),
        minHeight: 300,
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    emptyList: {
        textAlign: 'left',
        margin: theme.spacing(1, 4),
    },
    apps: {
        display: 'grid',
        gridTemplateColumns: 'repeat( auto-fill, 368px )',
        gap: '16px',
    },
}));
const CardTable = ({ data, searchTarget, filters, filterValues, showSortOption = false, sortOptions = [], onSortChange, sortBy = 'asc', sortTarget, loading, loadingMessage, handleRefresh, children, emptyItemsMessage, }) => {
    const classes = useStyles({});
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const filter = (0, react_1.useCallback)((data) => {
        if (!filters)
            return data;
        let filteredData = data;
        filterValues.map(({ value, target, customFilterFn }) => {
            if (value && value !== constants_1.allKey) {
                filteredData = customFilterFn
                    ? customFilterFn(filteredData)
                    : filteredData.filter((item) => (0, fp_1.pathStrOr)('', target, item) === value);
            }
        });
        return filteredData;
    }, [filterValues]);
    const filterBySearch = (0, react_1.useCallback)((data) => {
        return data.filter((item) => (0, ramda_1.pathOr)('', searchTarget.split('.'), item).match(new RegExp(searchTerm, 'i')) !== null);
    }, [searchTerm, searchTarget]);
    const sort = (0, react_1.useCallback)((data) => {
        if (!showSortOption || !sortTarget) {
            return data;
        }
        const sortedData = data.sort((a, b) => {
            const aValue = (0, ramda_1.pathOr)('', sortTarget.split('.'), a);
            const bValue = (0, ramda_1.pathOr)('', sortTarget.split('.'), b);
            return aValue.toLowerCase() > bValue.toLowerCase() ? 1 : -1;
        });
        return sortBy === 'desc' ? sortedData.reverse() : sortedData;
    }, [showSortOption, sortTarget, sortBy]);
    const filteredData = (0, ramda_1.compose)(filter, filterBySearch, sort)(data);
    const hasData = (0, react_1.useMemo)(() => (filteredData === null || filteredData === void 0 ? void 0 : filteredData.length) > 0, [filteredData]);
    return (react_1.default.createElement(Progress_1.default, { overlay: true, loading: loading, renderContentOnMount: true, message: loadingMessage },
        react_1.default.createElement("div", { className: classes.appCatalog },
            react_1.default.createElement(FilterToolbar_1.default, { filters: filters, searchTerm: searchTerm, onSearchChange: setSearchTerm, showSortOption: showSortOption, sortOptions: sortOptions, onSortChange: onSortChange, sortBy: sortBy, onRefresh: handleRefresh }),
            hasData && react_1.default.createElement("div", { className: classes.apps }, filteredData.map(children)),
            !hasData && !loading && emptyItemsMessage)));
};
exports.default = CardTable;
//# sourceMappingURL=CardTable.js.map