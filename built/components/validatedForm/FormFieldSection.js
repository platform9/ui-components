"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyles = void 0;
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const misc_1 = require("../../utils/misc");
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("../../elements/Text"));
const FontAwesomeIcon_1 = __importDefault(require("../FontAwesomeIcon"));
const tooltip_1 = __importDefault(require("../../elements/tooltip"));
function FormFieldSection({ title, className, link = undefined, info = undefined, step = undefined, children, errorMessage, textVariant = 'subtitle2', }) {
    const hasInfo = !!info;
    const hasLink = !!link;
    const classes = exports.useStyles({});
    const infoTitle = react_1.useMemo(() => {
        if (!info)
            return null;
        if (typeof info === 'string')
            return react_1.default.createElement("div", { className: classes.infoTooltip }, info);
        return (react_1.default.createElement("div", { className: classes.infoTooltip },
            react_1.default.createElement("span", { className: classes.infoTooltipTitle }, info === null || info === void 0 ? void 0 : info.title), info === null || info === void 0 ? void 0 :
            info.children));
    }, [info]);
    const infoComponent = hasInfo ? (react_1.default.createElement(tooltip_1.default, { message: infoTitle },
        react_1.default.createElement(FontAwesomeIcon_1.default, null, "info-circle"))) : null;
    return (react_1.default.createElement("fieldset", { className: clsx_1.default(classes.formFieldSection, className) },
        react_1.default.createElement("legend", { className: classes.titleLegend },
            misc_1.isNumeric(step) && (react_1.default.createElement(Text_1.default, { component: "figure", variant: "caption1", className: classes.figureStep }, step)),
            react_1.default.createElement(Text_1.default, { "data-testid": test_helpers_1.default(title), component: "label", variant: textVariant, className: classes.title },
                title,
                " ",
                infoComponent)),
        react_1.default.createElement("div", { className: classes.spacer }, hasLink && link),
        react_1.default.createElement("div", { className: clsx_1.default('content', classes.content) }, children),
        errorMessage && react_1.default.createElement(Warning, null, errorMessage)));
}
exports.default = FormFieldSection;
const Warning = styles_1.styled(({ children, className }) => (react_1.default.createElement(Text_1.default, { variant: "body1", className: className }, children)))(({ theme }) => ({
    color: theme.components.graph.error,
}));
exports.useStyles = styles_1.makeStyles((theme) => ({
    formFieldSection: {
        marginBottom: '32px',
        border: 'none',
        padding: 0,
    },
    titleLegend: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'max-content',
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
    title: {
        margin: 0,
        display: 'inline-grid',
        gridAutoFlow: 'column',
        gap: 8,
    },
    spacer: {
        marginTop: 2,
        marginBottom: 14,
        marginLeft: 24,
    },
    content: {
        marginLeft: 24,
        display: 'grid',
        gap: 16,
        gridAutoRows: 'max-content',
    },
    infoTooltip: {
        padding: '8px',
        // ...theme.typography.body2,
        fontFamily: theme.typography.body2.fontFamily,
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.body2.fontWeight,
        fontStretch: theme.typography.body2.fontStretch,
        fontStyle: theme.typography.body2.fontStyle,
        lineHeight: theme.typography.body2.lineHeight,
        letterSpacing: theme.typography.body2.letterSpacing,
    },
    infoTooltipTitle: Object.assign({}, theme.typography.caption1),
}));
//# sourceMappingURL=FormFieldSection.js.map