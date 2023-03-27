"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const inlineEllipsisStyle = {
    margin: 'auto',
    backgroundImage: 'none',
    display: 'block',
    shapeRendering: 'auto',
    backgroundPosition: 'initial initial',
    backgroundRepeat: 'initial initial',
};
function Ellipsis({ className = undefined }) {
    return (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", className: (0, clsx_1.default)('loading-ellipsis-animation', className), style: inlineEllipsisStyle, width: "29px", height: "29px", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" },
        react_1.default.createElement("circle", { cx: "84", cy: "50", r: "10", fill: "#00abe8" },
            react_1.default.createElement("animate", { attributeName: "r", repeatCount: "indefinite", dur: "0.7352941176470588s", calcMode: "spline", keyTimes: "0;1", values: "9;0", keySplines: "0 0.5 0.5 1", begin: "0s" }),
            react_1.default.createElement("animate", { attributeName: "fill", repeatCount: "indefinite", dur: "2.941176470588235s", calcMode: "discrete", keyTimes: "0;0.25;0.5;0.75;1", values: "#00abe8;#82d4f2;#cceffc;#82d4f2;#00abe8", begin: "0s" })),
        react_1.default.createElement("circle", { cx: "16", cy: "50", r: "10", fill: "#00abe8" },
            react_1.default.createElement("animate", { attributeName: "r", repeatCount: "indefinite", dur: "2.941176470588235s", calcMode: "spline", keyTimes: "0;0.25;0.5;0.75;1", values: "0;0;9;9;9", keySplines: "0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1", begin: "0s" }),
            react_1.default.createElement("animate", { attributeName: "cx", repeatCount: "indefinite", dur: "2.941176470588235s", calcMode: "spline", keyTimes: "0;0.25;0.5;0.75;1", values: "16;16;16;50;84", keySplines: "0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1", begin: "0s" })),
        react_1.default.createElement("circle", { cx: "50", cy: "50", r: "10", fill: "#82d4f2" },
            react_1.default.createElement("animate", { attributeName: "r", repeatCount: "indefinite", dur: "2.941176470588235s", calcMode: "spline", keyTimes: "0;0.25;0.5;0.75;1", values: "0;0;9;9;9", keySplines: "0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1", begin: "-0.7352941176470588s" }),
            react_1.default.createElement("animate", { attributeName: "cx", repeatCount: "indefinite", dur: "2.941176470588235s", calcMode: "spline", keyTimes: "0;0.25;0.5;0.75;1", values: "16;16;16;50;84", keySplines: "0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1", begin: "-0.7352941176470588s" })),
        react_1.default.createElement("circle", { cx: "84", cy: "50", r: "10", fill: "#cceffc" },
            react_1.default.createElement("animate", { attributeName: "r", repeatCount: "indefinite", dur: "2.941176470588235s", calcMode: "spline", keyTimes: "0;0.25;0.5;0.75;1", values: "0;0;9;9;9", keySplines: "0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1", begin: "-1.4705882352941175s" }),
            react_1.default.createElement("animate", { attributeName: "cx", repeatCount: "indefinite", dur: "2.941176470588235s", calcMode: "spline", keyTimes: "0;0.25;0.5;0.75;1", values: "16;16;16;50;84", keySplines: "0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1", begin: "-1.4705882352941175s" })),
        react_1.default.createElement("circle", { cx: "16", cy: "50", r: "10", fill: "#82d4f2" },
            react_1.default.createElement("animate", { attributeName: "r", repeatCount: "indefinite", dur: "2.941176470588235s", calcMode: "spline", keyTimes: "0;0.25;0.5;0.75;1", values: "0;0;9;9;9", keySplines: "0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1", begin: "-2.205882352941176s" }),
            react_1.default.createElement("animate", { attributeName: "cx", repeatCount: "indefinite", dur: "2.941176470588235s", calcMode: "spline", keyTimes: "0;0.25;0.5;0.75;1", values: "16;16;16;50;84", keySplines: "0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1", begin: "-2.205882352941176s" }))));
}
exports.default = Ellipsis;
//# sourceMappingURL=Ellipsis.js.map