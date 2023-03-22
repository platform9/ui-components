"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ramda_1 = require("ramda");
const styles_1 = require("@material-ui/styles");
const toPairs = ramda_1.toPairs;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    pair: {
        margin: 0,
    },
}));
const DisplayLabels = ({ labels }) => {
    const { pair } = useStyles({});
    return (react_1.default.createElement(react_1.default.Fragment, null, toPairs(labels).map(([name, value]) => (react_1.default.createElement("p", { key: name, className: pair },
        name,
        ": ",
        value)))));
};
exports.default = DisplayLabels;
//# sourceMappingURL=DisplayLabels.js.map