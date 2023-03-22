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
const clsx_1 = __importDefault(require("clsx"));
const ramda_1 = require("ramda");
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const downshift_1 = __importDefault(require("downshift"));
const DropdownToggle_1 = __importDefault(require("./DropdownToggle"));
const DropdownMenu_1 = __importDefault(require("./DropdownMenu"));
const DropdownItem_1 = __importDefault(require("./DropdownItem"));
const DropdownInput_1 = __importDefault(require("./DropdownInput"));
const Text_1 = __importDefault(require("../Text"));
const constants_1 = require("./constants");
const useStyles_1 = __importDefault(require("./useStyles"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const helpers_1 = require("./helpers");
const blankItem = { key: '', label: '', value: null };
function Dropdown(props) {
    const { value, initialValue, itemToString = helpers_1.defaultItemToString, onChange, items, label, error, name, placeholder = 'Select an option', enableSearch, width = constants_1.dropdownDefaultWidth, noBlankValue, className, showAll = false, allLabel = 'All', allKey = constants_1.defaultAllKey, showNone = false, noneLabel = 'None', noneKey = constants_1.defaultNoneKey, compact, showClearButton = enableSearch, } = props;
    const showAllItem = react_1.useMemo(() => ({ key: allKey, label: allLabel, value: allKey }), [allKey, allLabel]);
    const showNoneItem = react_1.useMemo(() => ({ key: noneKey, label: noneLabel, value: noneKey }), [noneKey, noneLabel]);
    const input = react_1.useRef(null);
    const classes = useStyles_1.default(props);
    const handleChange = react_1.useCallback((item) => {
        onChange(item === null || item === void 0 ? void 0 : item.value);
    }, [onChange]);
    const initialSelectedItem = react_1.useMemo(() => {
        if (!ramda_1.isNil(initialValue) && !noBlankValue) {
            return items.find(({ value }) => value === initialValue);
        }
        return noBlankValue && !enableSearch
            ? showAll || showNone
                ? showAll
                    ? showAllItem
                    : showNoneItem
                : items.length
                    ? items[0]
                    : blankItem
            : blankItem;
    }, []);
    const selectedItem = react_1.useMemo(() => {
        if (showAll && (ramda_1.isNil(value) || value === allKey)) {
            return showAllItem;
        }
        if (showNone && (ramda_1.isNil(value) || value === noneKey)) {
            return showNoneItem;
        }
        if (!ramda_1.isNil(value) && !Array.isArray(value)) {
            return items.find(({ value: itemValue }) => itemValue === value) || initialSelectedItem;
        }
        return noBlankValue && !enableSearch && items.length ? items[0] : initialSelectedItem;
    }, [showAll, showNone, items, value, initialSelectedItem]);
    const getFilteredItems = react_1.useCallback((inputValue) => {
        const menuItems = [];
        if (showAll) {
            menuItems.push(showAllItem);
        }
        if (showNone) {
            menuItems.push(showNoneItem);
        }
        return items.reduce((acc, item) => {
            if (enableSearch &&
                inputValue &&
                !item.label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())) {
                return acc;
            }
            acc.push(item);
            return acc;
        }, menuItems);
    }, [items, showAll, showNone, showAllItem]);
    return (react_1.default.createElement(downshift_1.default, { initialSelectedItem: initialSelectedItem, selectedItem: onChange ? selectedItem : null, onChange: onChange ? handleChange : null, itemToString: itemToString }, ({ getInputProps, getToggleButtonProps, getMenuProps, selectItem, isOpen, clearSelection, inputValue, toggleMenu, getLabelProps, }) => (react_1.default.createElement("div", { className: clsx_1.default(classes.dropdownWrapper, 'dropdown-container', className) },
        label && (react_1.default.createElement(Text_1.default, Object.assign({ "data-testid": test_helpers_1.default(label, 'dropdown', 'label') }, getLabelProps(), { onClick: () => {
                var _a;
                toggleMenu();
                !isOpen && ((_a = input.current) === null || _a === void 0 ? void 0 : _a.focus());
            }, component: "label", variant: "inputLabel", className: clsx_1.default(classes.label, 'label') }), label)),
        react_1.default.createElement("div", { className: clsx_1.default(classes.inputFrame, 'inputFrame', {
                [classes.expandedInputFrame]: isOpen,
            }) },
            enableSearch ? (react_1.default.createElement(DropdownInput_1.default, Object.assign({}, getInputProps({
                ref: input,
                name,
                placeholder,
            })))) : (react_1.default.createElement("div", Object.assign({ "data-testid": test_helpers_1.default(label, 'dropdown', 'list') }, getToggleButtonProps(), { className: clsx_1.default(classes.placeholder, 'placeholder') }), inputValue || placeholder)),
            inputValue && (!noBlankValue || enableSearch) && showClearButton ? (react_1.default.createElement(DropdownToggle_1.default, { onClick: () => clearSelection(), "aria-label": "clear selection" },
                react_1.default.createElement(FontAwesomeIcon_1.default, { solid: true, size: "sm" }, "xmark"))) : (react_1.default.createElement(DropdownToggle_1.default, Object.assign({}, getToggleButtonProps()),
                react_1.default.createElement(FontAwesomeIcon_1.default, { solid: true, size: "sm" }, isOpen ? 'caret-up' : 'caret-down'))),
            react_1.default.createElement(DropdownMenu_1.default, Object.assign({ compact: compact, width: width, isOpen: isOpen }, getMenuProps()), isOpen
                ? getFilteredItems(inputValue).map((item) => {
                    var _a, _b;
                    return (react_1.default.createElement(DropdownItem_1.default, { "data-testid": test_helpers_1.default('dropdown', 'selection', 'value'), key: (_a = item.key) !== null && _a !== void 0 ? _a : String(item.value), onClick: item.disabled ? null : () => selectItem(item), disabled: item.disabled }, (_b = item.content) !== null && _b !== void 0 ? _b : react_1.default.createElement("span", null, itemToString(item))));
                })
                : null)),
        !!error && (react_1.default.createElement(Text_1.default, { "data-testid": test_helpers_1.default('dropdown', 'error'), variant: "body2", className: clsx_1.default(classes.error, 'error') }, error))))));
}
exports.default = Dropdown;
//# sourceMappingURL=Dropdown.js.map