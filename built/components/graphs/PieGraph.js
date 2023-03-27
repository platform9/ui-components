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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const recharts_1 = require("recharts");
const styles_1 = require("@material-ui/styles");
const PieGraph = (_a) => {
    var { data = [], sideLength = 216, arcWidth = 56, percent = undefined, primary, empty = false, healthColor = 'primary', startAngle = 0, endAngle = 360, width = sideLength + 10, height = sideLength + 10 } = _a, rest = __rest(_a, ["data", "sideLength", "arcWidth", "percent", "primary", "empty", "healthColor", "startAngle", "endAngle", "width", "height"]);
    const theme = (0, styles_1.useTheme)();
    const radius = Math.floor(sideLength / 2);
    const emptyData = (0, react_1.useMemo)(() => [{ name: 'unknown', value: 1, color: theme.components.graph.tray }], [theme.components.graph.tray]);
    const items = empty ? emptyData : data;
    return (react_1.default.createElement(recharts_1.PieChart, { width: width, height: height },
        react_1.default.createElement(recharts_1.Pie, Object.assign({ dataKey: "value", data: items, startAngle: startAngle, endAngle: endAngle, cx: radius, cy: radius, innerRadius: radius - arcWidth, outerRadius: radius, paddingAngle: 0 }, rest), items.map((entry) => (react_1.default.createElement(recharts_1.Cell, { key: entry.name, fill: theme.components.graph[entry.color] })))),
        percent !== undefined && (react_1.default.createElement("text", { style: Object.assign({}, theme.typography.h4), x: radius + 5, y: radius, fill: theme.components.card.text, textAnchor: "middle", dominantBaseline: "middle" }, `${(percent * 100).toFixed(0)}%`)),
        primary && (react_1.default.createElement("text", { style: Object.assign({}, theme.typography.caption2), x: radius + 5, y: radius + 20, fill: theme.components.card.text, textAnchor: "middle", dominantBaseline: "middle" }, primary))));
};
exports.default = PieGraph;
//# sourceMappingURL=PieGraph.js.map