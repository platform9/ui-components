"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconInfo = void 0;
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const core_1 = require("@material-ui/core");
const clsx_1 = __importDefault(require("clsx"));
const FontAwesomeIcon_1 = __importDefault(require("../FontAwesomeIcon"));
const Text_1 = __importDefault(require("../../elements/Text"));
const useIconInfoStyles = (0, styles_1.makeStyles)((theme) => ({
    alertTitle: {
        display: 'flex',
        alignItems: 'center',
        '& i': {
            color: theme.components.graph.primary,
            fontSize: 22,
            marginRight: 4,
        },
    },
    infoContainer: {
        margin: ({ spacer }) => (spacer ? '60px 0 40px 0' : '16px 0'),
    },
}));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    container: {
        background: theme.components.table.hoverBackground,
        padding: theme.spacing(1.5, 3),
        border: ({ error }) => `1px solid ${error ? theme.components.graph.error : theme.components.table.border}`,
        borderRadius: 4,
        fontFamily: theme.typography.body2.fontFamily,
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.body2.fontWeight,
        fontStretch: theme.typography.body2.fontStretch,
        fontStyle: theme.typography.body2.fontStyle,
        lineHeight: theme.typography.body2.lineHeight,
        letterSpacing: theme.typography.body2.letterSpacing,
        color: theme.components.card.text,
    },
    minimizedContainer: {
        background: theme.components.table.hoverBackground,
        border: `1px solid ${theme.components.table.border}`,
        borderRadius: 4,
        padding: theme.spacing(1.5, 3),
    },
    header: {
        fontSize: 16,
        color: theme.components.graph.primary,
        fontWeight: 600,
        display: 'flex',
    },
    title: {
        flexGrow: 1,
        alignSelf: 'center',
    },
    button: {
        flexGrow: 0,
        backgroundColor: theme.components.graph.primary,
        height: '24px',
        width: '24px',
        borderRadius: '50%',
        display: 'flex',
        cursor: 'pointer',
    },
    icon: {
        color: theme.components.card.text,
        alignSelf: 'center',
        marginLeft: '4px',
    },
    divider: {
        backgroundColor: theme.components.graph.primary,
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(2),
    },
}));
const Info = ({ children, error = false, className = undefined, title = '', expanded = true, }) => {
    const classes = useStyles({ error });
    const [isExpanded, setExpanded] = (0, react_1.useState)(expanded);
    const isMinimized = title && !isExpanded;
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(isMinimized ? classes.minimizedContainer : classes.container, className) },
        title && (react_1.default.createElement("div", { className: classes.header },
            react_1.default.createElement("span", { className: classes.title }, title),
            react_1.default.createElement("div", { className: classes.button, onClick: () => {
                    setExpanded(!isExpanded);
                } },
                react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.icon }, `angle-${isExpanded ? 'up' : 'down'}`)))),
        title && isExpanded && react_1.default.createElement(core_1.Divider, { className: classes.divider }),
        (!title || isExpanded) && children));
};
const IconInfo = ({ icon, title, children, className = '', iconClass = '', spacer = true }) => {
    const classes = useIconInfoStyles({ spacer });
    return (react_1.default.createElement(Info, { className: (0, clsx_1.default)(classes.infoContainer, className) },
        react_1.default.createElement(Text_1.default, { className: classes.alertTitle, variant: "body2" },
            react_1.default.createElement(FontAwesomeIcon_1.default, { className: iconClass }, icon),
            " ",
            title),
        !!children && react_1.default.createElement("br", null),
        children));
};
exports.IconInfo = IconInfo;
exports.default = Info;
//# sourceMappingURL=Info.js.map