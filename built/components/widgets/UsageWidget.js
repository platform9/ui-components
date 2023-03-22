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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const SemiCircleGraph_1 = __importDefault(require("../../components/graphs/SemiCircleGraph"));
const Text_1 = __importDefault(require("../../elements/Text"));
const card_1 = __importDefault(require("../../elements/card"));
const CardBody_1 = __importDefault(require("../../elements/card/CardBody"));
const defaultStats = { current: 0, max: 0, percent: 0 };
function UsageWidget(_a) {
    var { title, precision = 1, units = '', usedText = 'used', stats = defaultStats } = _a, rest = __rest(_a, ["title", "precision", "units", "usedText", "stats"]);
    const classes = useStyles({});
    const { current, max, percent } = stats;
    const curStr = current.toFixed(precision) + units;
    const maxStr = max.toFixed(precision) + units;
    const percentage = Math.round(percent);
    const data = (0, react_1.useMemo)(() => [
        {
            value: percentage,
            name: '',
            color: 'fadedPrimary',
        },
        {
            value: 100 - percentage,
            name: '',
            color: 'tray',
        },
    ], [percentage]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(card_1.default, { className: classes.card, withCustomBody: true, title: react_1.default.createElement(Text_1.default, { className: classes.cardTitle, variant: "subtitle2", component: "h6" }, title) },
            react_1.default.createElement(CardBody_1.default, { className: classes.cardBody },
                react_1.default.createElement(SemiCircleGraph_1.default, Object.assign({ data: data, percent: percent / 100 }, rest)),
                react_1.default.createElement("div", { className: classes.container },
                    react_1.default.createElement(Text_1.default, { variant: "subtitle2", className: classes.title },
                        react_1.default.createElement("b", null, curStr)),
                    ' ',
                    react_1.default.createElement(Text_1.default, { variant: "body2", className: classes.modifier }, usedText),
                    react_1.default.createElement(Text_1.default, { variant: "subtitle2", className: classes.title },
                        react_1.default.createElement("b", null, maxStr)),
                    ' ',
                    react_1.default.createElement(Text_1.default, { variant: "body2", className: classes.modifier }, "available"))))));
}
exports.default = UsageWidget;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    title: {
        fontWeight: 300,
        textAlign: 'right',
        color: theme.components.card.text,
    },
    modifier: {
        fontWeight: 300,
        textAlign: 'left',
        color: theme.components.card.text,
        display: 'flex',
        alignItems: 'center',
    },
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: theme.spacing(0.5),
        paddingTop: 4,
    },
    card: {
        display: 'grid',
        gridTemplateRows: 'max-content max-content',
    },
    cardTitle: {
        padding: '24px 24px 0px 24px',
    },
    cardBody: {
        display: 'grid',
        justifyItems: 'center',
        paddingBottom: 32,
        '& path': {
            stroke: theme.components.graph.stroke,
        },
        '& path[name="unknown"]': {
            stroke: theme.components.graph.stroke,
            fill: theme.components.graph.tray,
        },
    },
}));
//# sourceMappingURL=UsageWidget.js.map