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
exports.AsyncGrid = exports.UncontrolledGrid = void 0;
/* eslint-disable no-restricted-globals */
const react_1 = __importStar(require("react"));
const movies_list_1 = __importDefault(require("../data/movies-list"));
const ramda_1 = require("ramda");
const useGridSorting_1 = require("../../elements/grid/hooks/useGridSorting");
const fp_1 = require("../../utils/fp");
const grid_1 = __importDefault(require("../../elements/grid"));
const GridDefaultDeleteButton_1 = __importDefault(require("../../elements/grid/buttons/GridDefaultDeleteButton"));
const GridSearchFilter_1 = __importDefault(require("../../elements/grid/GridSearchFilter"));
const containers_1 = require("../containers");
const dropdown_1 = __importDefault(require("../../elements/dropdown"));
const GridDefaultActionButton_1 = __importDefault(require("../../elements/grid/buttons/GridDefaultActionButton"));
const sortNumbers = (valA, valB) => valA - valB;
const columns = [
    {
        key: 'id',
        label: 'ID',
        display: false,
    },
    {
        key: 'title',
        label: 'Title',
        tooltip: 'The title of the movie',
    },
    {
        key: 'director',
        label: 'Director',
        width: 'small',
    },
    {
        key: 'actors',
        label: 'Actors',
        width: 'medium',
    },
    {
        key: 'year',
        label: 'Year',
        sortFn: sortNumbers,
        width: 'small',
    },
    {
        key: 'runtime',
        label: 'Runtime',
        accessor: (item) => item.runtime,
        sortFn: sortNumbers,
        formatFn: (val) => `${val} min`,
        width: 'small',
    },
    {
        key: 'genres',
        label: 'Genres',
        width: 'medium',
        formatFn: (value) => value.join(', '),
        sortFn: (genresA, genresB) => genresA.join('-').localeCompare(genresB.join('-')),
        // Explicitly typing the column gives strongly typed arguments
    },
    {
        key: 'plot',
        label: 'Plot',
        disableSorting: true,
        width: 'large',
    },
];
const rowMenuItems = [
    {
        cond: () => true,
        label: 'Foo Action',
        icon: 'edit',
        handleClick: () => alert('Action triggered'),
        refreshAfterSuccess: true,
        onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
    },
    {
        cond: () => true,
        label: 'Bar Action',
        icon: 'level-up',
        handleClick: () => alert('Action triggered'),
        refreshAfterSuccess: true,
        onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
    },
    {
        cond: (item) => false,
        label: 'Disabled Action',
        icon: 'trash',
        handleClick: () => alert('Action triggered'),
        refreshAfterSuccess: true,
        onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
    },
];
const globalFilters = [
    {
        key: 'search',
        equalityComparerFn: (item, value) => {
            return (item.director.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
                item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
        },
        FilterComponent: GridSearchFilter_1.default,
    },
];
const years = (0, ramda_1.uniq)(movies_list_1.default.map(({ year }) => +year).sort((a, b) => a - b)).map((year) => ({
    value: year,
}));
const YearFilter = (props) => {
    return react_1.default.createElement(dropdown_1.default, Object.assign({}, props, { label: "Years:", compact: true, showAll: true, allKey: "", items: years }));
};
const genres = (0, ramda_1.uniq)(movies_list_1.default.map(({ genres }) => genres).flat()).map((genre) => ({
    value: genre,
}));
const GenreFilter = (props) => {
    return react_1.default.createElement(dropdown_1.default, Object.assign({}, props, { label: "Genres:", compact: true, showAll: true, allKey: "", items: genres }));
};
const filters = [
    {
        columnKey: 'year',
        FilterComponent: YearFilter,
    },
    {
        columnKey: 'genres',
        FilterComponent: GenreFilter,
        equalityComparerFn: (itemValue, value) => itemValue.includes(value),
    },
];
const itemActionsReducer = (items, { type, payload: { selectedItems } }) => {
    switch (type) {
        case 'refresh':
            return movies_list_1.default;
        case 'remove':
        default:
            return (0, ramda_1.without)(selectedItems, items);
    }
};
const UncontrolledGrid = (args) => {
    const [items, dispatch] = (0, react_1.useReducer)(itemActionsReducer, movies_list_1.default);
    const batchActions = (0, react_1.useMemo)(() => [
        {
            handleAction: (selectedItems) => {
                if (confirm('Are you sure?')) {
                    dispatch({ type: 'remove', payload: { selectedItems } });
                    return true;
                }
                return false;
            },
            BatchActionButton: GridDefaultDeleteButton_1.default,
        },
    ], []);
    return (react_1.default.createElement(containers_1.ThemedContainer, null,
        react_1.default.createElement(grid_1.default, Object.assign({}, args, { extraToolbarContent: react_1.default.createElement(GridDefaultActionButton_1.default, { onClick: () => alert('Add Dialog placeholder') }, "Add Movie"), label: "Label", uniqueIdentifier: "id", columns: columns, data: items, globalFilters: globalFilters, filters: filters, multiSelection: true, batchActions: batchActions, rowMenuItems: rowMenuItems, onRefresh: () => dispatch({ type: 'refresh', payload: {} }) }))));
};
exports.UncontrolledGrid = UncontrolledGrid;
async function awaitSeconds(seconds = 1) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}
const rowsPerPage = 10;
const AsyncGrid = (args) => {
    const [loadingCount, setLoadingCount] = (0, react_1.useState)(0);
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [pageSize, setPageSize] = (0, react_1.useState)(rowsPerPage);
    const [filterValues, setFilterValues] = (0, react_1.useState)({
        search: null,
        year: null,
        genres: null,
    });
    const [{ orderBy, orderDirection }, setSorting] = (0, react_1.useState)(useGridSorting_1.defaultSortingState);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [items, dispatch] = (0, react_1.useReducer)(itemActionsReducer, movies_list_1.default);
    const batchActions = (0, react_1.useMemo)(() => [
        {
            handleAction: async (selectedItems) => {
                if (confirm('Are you sure?')) {
                    dispatch({ type: 'remove', payload: { selectedItems } });
                    await dummyLoadDataAsync();
                    return true;
                }
                return false;
            },
            BatchActionButton: GridDefaultDeleteButton_1.default,
        },
    ], []);
    const dummyLoadDataAsync = (0, react_1.useCallback)(async () => {
        setLoading(true);
        await awaitSeconds();
        setLoading(false);
        setLoadingCount(loadingCount + 1);
    }, [loadingCount]);
    const handleRefresh = (0, react_1.useCallback)(async () => {
        dispatch({ type: 'refresh', payload: {} });
        await dummyLoadDataAsync();
    }, []);
    const asyncGlobalFilters = (0, react_1.useMemo)(() => [
        {
            key: 'search',
            initialValue: '',
            controlled: true,
            equalityComparerFn: (item, value) => {
                return (item.director.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
                    item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
            },
            FilterComponent: GridSearchFilter_1.default,
            onChange: (search) => {
                setFilterValues(Object.assign(Object.assign({}, filterValues), { search }));
            },
        },
    ], [filterValues]);
    const asyncFilters = (0, react_1.useMemo)(() => [
        {
            columnKey: 'year',
            initialValue: '',
            FilterComponent: YearFilter,
            controlled: true,
            onChange: (year) => {
                setFilterValues(Object.assign(Object.assign({}, filterValues), { year }));
            },
        },
        {
            columnKey: 'genres',
            initialValue: '',
            FilterComponent: GenreFilter,
            controlled: true,
            equalityComparerFn: (itemValue, value) => itemValue.includes(value),
            onChange: (genres) => {
                setFilterValues(Object.assign(Object.assign({}, filterValues), { genres }));
            },
        },
    ], [filterValues]);
    const handlePageChange = (0, react_1.useCallback)((page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    }, [currentPage, pageSize]);
    const handleSortBy = (0, react_1.useCallback)((sortedBy, sortedDirection) => {
        setSorting({ orderBy: sortedBy, orderDirection: sortedDirection });
    }, []);
    const getParsedData = (0, react_1.useCallback)(() => {
        const globalFilteredItems = asyncGlobalFilters.reduce((items, { key, equalityComparerFn = ramda_1.equals }) => {
            if (!(0, fp_1.isNilOrEmpty)(filterValues[key])) {
                return items.filter((item) => equalityComparerFn(item, filterValues[key]));
            }
            return items;
        }, items);
        const filteredItems = asyncFilters.reduce((items, { columnKey, equalityComparerFn = ramda_1.equals }) => {
            if (!(0, fp_1.isNilOrEmpty)(filterValues[columnKey])) {
                return items.filter((item) => equalityComparerFn(item[columnKey], filterValues[columnKey]));
            }
            return items;
        }, globalFilteredItems);
        const sortedItems = ((items) => {
            if (!orderBy) {
                return items;
            }
            const sortByColumn = columns.find(({ key }) => key === orderBy);
            const { disableSorting = false, sortFn = useGridSorting_1.defaultSortWith } = sortByColumn;
            const sortedItemsTmp = disableSorting
                ? items
                : (0, ramda_1.sort)((a, b) => sortFn(b[orderBy], a[orderBy]), items);
            return orderDirection === 'desc' ? (0, ramda_1.reverse)(sortedItemsTmp) : sortedItemsTmp;
        })(filteredItems);
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        return sortedItems.slice(startIdx, endIdx);
    }, [items, filterValues, orderBy, orderDirection, currentPage, pageSize]);
    const parsedData = (0, react_1.useMemo)(() => {
        if (!loadingCount) {
            return [];
        }
        return getParsedData();
    }, [loadingCount, items]);
    (0, react_1.useEffect)(() => {
        dummyLoadDataAsync();
    }, []);
    (0, react_1.useEffect)(() => {
        dummyLoadDataAsync();
    }, [filterValues, currentPage, pageSize, orderBy, orderDirection]);
    return (react_1.default.createElement(containers_1.ThemedContainer, null,
        react_1.default.createElement(grid_1.default, Object.assign({}, args, { extraToolbarContent: react_1.default.createElement(GridDefaultActionButton_1.default, { onClick: () => alert('Add Dialog placeholder') }, "Add Movie"), label: "Label", totalItems: items.length, rowsPerPage: rowsPerPage, loading: loading, controlledPagination: true, controlledSorting: true, onPageChange: handlePageChange, onSortChange: handleSortBy, uniqueIdentifier: "id", columns: columns, data: parsedData, globalFilters: asyncGlobalFilters, filters: asyncFilters, batchActions: batchActions, rowMenuItems: rowMenuItems, onRefresh: handleRefresh, multiSelection: true }))));
};
exports.AsyncGrid = AsyncGrid;
exports.UncontrolledGrid.parameters = {
    docs: {
        source: {
            code: `
  import Grid from 'core/elements/grid'

  const DefaultGrid = () => (
    <Grid columns={columns} data={data} />
  )
`,
        },
    },
};
exports.UncontrolledGrid.args = {
    size: 'large',
};
const GridStories = {
    title: 'Elements/Grid',
    component: grid_1.default,
    argTypes: {
        onBeforePageChange: {
            action: 'beforePageChange',
        },
    },
};
exports.default = GridStories;
//# sourceMappingURL=grid.stories.js.map