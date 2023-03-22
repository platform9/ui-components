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
const async_1 = require("../../utils/async");
const styles_1 = require("@material-ui/styles");
const Input_1 = __importDefault(require("../../elements/input/Input"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    searchBar: {
        outline: 'none',
        border: 0,
        margin: 0,
        marginRight: theme.spacing(1),
        '& > .inputFrame': {
            maxWidth: 120,
            padding: 0,
            backgroundColor: 'inherit',
            color: 'inherit',
        },
        '& .label, & .input, & .icon': {
            backgroundColor: 'inherit',
            color: 'inherit',
        },
    },
    clearIcon: {
        color: theme.palette.grey[700],
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.grey[900],
        },
        '&:active': {
            color: theme.palette.grey[700],
        },
    },
}));
function GridSearchFilter({ value: initialValue, onChange }) {
    const classes = useStyles({});
    const [value, setValue] = (0, react_1.useState)(initialValue);
    const debouncedUpdateFilterValue = (0, react_1.useMemo)(() => (0, async_1.debounce)(onChange), []);
    const handleOnChange = (0, react_1.useCallback)(async ({ target: { value } }) => {
        setValue(value);
        return debouncedUpdateFilterValue(value);
    }, []);
    (0, react_1.useEffect)(() => {
        return () => {
            debouncedUpdateFilterValue.cancel();
        };
    }, []);
    const handleClear = (0, react_1.useCallback)(() => {
        setValue('');
    }, []);
    return (
    //TODO: Add two icons here after Input is updated
    react_1.default.createElement(Input_1.default, { compact: true, icon: "search", placeholder: "Search", className: classes.searchBar, value: value !== undefined ? value : '', onChange: handleOnChange, type: "search" })
    // <TextField
    //   variant="outlined"
    //   placeholder="Search"
    //   className={classes.searchBar}
    //   value={value !== undefined ? value : ''}
    //   onChange={handleOnChange}
    //   type="search"
    //   InputProps={{
    //     classes: pick(['root', 'adornedStart', 'adornedEnd'], classes),
    //     startAdornment: (
    //       <InputAdornment position="start">
    //         <FontAwesomeIcon className={`${classes.searchIcon} searchIcon`}>search</FontAwesomeIcon>
    //       </InputAdornment>
    //     ),
    //     endAdornment: (
    //       <InputAdornment
    //         position="end"
    //         style={{ visibility: value?.length > 0 ? 'visible' : 'hidden' }}
    //       >
    //         <ClearIcon className={classes.clearIcon} color="action" onClick={handleClear} />
    //       </InputAdornment>
    //     ),
    //   }}
    // />
    );
}
exports.default = GridSearchFilter;
//# sourceMappingURL=GridSearchFilter.js.map