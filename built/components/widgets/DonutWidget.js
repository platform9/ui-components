"use strict";
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
const react_1 = __importDefault(require("react"));
const PieUsageWidget_1 = require("./PieUsageWidget");
const styles_1 = require("@material-ui/styles");
const PieGraph_1 = __importDefault(require("../graphs/PieGraph"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        '& path': {
            stroke: theme.components.graph.stroke,
        },
    },
}));
function DonutWidget(_a) {
    var { data } = _a, rest = __rest(_a, ["data"]);
    const { container } = useStyles({});
    return (react_1.default.createElement("div", { className: container },
        react_1.default.createElement(PieGraph_1.default, Object.assign({ data: data, empty: !data }, rest)),
        react_1.default.createElement(PieUsageWidget_1.PieLegend, { data: data })));
}
exports.default = DonutWidget;
//# sourceMappingURL=DonutWidget.js.map