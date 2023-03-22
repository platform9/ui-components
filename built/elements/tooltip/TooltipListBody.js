"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const clsx_1 = __importDefault(require("clsx"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const CopyToClipboard_1 = __importDefault(require("../../components/CopyToClipboard"));
function TooltipListBody({ items, className, nameKey, renderIcon, }) {
    const classes = useStyles({});
    return (react_1.default.createElement("ul", { className: clsx_1.default(classes.tooltipListBody, className) }, items.map((item, idx) => (react_1.default.createElement(TooltipListItem, { key: idx, item: item, nameKey: nameKey, isFirst: idx === 0, isLast: idx === items.length - 1, Icon: renderIcon })))));
}
exports.default = TooltipListBody;
function TooltipListItem(props) {
    const { item, isFirst, isLast, Icon, nameKey } = props;
    const classes = useStyles({ isFirst, isLast });
    const text = nameKey ? item[nameKey] : item;
    // eslint-disable-next-line no-extra-boolean-cast
    const iconContent = !!Icon ? (react_1.default.createElement("div", { className: classes.copyContainer },
        react_1.default.createElement(Icon, Object.assign({}, item, { className: clsx_1.default(classes.tooltipText, classes.tooltipCopyIcon) })))) : (react_1.default.createElement(CopyToClipboard_1.default, { copyText: text, copyIcon: false, inline: false, triggerWithChild: true },
        react_1.default.createElement("div", { className: classes.copyContainer },
            react_1.default.createElement(FontAwesomeIcon_1.default, { size: "md", className: clsx_1.default(classes.tooltipText, classes.tooltipCopyIcon) }, "copy"))));
    return (react_1.default.createElement("li", { className: classes.tooltipListItem },
        react_1.default.createElement(Text_1.default, { variant: "body2", className: classes.tooltipText, noWrap: true }, text),
        iconContent));
}
const useStyles = styles_1.makeStyles((theme) => ({
    tooltipListBody: {
        margin: 0,
        padding: 0,
    },
    tooltipListItem: {
        display: 'grid',
        gridTemplateColumns: '1fr max-content',
        gridAutoFlow: 'column',
        alignItems: 'center',
        gap: 16,
        paddingLeft: 8,
        borderTop: `1px solid ${theme.components.tooltip.border}`,
        '&:first-child': {
            borderTop: 'none',
        },
    },
    tooltipCopyIcon: {
        cursor: 'inherit',
        fontSize: 16,
    },
    tooltipText: {
        color: theme.components.tooltip.text,
        maxWidth: 350,
    },
    copyContainer: {
        cursor: 'pointer',
        backgroundColor: theme.components.tooltip.copyBackground,
        width: 36,
        height: 36,
        boxSizing: 'border-box',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ({ isFirst, isLast }) => {
            const tl = 0;
            const tr = isFirst ? 4 : 0;
            const br = isLast ? 4 : 0;
            const bl = 0;
            return `${tl}px ${tr}px ${br}px ${bl}px`;
        },
    },
}));
//# sourceMappingURL=TooltipListBody.js.map