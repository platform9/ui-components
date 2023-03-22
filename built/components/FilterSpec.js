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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const react_1 = __importStar(require("react"));
const use_react_router_1 = __importDefault(require("use-react-router"));
const AsyncDropdown_1 = __importDefault(require("../elements/dropdown/AsyncDropdown"));
const SearchBar_1 = __importDefault(require("./SearchBar"));
const constants_1 = require("../constants");
const useStyles = styles_1.makeStyles((theme) => ({
    filtersContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        '> .wrapper': {
            maxWidth: '100%',
        },
    },
    filters: {
        marginBottom: theme.spacing(1),
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'end',
    },
}));
function Filter({ data, setFilteredData, filters, searchTarget, extraFilters = [], }) {
    const classes = useStyles({});
    const [searchTerm, setSearchTerm] = react_1.default.useState('');
    const [filterProperties, setFilterProperties] = react_1.default.useState({});
    const { history, location } = use_react_router_1.default();
    const urlParams = new URLSearchParams(location.search);
    react_1.useEffect(() => {
        const searchTerm = urlParams.get('search');
        if (searchTerm) {
            setSearchTerm(searchTerm);
        }
        filters.map((filter) => {
            const param = urlParams.get(filter.target);
            if (param) {
                filterProperties[filter.target] = param;
                setFilterProperties(Object.assign({}, filterProperties));
            }
        });
    }, [data]);
    react_1.useEffect(() => {
        setFilteredData(getFilteredData(data));
        updateUrlWithParams();
    }, [searchTerm, filterProperties]);
    const getFilteredData = (data) => {
        return filterByProperty(filterBySearch(data));
    };
    const updateUrlWithParams = () => {
        const params = {};
        // Add in all other params in the URL
        const hasFilterProperties = Object.entries(filterProperties).length > 0;
        urlParams.forEach((value, key) => {
            if (key !== 'search' && hasFilterProperties && !filterProperties.hasOwnProperty(key)) {
                params[key] = value;
            }
        });
        Object.assign(params, filterProperties);
        if (searchTerm) {
            params.search = searchTerm;
        }
        const searchParams = new URLSearchParams(params);
        history.push({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    };
    const filterBySearch = (items) => {
        return items.filter((item) => item[searchTarget].match(new RegExp(searchTerm, 'i')) !== null);
    };
    const filterByProperty = (data) => {
        let filteredData = data;
        Object.entries(filterProperties).map(([property, targetValue]) => {
            filteredData = filteredData.filter((data) => {
                return data[property] === targetValue;
            });
        });
        return filteredData;
    };
    const handleFilterUpdate = (target) => (selectedValue) => {
        if (selectedValue === constants_1.allKey) {
            delete filterProperties[target];
        }
        else {
            filterProperties[target] = selectedValue;
        }
        setFilterProperties(Object.assign({}, filterProperties));
    };
    return (react_1.default.createElement("div", { className: classes.filtersContainer },
        react_1.default.createElement("div", { className: classes.filters },
            extraFilters,
            filters.map(({ name, label, options, target }) => (react_1.default.createElement(AsyncDropdown_1.default, { key: name, name: name, label: label, items: options.map((value) => ({ value })), onChange: handleFilterUpdate(target), value: filterProperties[target] })))),
        react_1.default.createElement(SearchBar_1.default, { searchTerm: searchTerm, onSearchChange: setSearchTerm })));
}
exports.default = Filter;
//# sourceMappingURL=FilterSpec.js.map