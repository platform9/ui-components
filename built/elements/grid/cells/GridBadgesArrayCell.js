"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGridBadgesArrayCell = void 0;
const react_1 = __importDefault(require("react"));
const Badge_1 = __importDefault(require("../../../elements/badge/Badge"));
const styles_1 = require("@material-ui/styles");
const TooltipListBody_1 = __importDefault(require("../../../elements/tooltip/TooltipListBody"));
function GridBadgesArrayCell({ value: items = [], badgeVariant = 'default', maxItems = 3, }) {
    const classes = useStyles({});
    const itemsToDisplay = items.slice(0, maxItems);
    return (react_1.default.createElement("div", { className: classes.cell },
        react_1.default.createElement("div", { className: classes.badges }, itemsToDisplay.map((item) => {
            const name = String(item);
            return react_1.default.createElement(Badge_1.default, { key: name, text: name, variant: badgeVariant });
        })),
        items.length > maxItems && (react_1.default.createElement("div", { className: classes.additionalItemsCount },
            react_1.default.createElement(Badge_1.default, { variant: badgeVariant, text: `+${items.length - maxItems}`, tooltipBody: react_1.default.createElement(TooltipListBody_1.default, { items: items }) })))));
}
exports.default = GridBadgesArrayCell;
function createGridBadgesArrayCell({ badgeVariant, maxItems, }) {
    return (props) => {
        return react_1.default.createElement(GridBadgesArrayCell, Object.assign({}, props, { badgeVariant: badgeVariant, maxItems: maxItems }));
    };
}
exports.createGridBadgesArrayCell = createGridBadgesArrayCell;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    cell: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'max-content',
        gridGap: theme.spacing(1),
    },
    badges: {
        display: 'grid',
        gridGap: theme.spacing(1),
    },
    additionalItemsCount: {
        alignSelf: 'end',
    },
}));
//# sourceMappingURL=GridBadgesArrayCell.js.map