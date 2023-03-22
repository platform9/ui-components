"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = __importDefault(require("../elements/button"));
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../elements/Text"));
const SimpleLink_1 = __importDefault(require("./SimpleLink"));
const test_helpers_1 = __importDefault(require("../utils/test-helpers"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    dropdownContainer: {
        display: 'inline-block',
        position: 'relative',
        '&:hover': {
            '& button': {
                borderRadius: '4px 4px 0px 0px ',
            },
            '& $dropdown': {
                opacity: 1,
                transform: 'scale(1)',
                zIndex: 100,
            },
        },
    },
    dropdown: {
        position: 'absolute',
        padding: theme.spacing(1, 0),
        background: theme.components.card.background,
        paddingInlineStart: 0,
        listStyle: 'none',
        marginBlockStart: 0,
        marginBlockEnd: 0,
        width: 'calc(100% - 2px)',
        textAlign: 'center',
        borderColor: theme.components.card.border,
        borderStyle: 'solid',
        borderWidth: '0px 1px 1px 1px',
        borderRadius: '0px 0px 4px 4px',
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: 'top center',
        transition: 'opacity .2s ease, transform .2s ease',
    },
    dropdownLink: {
        padding: theme.spacing(1, 0),
        transition: 'color .2s ease',
        lineHeight: '36px',
        '&:hover': {
            color: theme.components.typography.active,
        },
    },
}));
const DropdownButton = ({ links, addText }) => {
    const classes = useStyles({});
    return (react_1.default.createElement("div", { className: classes.dropdownContainer },
        react_1.default.createElement(button_1.default, { rightIcon: "angle-down", "data-testid": (0, test_helpers_1.default)(addText) }, addText),
        react_1.default.createElement("ul", { className: classes.dropdown }, links.map((link) => (react_1.default.createElement("li", { "data-testid": (0, test_helpers_1.default)(link.label), key: link.label },
            react_1.default.createElement(SimpleLink_1.default, { src: link.link, textDecoration: "none" },
                react_1.default.createElement(Text_1.default, { variant: "caption1", className: classes.dropdownLink }, link.label))))))));
};
exports.default = DropdownButton;
//# sourceMappingURL=DropdownButton.js.map