"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Menu_1 = __importDefault(require("../../elements/menu/Menu"));
const useToggler_1 = __importDefault(require("../../hooks/useToggler"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const Checkbox_1 = __importDefault(require("../../elements/input/Checkbox"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const styles_2 = require("@material-ui/styles");
const menuOffset = {
    vertical: 0,
    horizontal: -100,
};
const GridColumnsButton = (0, styles_2.styled)(({ className, onClick }) => (react_1.default.createElement(Text_1.default, { noWrap: true, onClick: onClick, component: "div", className: className },
    react_1.default.createElement(FontAwesomeIcon_1.default, null, "gear"),
    "Customize")))(({ theme }) => (Object.assign(Object.assign({}, theme.typography.inputTable), { display: 'grid', gridAutoFlow: 'column', cursor: 'pointer', alignItems: 'center', padding: theme.spacing(1, 2), borderRadius: 4, gap: 8, '&:hover': {
        backgroundColor: theme.components.table.hoverBackground,
    } })));
function GridColumnsPopover({ columnTogglers }) {
    const classes = useStyles({});
    const [isOpen, toggleIsOpen] = (0, useToggler_1.default)();
    return (react_1.default.createElement(Menu_1.default, { id: "grid-columns-menu", origin: "top right", offset: menuOffset, className: classes.menu, anchor: react_1.default.createElement(GridColumnsButton, { onClick: toggleIsOpen }), open: isOpen, onClose: toggleIsOpen }, columnTogglers.map(({ key, label, visible, disabled, toggleColumn }) => (react_1.default.createElement(Checkbox_1.default, { key: key, label: label, disabled: disabled, checked: visible, onChange: toggleColumn })))));
}
exports.default = GridColumnsPopover;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    menu: {
        '& .menu-popover': {
            minWidth: 150,
            padding: '8px',
        },
    },
}));
//# sourceMappingURL=GridColumnsPopover.js.map