"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../Text"));
function CardHeaderWithLink({ children, className = undefined, linkComponent = undefined, }) {
    const classes = useStyles({});
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)('card-header', classes.header) },
        react_1.default.createElement(Text_1.default, { variant: "subtitle2", className: className }, children),
        linkComponent && linkComponent));
}
exports.default = CardHeaderWithLink;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    header: {
        padding: '16px 32px',
        borderBottom: `1px solid ${theme.components.card.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));
//# sourceMappingURL=CardHeaderWithLink.js.map