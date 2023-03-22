"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../elements/Text"));
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginBottom: '10px',
        marginLeft: theme.spacing(1),
    },
    label: {
        flexGrow: 0,
        fontWeight: 'bold',
        minWidth: '150px',
    },
}));
const PresetField = ({ label, value }) => {
    const classes = useStyles({});
    return (react_1.default.createElement(Text_1.default, { className: classes.root, variant: "body2" },
        react_1.default.createElement("label", { className: classes.label }, label),
        react_1.default.createElement("span", null, value)));
};
exports.default = PresetField;
//# sourceMappingURL=PresetField.js.map