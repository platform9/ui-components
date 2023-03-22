"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("../elements/Text"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    ul: {
        padding: 0,
        margin: 0,
        paddingLeft: theme.spacing(2),
        marginLeft: theme.spacing(2),
        listStyleType: ({ type }) => (type === 'dash' ? '"-  "' : type),
        fontSize: '16px',
    },
}));
const BulletList = ({ items = [], type = 'disc', className = undefined }) => {
    const styles = useStyles({ type });
    return (react_1.default.createElement("ul", { className: (0, clsx_1.default)(styles.ul, className) }, items.map((item, idx) => (react_1.default.createElement("li", { key: idx }, typeof item === 'string' ? react_1.default.createElement(Text_1.default, { variant: "body2" }, item) : item)))));
};
exports.default = BulletList;
//# sourceMappingURL=BulletList.js.map