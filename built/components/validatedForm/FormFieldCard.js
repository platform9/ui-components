"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFieldCard = exports.useStyles = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = __importDefault(require("../../elements/Text"));
const card_1 = __importDefault(require("../../elements/card"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const CardHeader_1 = __importDefault(require("../../elements/card/CardHeader"));
const defaultMaxWidth = 932;
exports.useStyles = (0, styles_1.makeStyles)((theme) => ({
    root: {
        maxWidth: ({ maxWidth = defaultMaxWidth }) => maxWidth,
    },
    requirementsTitle: {
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'space-between',
        gridTemplateColumns: '1fr max-content',
    },
    title: {
        display: 'flex',
    },
    titleRight: {
        display: 'grid',
        gridTemplateColumns: '1fr max-content',
        gridGap: theme.spacing(1),
    },
    figureStep: {
        backgroundColor: theme.components.wizard.multiStep.bubbleBackground,
        border: `1px solid ${theme.components.wizard.multiStep.bubbleBorder}`,
        boxSizing: 'border-box',
        borderRadius: '100%',
        width: 24,
        height: 24,
        display: 'inline-grid',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        marginRight: 12,
        paddingBottom: 1,
    },
}));
const FormFieldCard = (props) => {
    const { title, topContent, middleHeader, step, link, className, children } = props;
    const classes = (0, exports.useStyles)(props);
    return (react_1.default.createElement(card_1.default, { className: (0, clsx_1.default)(classes.root, className), title: (title || link) && (react_1.default.createElement(CardHeader_1.default, { className: `form-field-card-requirementsTitle ${classes.requirementsTitle}` },
            react_1.default.createElement("div", { "data-testid": (0, test_helpers_1.default)(title), className: classes.title },
                !!step && (react_1.default.createElement(Text_1.default, { component: "figure", variant: "caption1", className: classes.figureStep }, step)),
                !!title && react_1.default.createElement(Text_1.default, { variant: "subtitle2" }, title)),
            react_1.default.createElement("div", { className: classes.titleRight },
                react_1.default.createElement("div", null, !!middleHeader && middleHeader),
                react_1.default.createElement("div", null, !!link && link)))) },
        topContent,
        children));
};
exports.FormFieldCard = FormFieldCard;
//# sourceMappingURL=FormFieldCard.js.map