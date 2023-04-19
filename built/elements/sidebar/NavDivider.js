"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const Text_1 = __importDefault(require("../Text"));
function NavDivider({ icon = undefined, name = '' }) {
    const classes = useStyles();
    return (react_1.default.createElement("li", { className: classes.dividerLink },
        react_1.default.createElement(FontAwesomeIcon_1.default, null, icon),
        react_1.default.createElement(Text_1.default, { variant: "subtitle2" }, name)));
}
exports.default = NavDivider;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    dividerLink: {
        display: 'grid',
        marginTop: 36,
        marginBottom: 8,
        gridTemplateColumns: 'max-content 1fr',
        gap: 12,
        alignItems: 'center',
    },
}));
//# sourceMappingURL=NavDivider.js.map