"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const Badge_1 = __importDefault(require("./Badge"));
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const misc_1 = require("../../utils/misc");
const button_1 = __importDefault(require("../button"));
const defaults_1 = require("../menu/defaults");
const TooltipListBody_1 = __importDefault(require("../tooltip/TooltipListBody"));
const defaultMaxBadgesVisible = {
    panel: 6,
    table: 3,
    string: 6,
};
const tooltipListProps = Object.assign(Object.assign({}, defaults_1.topLeft), { origin: 'right bottom' });
const getDefaultEllipsisAt = (0, misc_1.memoize)((entityType) => entityType === 'annotations' ? 200 : entityType === 'labels' ? 15 : null);
function Badges({ values: allItems = [], entityType = 'string', containerType = 'panel', variant, ellipsisAt: _ellipsisAt = getDefaultEllipsisAt(entityType), maxVisible: _maxVisible, showMoreButton = false, bold = false, }) {
    const maxVisible = _maxVisible || defaultMaxBadgesVisible[entityType];
    const ellipsisAt = containerType === 'table' ? 15 : _ellipsisAt;
    const classes = useStyles({ containerType });
    const [showAll, setShowAll] = (0, react_1.useState)(false);
    const [itemsToShow, remainingLabels] = (0, react_1.useMemo)(() => {
        if (!showAll && allItems.length > maxVisible) {
            return [allItems.slice(0, maxVisible), allItems.slice(maxVisible)];
        }
        return [allItems, []];
    }, [showAll, allItems, maxVisible]);
    const showButton = (0, react_1.useMemo)(() => {
        return showMoreButton && allItems.length > maxVisible;
    }, [showMoreButton, allItems, maxVisible]);
    return (react_1.default.createElement("div", { "data-testid": (0, test_helpers_1.default)(entityType), className: classes.labelsOrAnnotations },
        itemsToShow.map(({ text, tooltipText, additionalText }) => (react_1.default.createElement(Badge_1.default, { variant: variant, key: text, text: text, additionalText: additionalText, bold: bold, ellipsisAt: ellipsisAt, tooltipProps: tooltipListProps, tooltipBody: react_1.default.createElement(TooltipListBody_1.default, { items: [tooltipText] }) }))),
        (_maxVisible !== undefined || containerType === 'table') && allItems.length > maxVisible && (react_1.default.createElement(Badge_1.default, { variant: variant, text: `+${allItems.length - maxVisible}`, bold: bold, tooltipBody: react_1.default.createElement(TooltipListBody_1.default, { items: remainingLabels, nameKey: "text" }), tooltipProps: tooltipListProps })),
        showButton && (react_1.default.createElement(button_1.default, { className: classes.showMoreButton, onClick: () => setShowAll(!showAll) }, showAll ? 'Show less' : 'Show more'))));
}
exports.default = Badges;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    labelsOrAnnotations: {
        display: 'flex',
        flexFlow: ({ containerType }) => (containerType === 'table' ? 'nowrap' : 'wrap'),
        maxWidth: ({ containerType }) => (containerType === 'table' ? '480px' : 'max-content'),
        overflow: 'auto',
        gap: 8,
    },
    showMoreButton: {
        borderRadius: 4,
        padding: '2px 12px 5px 12px',
        margin: theme.spacing(1),
        minHeight: 'initial',
        height: 'max-content',
    },
}));
//# sourceMappingURL=Badges.js.map