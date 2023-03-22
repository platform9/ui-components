"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Text_1 = __importDefault(require("../../elements/Text"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const useStyles = styles_1.makeStyles((theme) => ({
    button: Object.assign(Object.assign({}, theme.typography.inputTable), { display: 'grid', gridAutoFlow: 'column', cursor: 'pointer', alignItems: 'center', padding: theme.spacing(1, 2), borderRadius: 4, gap: 8, '&:hover': {
            backgroundColor: theme.components.table.hoverBackground,
        } }),
}));
const RefreshButton = ({ onRefresh }) => {
    const classes = useStyles({});
    return (react_1.default.createElement(Text_1.default, { "data-testid": test_helpers_1.default('refresh'), noWrap: true, onClick: onRefresh, component: "div", className: classes.button },
        react_1.default.createElement(FontAwesomeIcon_1.default, null, "sync-alt"),
        "Refresh"));
};
exports.default = RefreshButton;
//# sourceMappingURL=RefreshButton.js.map