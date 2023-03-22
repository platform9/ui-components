"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../elements/Text"));
const test_helpers_1 = __importDefault(require("../utils/test-helpers"));
const CardBody_1 = __importDefault(require("../elements/card/CardBody"));
const card_1 = __importDefault(require("../elements/card"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    messageContainer: {
        marginTop: theme.spacing(2),
        minHeight: ({ defaultHeight }) => `${defaultHeight}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
function NoContentMessage({ children, message, defaultHeight = 200, }) {
    const classes = useStyles({ defaultHeight });
    return (react_1.default.createElement(card_1.default, { withCustomBody: true },
        react_1.default.createElement(CardBody_1.default, { className: classes.messageContainer }, message ? (react_1.default.createElement(Text_1.default, { "data-testid": (0, test_helpers_1.default)('no', 'data', 'found'), variant: "subtitle2" }, message)) : (children))));
}
exports.default = NoContentMessage;
//# sourceMappingURL=NoContentMessage.js.map