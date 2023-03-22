"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FontAwesomeIcon_1 = __importDefault(require("../components/FontAwesomeIcon"));
const styles_1 = require("@material-ui/styles");
const SimpleLink_1 = __importDefault(require("./SimpleLink"));
const tooltip_1 = __importDefault(require("../elements/tooltip"));
const colorMap = {
    white: '100',
    black: '700',
};
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    icon: {
        cursor: ({ isLink }) => (isLink ? 'pointer' : 'default'),
        fontWeight: 300,
        color: ({ color }) => theme.palette.grey[colorMap[color]],
    },
}));
const HelpContainer = ({ title = 'Help', icon = 'question-circle', color = 'white', link = undefined, }) => {
    const classes = useStyles({ color, isLink: !!link });
    const content = link ? (react_1.default.createElement(SimpleLink_1.default, { src: link },
        react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.icon }, icon))) : (react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.icon }, icon));
    return react_1.default.createElement(tooltip_1.default, { message: title }, content);
};
exports.default = HelpContainer;
//# sourceMappingURL=HelpContainer.js.map