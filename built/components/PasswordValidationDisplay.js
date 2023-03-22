"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ramda_1 = require("ramda");
const styles_1 = require("@material-ui/styles");
const MenuItem_1 = __importDefault(require("../elements/menu/MenuItem"));
const Alert_1 = __importDefault(require("../components/Alert"));
const fieldValidators_1 = require("../utils/fieldValidators");
const passwordValidatorList = [
    {
        displayText: 'At least 8 characters long',
        validator: (0, fieldValidators_1.hasMinLength)(8),
    },
    {
        displayText: '1 Lowercase letter',
        validator: fieldValidators_1.hasOneLowerChar,
    },
    {
        displayText: '1 Uppercase letter',
        validator: fieldValidators_1.hasOneUpperChar,
    },
    {
        displayText: '1 Number',
        validator: fieldValidators_1.hasOneNumber,
    },
    {
        displayText: '1 Special character - !@#$%^&*()?',
        validator: fieldValidators_1.hasOneSpecialChar,
    },
];
function PasswordValidationDisplay({ values }) {
    const classes = useStyles({});
    return (react_1.default.createElement(Alert_1.default, { title: "Password must contain the following:" },
        react_1.default.createElement("ul", { className: classes.validationList }, passwordValidatorList.map((record) => (react_1.default.createElement(MenuItem_1.default, { className: classes.validationItem, key: record.displayText, icon: (0, ramda_1.propSatisfies)(record.validator, 'newPassword', values) ? 'check' : 'times', readonly: true }, record.displayText))))));
}
exports.default = PasswordValidationDisplay;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    validationList: {
        margin: 0,
        padding: 0,
        display: 'grid',
        gap: 6,
    },
    validationItem: {
        lineHeight: '20px',
        minHeight: 'unset',
        gap: 8,
    },
}));
//# sourceMappingURL=PasswordValidationDisplay.js.map