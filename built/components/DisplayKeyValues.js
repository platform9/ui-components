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
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("../elements/Text"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    table: {
        borderSpacing: ({ rowSpacing }) => `0px ${rowSpacing}px`,
        width: '100%',
    },
    td: {
        fontFamily: theme.typography.body2.fontFamily,
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.body2.fontWeight,
        fontStretch: theme.typography.body2.fontStretch,
        fontStyle: theme.typography.body2.fontStyle,
        lineHeight: theme.typography.body2.lineHeight,
        letterSpacing: theme.typography.body2.letterSpacing,
        padding: 0,
        verticalAlign: 'top',
        wordBreak: 'break-word',
    },
    key: {
        textAlign: ({ alignKeyRight }) => (alignKeyRight ? `right` : 'left'),
        whiteSpace: 'nowrap',
        minWidth: '120px',
    },
    value: {
        paddingLeft: theme.spacing(2.5),
        width: '100%',
    },
    showMoreButton: {
        cursor: 'pointer',
    },
    showMoreText: {
        color: theme.palette.blue[500],
    },
}));
const KeyValue = ({ pair, limitValueLength = false, alignKeyRight = true }) => {
    const { key = '', value = '', render = null } = pair || {};
    const classes = useStyles({ alignKeyRight });
    const [showAll, setShowAll] = (0, react_1.useState)(false);
    const valueToShow = limitValueLength && !showAll && value.length > 350 ? value.substring(0, 350) : value;
    return (react_1.default.createElement(Text_1.default, { variant: "body2", component: "tr", key: key },
        react_1.default.createElement("td", { className: (0, clsx_1.default)(classes.td, classes.key) },
            key,
            ":"),
        render ? (react_1.default.createElement("td", { className: (0, clsx_1.default)(classes.td, classes.value) }, render(value))) : (react_1.default.createElement("td", { className: (0, clsx_1.default)(classes.td, classes.value) },
            react_1.default.createElement(Text_1.default, { variant: "body2", component: "div" }, valueToShow),
            limitValueLength && value.length > 350 && (react_1.default.createElement("div", { className: classes.showMoreButton, onClick: () => setShowAll(!showAll) },
                react_1.default.createElement(Text_1.default, { className: classes.showMoreText, variant: "caption1" }, showAll ? 'Show Less' : 'Show More')))))));
};
const DisplayKeyValues = (_a) => {
    var { keyValuePairs, rowSpacing = 12 } = _a, rest = __rest(_a, ["keyValuePairs", "rowSpacing"]);
    const classes = useStyles({ rowSpacing });
    return (react_1.default.createElement("table", { className: classes.table },
        react_1.default.createElement("tbody", null, keyValuePairs.map((pair) => {
            return react_1.default.createElement(KeyValue, Object.assign({ key: pair === null || pair === void 0 ? void 0 : pair.key }, rest, { pair: pair }));
        }))));
};
exports.default = DisplayKeyValues;
//# sourceMappingURL=DisplayKeyValues.js.map