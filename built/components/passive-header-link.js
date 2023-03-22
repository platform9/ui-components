"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SimpleLink_1 = __importDefault(require("../components/SimpleLink"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        display: 'grid',
        alignItems: 'center',
        gridAutoFlow: 'column',
        gap: 4,
        '& i': {
            color: theme.components.typography.passive,
            fontWeight: 900,
            fontSize: 14,
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            margin: 0,
            marginTop: 2,
            transition: 'color .2s ease',
        },
        '& > span': {
            color: theme.components.typography.passive,
            transition: 'color .2s ease',
        },
        '&:hover': {
            textDecoration: 'none',
            '& > i': {
                color: theme.components.typography.default,
            },
            '& > span': {
                color: theme.components.typography.default,
            },
        },
    },
}));
const PassiveHeaderLink = ({ icon, text, url = undefined, className = undefined, onClick = undefined, }) => {
    const classes = useStyles({});
    return (react_1.default.createElement(SimpleLink_1.default, { onClick: onClick, src: url, className: clsx_1.default(classes.root, className), icon: icon, textVariant: "subtitle2", iconPosition: "left" }, text));
};
exports.default = PassiveHeaderLink;
//# sourceMappingURL=passive-header-link.js.map