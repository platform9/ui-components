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
const Box_1 = __importDefault(require("@material-ui/core/Box"));
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const InputAdornment_1 = __importDefault(require("@material-ui/core/InputAdornment"));
const OutlinedInput_1 = __importDefault(require("@material-ui/core/OutlinedInput"));
const FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
const Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
const CheckBoxOutlineBlank_1 = __importDefault(require("@material-ui/icons/CheckBoxOutlineBlank"));
const CheckBox_1 = __importDefault(require("@material-ui/icons/CheckBox"));
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const core_1 = require("@material-ui/core");
const fp_1 = require("../utils/fp");
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("../elements/Text"));
const icons_1 = require("@material-ui/icons");
const test_helpers_1 = __importDefault(require("../utils/test-helpers"));
const Progress_1 = __importDefault(require("../components/progress/Progress"));
const withTooltip_1 = __importDefault(require("../elements/tooltip/withTooltip"));
const FUSE_OPTIONS = {
    keys: ['value', 'label'],
};
const useStyles = (0, styles_1.makeStyles)((theme) => (0, styles_1.createStyles)({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4, 1.5, 1.5),
        border: `1px solid ${theme.components.card.border}`,
        maxHeight: '350px',
    },
    label: {
        position: 'absolute',
        top: 4,
        backgroundColor: theme.components.card.background,
        padding: 4,
    },
    searchInputWrapper: {
        marginBottom: theme.spacing(1),
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
    formControlLabelRoot: {
        marginLeft: -6,
        margin: '2px 0',
        color: theme.components.typography.default,
    },
    checkbox: {
        padding: 4,
        color: theme.components.checkbox.color,
    },
    checkboxSize: {
        fontSize: 16,
    },
    selectDeselectCheckbox: {
        padding: theme.spacing(0, 2, 0, 0),
        justifySelf: 'flex-start',
    },
    options: {
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    optionLabel: {
        fontSize: 13,
    },
    controls: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: '40px',
    },
}));
const getOptionsHeight = (maxOptions) => maxOptions * 28;
// @deprecated Please use MultiDropdown instead
exports.default = (0, withTooltip_1.default)(function MultiSelect({ id, label, hasError, required, errorMessage, options, value: selectedValues = fp_1.emptyArr, onChange, maxOptions, maxHeight, sortSelectedFirst, className, showSelectDeselectAllOption, loading, }) {
    const classes = useStyles({});
    const [term, setTerm] = (0, react_1.useState)('');
    const fuse = (0, react_1.useMemo)(() => new fuse_js_1.default(options, FUSE_OPTIONS), [options]);
    // Change visibleOptions when we receive async changes to options.
    // `options` is originally `[]` during most async data loading.
    const sortedOptions = (0, react_1.useMemo)(() => {
        const visibleOptions = term ? fuse.search(term) : options;
        const sortBySelected = (a, b) => selectedValues.includes(b.value) && selectedValues.includes(a.value) ? 1 : -1;
        return sortSelectedFirst ? visibleOptions.sort(sortBySelected) : visibleOptions;
    }, [term, fuse, selectedValues, sortSelectedFirst]);
    const toggleOption = (0, react_1.useCallback)((value) => {
        const updatedValues = selectedValues.includes(value)
            ? selectedValues.filter((currentValue) => currentValue !== value)
            : [...selectedValues, value];
        onChange(updatedValues);
    }, [selectedValues]);
    const onHitEnter = () => {
        if (sortedOptions.length === 1) {
            toggleOption(sortedOptions[0].value);
        }
    };
    const handleSelectDeselectChange = () => {
        if (selectedValues.length > 0) {
            // Deselect All
            onChange(fp_1.emptyArr);
        }
        else {
            // Select All
            onChange(sortedOptions.map((option) => option.value));
        }
    };
    const controls = showSelectDeselectAllOption ? (react_1.default.createElement("div", { className: classes.controls },
        showSelectDeselectAllOption && (react_1.default.createElement(Checkbox_1.default, { color: "primary", className: classes.selectDeselectCheckbox, icon: react_1.default.createElement(CheckBoxOutlineBlank_1.default, { className: classes.checkboxSize }), checked: selectedValues.length > 0, checkedIcon: react_1.default.createElement(icons_1.IndeterminateCheckBox, { className: classes.checkboxSize }), onChange: handleSelectDeselectChange })),
        react_1.default.createElement(SearchField, { classes: classes, term: term, onSearchChange: setTerm, onHitEnter: onHitEnter }))) : (react_1.default.createElement(SearchField, { classes: classes, term: term, onSearchChange: setTerm, onHitEnter: onHitEnter }));
    return (react_1.default.createElement(Progress_1.default, { loading: loading, className: (0, clsx_1.default)('MuiFormControl-root', className) },
        react_1.default.createElement(FormControl_1.default, { className: classes.container, id: id, error: hasError, style: { maxHeight: maxHeight || 350 } },
            label && (react_1.default.createElement(Text_1.default, { className: classes.label, variant: "caption1" }, required ? `${label} *` : label)),
            controls,
            react_1.default.createElement(Box_1.default, { className: classes.options, style: { height: maxOptions ? getOptionsHeight(maxOptions) : 'initial' } }, sortedOptions.map((option) => (react_1.default.createElement(Option, { classes: classes, key: option.value, label: option.label, value: option.value, checked: selectedValues === null || selectedValues === void 0 ? void 0 : selectedValues.includes(option.value), onChange: () => toggleOption(option.value) })))),
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
const Option = (_a) => {
    var { classes, label, onChange } = _a, checkboxProps = __rest(_a, ["classes", "label", "onChange"]);
    return (react_1.default.createElement(FormControlLabel_1.default, { "data-testid": (0, test_helpers_1.default)('multi', 'select'), label: label, onClick: onChange, control: react_1.default.createElement(Checkbox_1.default, Object.assign({ color: "primary", className: classes.checkbox, icon: react_1.default.createElement(CheckBoxOutlineBlank_1.default, { className: classes.checkboxSize }), checkedIcon: react_1.default.createElement(CheckBox_1.default, { className: classes.checkboxSize }) }, checkboxProps)), classes: { root: classes.formControlLabelRoot, label: classes.optionLabel } }));
};
//# sourceMappingURL=MultiSelect.js.map