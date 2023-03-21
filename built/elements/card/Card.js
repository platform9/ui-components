"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const CardHeader_1 = __importDefault(require("./CardHeader"));
const CardBody_1 = __importDefault(require("./CardBody"));
const CardFooter_1 = __importDefault(require("./CardFooter"));
const test_helpers_1 = __importDefault(require("src/utils/test-helpers"));
const getTitleComponent = (title) => typeof title === 'string' ? react_1.default.createElement(CardHeader_1.default, null, title) : title;
function Card({ title, children, footer = undefined, withCustomBody = false, withCustomFooter = false, className = undefined, }) {
    const classes = useStyles({});
    const titleComponent = getTitleComponent(title);
    const BodyComponent = withCustomBody ? react_1.default.Fragment : CardBody_1.default;
    const FooterComponent = withCustomFooter ? react_1.default.Fragment : CardFooter_1.default;
    return (react_1.default.createElement("article", { "data-testid": (0, test_helpers_1.default)('cluster', 'status'), className: (0, clsx_1.default)(classes.card, className) },
        !!titleComponent && titleComponent,
        react_1.default.createElement(BodyComponent, null, children),
        footer && react_1.default.createElement(FooterComponent, null, footer)));
}
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    card: {
        backgroundColor: theme.components.card.background,
        borderRadius: '4px 4px 2px 2px',
        border: `1px solid ${theme.components.card.border}`,
    },
}));
exports.default = Card;
//# sourceMappingURL=Card.js.map