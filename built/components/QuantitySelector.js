"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const FontAwesomeIcon_1 = __importDefault(require("./FontAwesomeIcon"));
const TextField_1 = __importDefault(require("./validatedForm/TextField"));
function QuantitySelector({ id, value, onChange, className, disabled = false, iconSize = 'sm', min = 0, max, allowTypedInput = true, }) {
    const classes = useStyles({ disabled });
    const [inputValue, setInputValue] = react_1.default.useState(value);
    const decrement = () => {
        const newValue = inputValue - 1 < min ? inputValue : inputValue - 1;
        onChange(newValue);
        setInputValue(newValue);
    };
    const increment = () => {
        const newValue = max && inputValue + 1 > max ? max : inputValue + 1;
        onChange(newValue);
        setInputValue(newValue);
    };
    const handleInputChange = (newValue) => {
        setInputValue(newValue);
        onChange(newValue);
    };
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.quantitySelector, className), "data-testid": "quantity-selector" },
        react_1.default.createElement("button", { type: "button", className: (0, clsx_1.default)(classes.button, 'button'), onClick: decrement, "data-testid": "decrement-btn" },
            react_1.default.createElement(FontAwesomeIcon_1.default, { size: iconSize, className: classes.icon }, "minus")),
        react_1.default.createElement(TextField_1.default, { id: id, "data-testid": "quantity-input-field", type: "number", value: inputValue, className: classes.input, onChange: handleInputChange, min: min, disabled: disabled, nonce: undefined, onResize: undefined, onResizeCapture: undefined, enterKeyHint: undefined }),
        react_1.default.createElement("button", { type: "button", className: (0, clsx_1.default)(classes.button, 'button'), onClick: increment, "data-testid": "increment-btn" },
            react_1.default.createElement(FontAwesomeIcon_1.default, { size: iconSize, className: classes.icon }, "plus"))));
}
exports.default = QuantitySelector;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    quantitySelector: {
        display: 'grid',
        gridTemplateColumns: '30% 40% 30%',
        height: 'min-content',
        width: '127px',
        border: `1px solid ${theme.palette.grey[200]}`,
        transition: 'all .2s ease',
        backgroundColor: ({ disabled }) => disabled ? theme.palette.grey[50] : theme.palette.common.white,
        borderRadius: '4px',
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        backgroundColor: ({ disabled }) => disabled ? theme.palette.grey[50] : theme.palette.common.white,
        '&:hover': {
            backgroundColor: ({ disabled }) => disabled ? 'transparent' : theme.components.selectableCard.activeBackground,
        },
        borderRadius: '4px',
    },
    input: {
        minWidth: '32px',
        maxWidth: '70px',
        gap: '0px',
        '& .inputFrame': {
            borderTop: 'none',
            borderBottom: 'none',
            borderLeft: `1px solid ${theme.palette.grey[200]}`,
            borderRight: `1px solid ${theme.palette.grey[200]}`,
            borderRadius: 0,
        },
        '& .input': {
            textAlign: 'center',
            '-moz-appearance': 'textfield', // hide increment/decrement arrows in Firefox
        },
        // Hide the up and down arrows in all browsers
        '& .input::-webkit-inner-spin-button, & .input::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '& .input::-ms-clear': {
            display: 'none',
        },
    },
    icon: {
        color: ({ disabled }) => (disabled ? theme.palette.grey[300] : theme.palette.grey[900]),
    },
}));
//# sourceMappingURL=QuantitySelector.js.map