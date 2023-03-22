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
const prop_types_1 = __importDefault(require("prop-types"));
const react_router_dom_1 = require("react-router-dom");
const styles_1 = require("@material-ui/styles");
const IconButton_1 = __importDefault(require("../../elements/button/IconButton"));
const tooltip_1 = __importDefault(require("../../elements/tooltip"));
const useStyles = styles_1.makeStyles((theme) => ({
    link: {
        display: 'block',
    },
}));
const CloseButton = (_a) => {
    var { tooltip = 'Cancel' } = _a, props = __rest(_a, ["tooltip"]);
    const classes = useStyles({});
    const icon = react_1.default.createElement(IconButton_1.default, Object.assign({ icon: "times-circle" }, props));
    return (react_1.default.createElement(tooltip_1.default, { message: tooltip }, props.to ? (react_1.default.createElement(react_router_dom_1.Link, { className: classes.link, to: props.to }, icon)) : (icon)));
};
CloseButton.propTypes = {
    to: prop_types_1.default.string,
    onClick: prop_types_1.default.func,
};
exports.default = CloseButton;
//# sourceMappingURL=CloseButton.js.map