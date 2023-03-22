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
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const Box_1 = __importDefault(require("@material-ui/core/Box"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const InputAdornment_1 = __importDefault(require("@material-ui/core/InputAdornment"));
const OutlinedInput_1 = __importDefault(require("@material-ui/core/OutlinedInput"));
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("../elements/Text"));
const radio_fields_1 = __importDefault(require("./validatedForm/radio-fields"));
const FUSE_OPTIONS = {
    keys: ['value', 'label'],
};
const useStyles = styles_1.makeStyles((theme) => styles_1.createStyles({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2, 1, 1, 1),
        borderRadius: 4,
        border: `1px solid ${theme.palette.grey[400]}`,
        maxHeight: '350px',
    },
    label: {
        position: 'absolute',
        top: -12,
        backgroundColor: theme.components.card.background,
        padding: 4,
    },
    searchInputWrapper: {
        marginBottom: 4,
    },
    notchedOutline: {
        borderRadius: 0,
    },
    input: {
        boxSizing: 'border-box',
        height: 28,
        padding: 6,
        fontSize: 13,
    },
    adornedStart: {
        paddingLeft: 8,
    },
    searchIcon: {
        color: '#BABABA',
    },
    positionStart: {
        marginRight: 0,
    },
    options: {
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
}));
const SingleSelect = react_1.default.forwardRef(({ id, label, hasError, required, errorMessage, options, value, onChange, maxOptions, sortSelectedFirst, className, }, ref) => {
    const classes = useStyles({});
    const [term, setTerm] = react_1.useState('');
    const fuse = react_1.useMemo(() => new fuse_js_1.default(options, FUSE_OPTIONS), [options]);
    // Change visibleOptions when we receive async changes to options.
    // `options` is originally `[]` during most async data loading.
    const sortedOptions = react_1.useMemo(() => {
        const visibleOptions = term ? fuse.search(term) : options;
        const sortBySelected = (a, b) => (value === b.value - value) === a.value;
        return sortSelectedFirst ? visibleOptions.sort(sortBySelected) : visibleOptions;
    }, [term, fuse, value, sortSelectedFirst]);
    const toggleOption = (value) => {
        onChange(value);
    };
    const onHitEnter = () => {
        if (sortedOptions.length === 1) {
            toggleOption(sortedOptions[0].value);
        }
    };
    return (react_1.default.createElement("div", { className: clsx_1.default('MuiFormControl-root', className) },
        react_1.default.createElement(FormControl_1.default, { className: classes.container, id: id, error: hasError, ref: ref },
            react_1.default.createElement(Text_1.default, { className: classes.label, variant: "caption1" }, required ? `${label} *` : label),
            react_1.default.createElement(SearchField, { classes: classes, term: term, onSearchChange: setTerm, onHitEnter: onHitEnter }),
            react_1.default.createElement(Box_1.default, { className: classes.options, style: { height: maxOptions ? getOptionsHeight(maxOptions) : 'initial' } },
                react_1.default.createElement(radio_fields_1.default, { id: id, key: id, options: sortedOptions, value: value, onChange: onChange })),
            errorMessage && react_1.default.createElement(core_1.FormHelperText, null, errorMessage))));
});
const SearchField = ({ classes, term, onSearchChange, onHitEnter }) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onHitEnter();
        }
        else if (event.key === 'Escape') {
            onSearchChange('');
        }
    };
    return (react_1.default.createElement(FormControl_1.default, { className: classes.searchInputWrapper },
        react_1.default.createElement(OutlinedInput_1.default, { value: term, onChange: (e) => onSearchChange(e.target.value), onKeyDown: handleKeyDown, startAdornment: react_1.default.createElement(InputAdornment_1.default, { position: "start", classes: { positionStart: classes.positionStart } },
                react_1.default.createElement(Search_1.default, { className: classes.searchIcon })), classes: {
                notchedOutline: classes.notchedOutline,
                input: classes.input,
                adornedStart: classes.adornedStart,
            } })));
};
const getOptionsHeight = (maxOptions) => maxOptions * 28;
exports.default = SingleSelect;
//# sourceMappingURL=SingleSelect.js.map