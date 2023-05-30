"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Button_1 = __importDefault(require("../../button/Button"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    clearFilters: {
        background: theme.components.table.hoverBackground,
        padding: 8,
    },
    clearButton: {
        width: '100%',
    },
}));
function ClearFiltersSection({ onChange }) {
    const classes = useStyles();
    return (react_1.default.createElement("div", { className: classes.clearFilters },
        react_1.default.createElement(Button_1.default, { className: classes.clearButton, variant: "secondary", onClick: () => onChange([]) }, "Clear Filters")));
}
exports.default = ClearFiltersSection;
//# sourceMappingURL=ClearFiltersSection.js.map