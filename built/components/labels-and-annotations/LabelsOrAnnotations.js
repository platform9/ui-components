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
exports.Annotations = exports.Labels = void 0;
const react_1 = __importDefault(require("react"));
const misc_1 = require("../../utils/misc");
const Badges_1 = __importDefault(require("../../elements/badge/Badges"));
// import { Taint } from 'app/plugins/infrastructure/components/clusters/capi/configs/model'
const getReadableName = (key, value, _separator, entityType) => {
    const separator = (key && value && (_separator || getDefaultSeparator(entityType))) || '';
    return `${key}${separator}${value}`;
};
// const getTaintsText = ({ key, value, effect }: Taint, separator = '=') => {
//   return { text: `${key}${separator}${value}`, effect }
// }
const getDefaultSeparator = (0, misc_1.memoize)((entityType) => (entityType === 'annotations' ? ': ' : '='));
function Labels(_a) {
    var { labels: values, separator } = _a, props = __rest(_a, ["labels", "separator"]);
    if (!values)
        return null;
    const labels = Object.entries(values).map(([key, value]) => {
        const text = getReadableName(key, value, separator, 'labels');
        return { text, tooltipText: text };
    });
    return react_1.default.createElement(Badges_1.default, Object.assign({ values: labels }, props, { entityType: "labels" }));
}
exports.Labels = Labels;
// export function Taints({ taints: values, ...props }: TaintsProps) {
//   if (!values || !Array.isArray(values)) return null
//   const taints = values.map((taint) => {
//     const { text, effect: additionalText } = getTaintsText(taint)
//     return { text, tooltipText: text, additionalText }
//   })
//   return <Badges values={taints} ellipsisAt={100} {...props} entityType="labels" />
// }
function Annotations(_a) {
    var { annotations: values, separator } = _a, props = __rest(_a, ["annotations", "separator"]);
    if (!values)
        return null;
    const annotations = Object.entries(values).map(([key, value]) => {
        const text = getReadableName(key, value, separator, 'annotations');
        return {
            text,
            tooltipText: text,
        };
    });
    return react_1.default.createElement(Badges_1.default, Object.assign({ values: annotations }, props, { entityType: "annotations" }));
}
exports.Annotations = Annotations;
//# sourceMappingURL=LabelsOrAnnotations.js.map