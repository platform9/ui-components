"use strict";
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
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Checkbox_1 = __importDefault(require("../../elements/input/Checkbox"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    dropdownItem: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        width: '100%',
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        border: 'none',
        padding: theme.spacing(1, 1),
        '&:hover': {
            background: theme.components.dropdown.selectedBackground,
        },
        '& > .checkbox': {
            marginRight: 8,
        },
        '& > span': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        background: ({ isSelected, showCheckbox }) => isSelected && !showCheckbox ? theme.components.dropdown.selectedBackground : null,
    },
}));
exports.default = react_1.default.forwardRef((props, ref) => {
    const classes = useStyles(props);
    const { children, isSelected, showCheckbox, disableCheckbox, icon, iconSize = 'lg' } = props, rest = __rest(props, ["children", "isSelected", "showCheckbox", "disableCheckbox", "icon", "iconSize"]);
    console.log({ icon, iconSize });
    return (react_1.default.createElement("li", Object.assign({ "data-testid": (0, test_helpers_1.default)(classes.id, 'cluster', 'value'), ref: ref, className: classes.dropdownItem }, rest),
        showCheckbox ? react_1.default.createElement(Checkbox_1.default, { disabled: disableCheckbox, checked: isSelected }) : null,
        icon && (react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.icon, size: iconSize }, icon)),
        children));
});
//# sourceMappingURL=DropdownItem.js.map