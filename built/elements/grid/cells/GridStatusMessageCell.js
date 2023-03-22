"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const fp_1 = require("../../../utils/fp");
const Text_1 = __importDefault(require("../../../elements/Text"));
const tooltip_1 = __importDefault(require("../../../elements/tooltip"));
const defaults_1 = require("../../../elements/menu/defaults");
function GridStatusMessageCell({ value: status }) {
    const classes = useStyles({});
    if (fp_1.isNilOrEmpty(status) || status.state === 'Running')
        return null;
    const reason = status.reason || '';
    const message = status.message || '';
    const separator = reason && message ? ': ' : '';
    return (react_1.default.createElement(tooltip_1.default, { align: defaults_1.topMiddle.align, offset: defaults_1.topMiddle.offset, origin: "right bottom", message: `${reason}${separator}${message}` },
        react_1.default.createElement(Text_1.default, { variant: "body2", lineClamp: 2, className: classes.clampText },
            react_1.default.createElement("b", null, reason),
            separator,
            message)));
}
exports.default = GridStatusMessageCell;
const useStyles = styles_1.makeStyles((theme) => ({
    clampText: {
        maxWidth: 400,
    },
}));
//# sourceMappingURL=GridStatusMessageCell.js.map