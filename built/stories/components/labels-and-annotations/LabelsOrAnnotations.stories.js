"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empty = exports.AnnotationsExample = exports.LabelsExample = void 0;
const react_1 = __importDefault(require("react"));
const LabelsOrAnnotations_1 = require("../../../components/labels-and-annotations/LabelsOrAnnotations");
// Creating a wrapper story for both components since they are similar
const meta = {
    title: 'Components/Labels and Annotations',
    component: LabelsOrAnnotations_1.Labels,
    argTypes: {
        separator: { control: 'text' },
    },
};
exports.default = meta;
const labelsData = {
    'app.kubernetes.io/name': 'nginx',
    'app.kubernetes.io/version': '1.14.2',
    'environment': 'production',
};
const annotationsData = {
    'deployment.kubernetes.io/revision': '1',
    'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"v1",...}',
};
exports.LabelsExample = {
    render: (args) => react_1.default.createElement(LabelsOrAnnotations_1.Labels, Object.assign({}, args, { labels: labelsData })),
};
exports.AnnotationsExample = {
    render: (args) => react_1.default.createElement(LabelsOrAnnotations_1.Annotations, Object.assign({}, args, { annotations: annotationsData })),
};
exports.Empty = {
    render: (args) => (react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Empty Labels:"),
            react_1.default.createElement(LabelsOrAnnotations_1.Labels, Object.assign({}, args, { labels: {} }))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Empty Annotations:"),
            react_1.default.createElement(LabelsOrAnnotations_1.Annotations, Object.assign({}, args, { annotations: {} })))))
};
//# sourceMappingURL=LabelsOrAnnotations.stories.js.map