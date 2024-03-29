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
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const store_1 = __importStar(require("./store"));
const ThemeManager_1 = __importDefault(require("./theme-manager/ThemeManager"));
const Grid_1 = __importDefault(require("./elements/grid/Grid"));
const movies_list_1 = __importDefault(require("./stories/data/movies-list"));
const ramda_1 = require("ramda");
const GridDefaultDeleteButton_1 = __importDefault(require("./elements/grid/buttons/GridDefaultDeleteButton"));
// For testing purposes only. This is just to simulate what the
// app consuming this plugin would look like
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
        key: 'plot',
        label: 'Plot',
        disableSorting: true,
        width: 'large',
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
const App = () => {
    const [items, dispatch] = (0, react_1.useReducer)(itemActionsReducer, movies_list_1.default);
    const batchActions = (0, react_1.useMemo)(() => [
        {
            handleAction: (selectedItems) => {
                // eslint-disable-next-line no-restricted-globals
                if (confirm('Are you sure?')) {
                    dispatch({ type: 'remove', payload: { selectedItems } });
                    return true;
                }
                return false;
            },
            BatchActionButton: GridDefaultDeleteButton_1.default,
        },
    ], []);
    const rowMenuItems = [
        { title: 'Basic Actions' },
        {
            cond: () => true,
            label: 'Edit',
            icon: 'edit',
            handleClick: () => alert('Action triggered'),
            refreshAfterSuccess: true,
            onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
        },
        {
            cond: (item) => false,
            label: 'Delete',
            icon: 'trash',
            handleClick: () => alert('Action triggered'),
            refreshAfterSuccess: true,
            onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
        },
        { title: 'Advanced Actions' },
        {
            cond: () => true,
            label: 'Upgrade',
            icon: 'level-up',
            handleClick: () => alert('Action triggered'),
            refreshAfterSuccess: true,
            onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
        },
    ];
    return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
        react_1.default.createElement(ThemeManager_1.default, { themeActions: store_1.themeActions },
            react_1.default.createElement(Grid_1.default, { label: "Label", uniqueIdentifier: "id", columns: columns, data: items, multiSelection: true, batchActions: batchActions, onRefresh: () => dispatch({ type: 'refresh', payload: {} }), rowMenuItems: rowMenuItems, rowMenuOffset: { vertical: 40 } }))));
};
exports.default = App;
//# sourceMappingURL=App.js.map