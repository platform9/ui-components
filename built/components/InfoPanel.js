"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldsForCard = exports.DetailRow = void 0;
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../elements/Text"));
const clsx_1 = __importDefault(require("clsx"));
const ramda_1 = require("ramda");
const HelpContainer_1 = __importDefault(require("./HelpContainer"));
const useStyles = styles_1.makeStyles((theme) => ({
    rowHelp: {
        width: 24,
    },
    rowHeader: {
        display: 'flex',
        justifyContent: 'flex-end',
        textAlign: 'right',
        whiteSpace: 'nowrap',
    },
    rowValue: {
        marginLeft: theme.spacing(0.5),
        wordBreak: 'break-all',
        display: 'flex',
        flexDirection: 'column',
    },
}));
exports.DetailRow = ({ label, value, helpMessage }) => {
    const { rowHeader, rowValue, rowHelp } = useStyles({});
    return (react_1.default.createElement("tr", null,
        react_1.default.createElement("td", null,
            react_1.default.createElement(Text_1.default, { className: rowHeader, variant: "caption1", component: "span" },
                label,
                ":")),
        react_1.default.createElement("td", null,
            react_1.default.createElement(Text_1.default, { className: rowValue, variant: "body2", component: typeof value === 'string' ? 'span' : 'div' }, value)),
        react_1.default.createElement("td", { className: rowHelp }, !!helpMessage && react_1.default.createElement(HelpContainer_1.default, { title: helpMessage, color: "black" }))));
};
/**
 * Gets fields for the InfoPanel component
 *
 * Ex. getFieldsForCard(fields, cluster)
 */
function getFieldsForCard(fields, item) {
    const fieldsToDisplay = {};
    fields.forEach((field) => {
        const { id, title, required = false, condition, render, helpMessage, renderExtraContent, } = field;
        const value = ramda_1.path(id.split('.'), item);
        const hasValue = !!value || value === false;
        const shouldRender = condition ? condition(item) : required || hasValue;
        if (shouldRender && (required || hasValue)) {
            fieldsToDisplay[title] = {
                value: render ? render(value, item) : value,
                helpMessage,
                extraContent: renderExtraContent ? renderExtraContent(value, item) : null,
            };
        }
    });
    return fieldsToDisplay;
}
exports.getFieldsForCard = getFieldsForCard;
const styles = (theme) => ({
    root: {},
    row: {
        width: '100%',
    },
    half: {
        display: 'inline-block',
        width: '50%',
    },
    cardContent: {
        margin: theme.spacing(0, 2, 1),
    },
    card: {
        maxWidth: 607,
        width: 'max-content',
        border: `solid 1px ${theme.components.card.border}`,
        borderRadius: 4,
        background: theme.components.card.background,
    },
    title: {
        color: theme.components.card.text,
        padding: theme.spacing(1, 2),
        borderBottom: `solid 1px ${theme.components.card.border}`,
    },
});
// @ts-ignore
const DetailRowDiv = styles_1.withStyles(styles)(({ classes, items }) => {
    return Object.entries(items).map(([name, { value, helpMessage }]) => (react_1.default.createElement(exports.DetailRow, { key: name, label: name, value: value, helpMessage: helpMessage })));
});
// @ts-ignore
const renderDetailRow = (items) => react_1.default.createElement(DetailRowDiv, { items: items });
const InfoPanel = styles_1.withStyles(styles)(({ classes, items = [], customBody = undefined, className = undefined, title, }) => (react_1.default.createElement("div", { className: clsx_1.default(classes.card, className) },
    react_1.default.createElement(Text_1.default, { variant: "subtitle2", component: "h3", className: classes.title }, title),
    customBody && react_1.default.createElement("div", { className: classes.cardContent }, customBody),
    !customBody && (react_1.default.createElement("table", { className: classes.cardContent },
        react_1.default.createElement("tbody", null, Array.isArray(items) ? items.map(renderDetailRow) : renderDetailRow(items)))))));
exports.default = InfoPanel;
//# sourceMappingURL=InfoPanel.js.map