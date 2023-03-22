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
exports.Orientation = void 0;
const react_1 = __importStar(require("react"));
const Radio_1 = __importDefault(require("../../elements/input/Radio"));
const styles_1 = require("@material-ui/styles");
const InfoTooltip_1 = require("../../components/InfoTooltip");
const fp_1 = require("../../utils/fp");
const withFormContext_1 = __importDefault(require("../../components/validatedForm/withFormContext"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const Text_1 = __importDefault(require("../../elements/Text"));
var Orientation;
(function (Orientation) {
    Orientation["Row"] = "row";
    Orientation["Column"] = "column";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
const useStyles = styles_1.makeStyles((theme) => ({
    radioFieldsContainer: {
        display: 'grid',
        gridAutoFlow: ({ orientation }) => orientation,
        gridAutoColumns: 'max-content',
        gridAutoRows: 'minmax(min-content, 50px)',
        alignItems: 'center',
        gridGap: theme.spacing(1),
    },
    error: {
        color: theme.components.graph.error,
    },
}));
const RadioFields = (props) => {
    const { value, title, hasError, onChange, errorMessage, options, className, orientation = Orientation.Column, } = props;
    const classes = useStyles({ orientation });
    const handleChange = react_1.useCallback((radioValue) => () => {
        if (onChange) {
            onChange(radioValue);
        }
    }, [onChange]);
    return (react_1.default.createElement("div", null,
        title && react_1.default.createElement(Text_1.default, { variant: "caption1" }, title),
        react_1.default.createElement("div", { className: className || classes.radioFieldsContainer, "data-testid": test_helpers_1.default('radio', 'form', 'label') }, options.map(({ label, value: optionValue, info, infoPlacement, disabled = false, extraContent }) => (react_1.default.createElement("div", { key: optionValue },
            react_1.default.createElement(Radio_1.default, { className: classes.radio, textWeight: "light", "data-testid": test_helpers_1.default(optionValue), "data-testvalue": optionValue, label: label, info: info, checked: optionValue === value, onChange: handleChange(optionValue), disabled: props.disabled || disabled }),
            extraContent)))),
        errorMessage && (react_1.default.createElement(Text_1.default, { variant: "caption2", className: classes.error }, errorMessage))));
};
exports.default = fp_1.compose(InfoTooltip_1.withInfoTooltip, // This HoC causes unnecessary re-renders if declared after withFormContext
withFormContext_1.default)(RadioFields);
//# sourceMappingURL=radio-fields.js.map