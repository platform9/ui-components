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
exports.renderResourceAnnotations = exports.createResourceAnnotationsCell = exports.createResourceLabelsCell = exports.renderResourceLabels = exports.renderLabelsAsBadges = exports.defaultVariant = void 0;
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const badge_1 = __importDefault(require("../../elements/badge"));
const LabelsOrAnnotations_1 = require("./LabelsOrAnnotations");
exports.defaultVariant = 'default';
const LabelsAsBadges = (0, styles_1.styled)(({ labels, variant, defaultValue, className }) => {
    if (!labels)
        return react_1.default.createElement(Text_1.default, { variant: "body2" }, defaultValue);
    return (react_1.default.createElement("div", { className: className }, labels.map((label, idx) => (react_1.default.createElement(badge_1.default, { key: idx, text: label, variant: variant })))));
})({
    display: 'grid',
    gridAutoFlow: 'row',
    gap: 8,
});
const renderLabelsAsBadges = ({ variant = exports.defaultVariant, defaultValue = '' }) => (labels) => react_1.default.createElement(LabelsAsBadges, { labels: labels, variant: variant, defaultValue: defaultValue });
exports.renderLabelsAsBadges = renderLabelsAsBadges;
const renderResourceLabels = (_a) => {
    var { separator, type, variant } = _a, rest = __rest(_a, ["separator", "type", "variant"]);
    return (values) => (react_1.default.createElement(LabelsOrAnnotations_1.Labels, Object.assign({ labels: values, variant: variant, separator: separator, containerType: type }, rest)));
};
exports.renderResourceLabels = renderResourceLabels;
function createResourceLabelsCell({ separator, type, variant }) {
    return (props) => {
        return (react_1.default.createElement(LabelsOrAnnotations_1.Labels, { labels: props === null || props === void 0 ? void 0 : props.value, variant: variant, separator: separator, containerType: type }));
    };
}
exports.createResourceLabelsCell = createResourceLabelsCell;
function createResourceAnnotationsCell(annotationProps) {
    return (props) => {
        return react_1.default.createElement(LabelsOrAnnotations_1.Annotations, Object.assign({ annotations: props === null || props === void 0 ? void 0 : props.value }, annotationProps));
    };
}
exports.createResourceAnnotationsCell = createResourceAnnotationsCell;
const renderResourceAnnotations = (_a) => {
    var { values } = _a, rest = __rest(_a, ["values"]);
    return (react_1.default.createElement(LabelsOrAnnotations_1.Annotations, Object.assign({ annotations: values }, rest)));
};
exports.renderResourceAnnotations = renderResourceAnnotations;
// export const renderResourceTaints = (values) => <Taints taints={values} />
//# sourceMappingURL=helpers.js.map