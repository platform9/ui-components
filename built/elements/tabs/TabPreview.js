"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
function TabPreview({ label, value, isActive, onClick }) {
    const classes = useStyles({ isActive });
    return (react_1.default.createElement("div", { className: classes.tabPreview, onClick: () => onClick(value) },
        react_1.default.createElement(Text_1.default, { className: classes.tabText, "data-testid": test_helpers_1.default(label, 'tab'), variant: "subtitle2" }, label),
        isActive && react_1.default.createElement("span", { className: classes.activeBorder })));
}
exports.default = TabPreview;
const useStyles = styles_1.makeStyles((theme) => ({
    tabPreview: {
        height: 35,
        display: 'grid',
        gap: 8,
        gridAutoFlow: 'row',
        cursor: 'pointer',
    },
    tabText: {
        padding: '0 16px',
        color: ({ isActive }) => theme.components.tab[isActive ? 'activeText' : 'text'],
        '&:hover': {
            color: theme.components.tab.activeText,
        },
    },
    activeBorder: {
        height: 4,
        display: 'grid',
        borderRadius: 1.5,
        margin: 0,
        padding: 0,
        background: theme.components.tab.activeBackground,
    },
}));
//# sourceMappingURL=TabPreview.js.map