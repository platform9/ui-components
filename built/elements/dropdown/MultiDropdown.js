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
const MultiDownshift_1 = __importDefault(require("./MultiDownshift"));
const DropdownToggle_1 = __importDefault(require("./DropdownToggle"));
const DropdownMenu_1 = __importDefault(require("./DropdownMenu"));
const clsx_1 = __importDefault(require("clsx"));
const DropdownItem_1 = __importDefault(require("./DropdownItem"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const DropdownInput_1 = __importDefault(require("./DropdownInput"));
const Text_1 = __importDefault(require("../Text"));
const useStyles_1 = __importDefault(require("./useStyles"));
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
const ramda_1 = require("ramda");
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const fp_1 = require("../../utils/fp");
function MultiDropdown(props) {
    const input = (0, react_1.useRef)(null);
    const classes = (0, useStyles_1.default)(props);
    const { value: selectedValues, itemToString = helpers_1.defaultItemToString, onChange, items, label, error, name, placeholder = 'Select an option', enableSearch, width = constants_1.dropdownDefaultWidth, className, multiline, noCheckboxes, compact, id, showAll = false, optionToggleCondition, preventUnselectLast, } = props;
    const maxItems = (width > 240 ? 3 : 2) * (multiline ? 4 : 1);
    const selectedItems = (0, react_1.useMemo)(() => selectedValues
        ? items.filter(({ value }) => selectedValues.includes(value))
        : (0, fp_1.getTypedEmptyArr)(), [selectedValues, items]);
    const handleMultiChange = (0, react_1.useCallback)((items) => {
        if (!(0, ramda_1.equals)(items, selectedItems)) {
            onChange(items === null || items === void 0 ? void 0 : items.map(({ value }) => value));
        }
    }, [onChange, selectedItems]);
    return (react_1.default.createElement(MultiDownshift_1.default, { id: id, selectedItems: selectedItems, itemToString: itemToString, onMultiChange: onChange ? handleMultiChange : null }, ({ getRemoveButtonProps, toggleItem, unselectItem, getInputProps, getMenuProps, isOpen, inputValue, selectedItems, selectAll, clear, toggleMenu, getLabelProps, }) => {
        const allSelected = (selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length) === (items === null || items === void 0 ? void 0 : items.length);
        const selectedValues = (0, ramda_1.pluck)('value', selectedItems);
        const disableUnselect = preventUnselectLast && (selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length) <= 1;
        return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.dropdownWrapper, className) },
            label && (react_1.default.createElement(Text_1.default, Object.assign({}, getLabelProps(), { onClick: () => {
                    var _a;
                    toggleMenu();
                    !isOpen && ((_a = input.current) === null || _a === void 0 ? void 0 : _a.focus());
                }, component: "label", variant: "inputLabel", className: (0, clsx_1.default)(classes.label, 'label') }), label)),
            react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.inputFrame, 'inputFrame', {
                    [classes.expandedInputFrame]: isOpen,
                }) },
                selectedItems.length > 0 ? (selectedItems.slice(0, maxItems).map((item) => {
                    var _a, _b;
                    return (react_1.default.createElement("div", { key: (_b = (_a = item.key) !== null && _a !== void 0 ? _a : item.label) !== null && _b !== void 0 ? _b : String(item.value), title: itemToString(item), className: (0, clsx_1.default)(classes.selectedItem, 'selected-item') },
                        react_1.default.createElement("span", null, itemToString(item)),
                        !disableUnselect ? (react_1.default.createElement(DropdownToggle_1.default, Object.assign({}, getRemoveButtonProps({
                            item,
                            onClick: () => unselectItem(item),
                        }), { "aria-label": "remove item", type: "button" }),
                            react_1.default.createElement(FontAwesomeIcon_1.default, { solid: true, size: "sm" }, "xmark"))) : null));
                })) : (react_1.default.createElement("div", { "data-testid": (0, test_helpers_1.default)(id), onClick: () => {
                        var _a;
                        toggleMenu();
                        !isOpen && ((_a = input.current) === null || _a === void 0 ? void 0 : _a.focus());
                    }, className: (0, clsx_1.default)(classes.placeholder, 'placeholder') }, placeholder)),
                selectedItems.length > maxItems ? (react_1.default.createElement("div", { className: classes.selectedItem, title: selectedItems
                        .slice(maxItems)
                        .map((item) => itemToString(item))
                        .join('\n') },
                    react_1.default.createElement("span", null,
                        "+",
                        selectedItems.length - maxItems))) : null,
                react_1.default.createElement(DropdownToggle_1.default, { type: "button", onClick: () => {
                        var _a;
                        toggleMenu();
                        !isOpen && ((_a = input.current) === null || _a === void 0 ? void 0 : _a.focus());
                    } },
                    react_1.default.createElement(FontAwesomeIcon_1.default, { solid: true, size: "sm" }, isOpen ? 'caret-up' : 'caret-down')),
                react_1.default.createElement(DropdownMenu_1.default, Object.assign({ compact: compact, width: width, isOpen: isOpen }, getMenuProps()),
                    isOpen && enableSearch ? (react_1.default.createElement(DropdownInput_1.default, Object.assign({}, getInputProps({
                        ref: input,
                        name,
                        onKeyDown(event) {
                            if (event.key === 'Backspace' && !inputValue) {
                                unselectItem(selectedItems[selectedItems.length - 1]);
                            }
                        },
                    })))) : null,
                    isOpen && showAll && items.length ? (react_1.default.createElement(DropdownItem_1.default, { key: "selectAll", onClick: () => (allSelected ? clear() : selectAll(items)), isSelected: allSelected, showCheckbox: true }, "Select All")) : null,
                    isOpen
                        ? items.reduce((acc, item) => {
                            var _a, _b, _c;
                            const isSelected = selectedValues.includes(item.value);
                            if (enableSearch &&
                                inputValue &&
                                !item.label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())) {
                                return acc;
                            }
                            acc.push(react_1.default.createElement(DropdownItem_1.default, { key: (_b = (_a = item.key) !== null && _a !== void 0 ? _a : item.label) !== null && _b !== void 0 ? _b : String(item.value), onClick: () => {
                                    if ((isSelected && disableUnselect) ||
                                        (optionToggleCondition &&
                                            !optionToggleCondition(item, isSelected, selectedValues))) {
                                        return;
                                    }
                                    toggleItem(item);
                                }, isSelected: isSelected, disableCheckbox: isSelected && disableUnselect, showCheckbox: !noCheckboxes, disabled: optionToggleCondition &&
                                    !optionToggleCondition(item, isSelected, selectedValues) }, (_c = item.content) !== null && _c !== void 0 ? _c : react_1.default.createElement("span", null, itemToString(item))));
                            return acc;
                        }, [])
                        : null)),
            !!error && (react_1.default.createElement(Text_1.default, { variant: "body2", className: (0, clsx_1.default)(classes.error, 'error') }, error))));
    }));
}
exports.default = MultiDropdown;
//# sourceMappingURL=MultiDropdown.js.map