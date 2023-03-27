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
const clsx_1 = __importDefault(require("clsx"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const useToggler_1 = __importDefault(require("../../hooks/useToggler"));
const defaults_1 = require("../../elements/menu/defaults");
const Menu_1 = __importDefault(require("../../elements/menu/Menu"));
const MenuItem_1 = __importDefault(require("../../elements/menu/MenuItem"));
const styles_1 = require("@material-ui/styles");
function GridRowMenu({ item, rowMenuItems, rowMenuDisabled, rowMenuOffset = {}, showRowMenuForSingleRowActions = false, }) {
    const filteredRowMenuItems = rowMenuItems.filter((rowItem) => {
        if (rowItem === null || rowItem === void 0 ? void 0 : rowItem.hideIfDisabled) {
            return !(rowItem === null || rowItem === void 0 ? void 0 : rowItem.getIsDisabled(item));
        }
        return true;
    });
    const classes = useStyles({});
    const [isOpen, toggleIsOpen] = (0, useToggler_1.default)();
    const handleMenuClick = (0, react_1.useCallback)((e) => {
        toggleIsOpen();
        e.stopPropagation();
    }, []);
    if (rowMenuDisabled || !filteredRowMenuItems.length) {
        return null;
    }
    if (!showRowMenuForSingleRowActions && filteredRowMenuItems.length === 1) {
        const [{ RowMenuButton, icon, label, getIsDisabled, triggerAction }] = filteredRowMenuItems;
        return (react_1.default.createElement("div", { className: (0, clsx_1.default)('rowMenu', classes.gridRowMenu) }, label ? (react_1.default.createElement(RowMenuButton, { disabled: getIsDisabled(item), icon: icon, onClick: () => triggerAction(item) }, label)) : (react_1.default.createElement(FontAwesomeIcon_1.default, { disabled: getIsDisabled(item), onClick: () => triggerAction(item) }, icon))));
    }
    return (react_1.default.createElement(Menu_1.default, { align: defaults_1.middleLeft.align, offset: Object.assign(Object.assign({}, defaults_1.middleLeft.offset), rowMenuOffset), origin: "top left", onClick: handleMenuClick, className: (0, clsx_1.default)('rowMenu', classes.gridRowMenu), anchor: react_1.default.createElement(FontAwesomeIcon_1.default, null, "ellipsis-vertical"), open: isOpen, onClose: toggleIsOpen }, filteredRowMenuItems.map(({ key, icon, label, getIsDisabled, triggerAction }) => (react_1.default.createElement(MenuItem_1.default, { key: key, readonly: getIsDisabled(item), icon: icon, onClick: () => triggerAction(item) }, label)))));
}
exports.default = GridRowMenu;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    gridRowMenu: {
        cursor: 'pointer',
        '& > i': {
            fontWeight: 'bold',
        },
        textAlign: 'center',
        lineHeight: '56px',
        // visibility: 'hidden',
        position: 'absolute',
        marginTop: 1,
        inset: '0 0 0 auto',
        padding: theme.spacing(0, 1),
        minWidth: 20,
        backgroundColor: 'inherit',
        transition: 'visibility 150ms ease',
        '& .menu-popover': {
            minWidth: 60,
            padding: '8px',
        },
    },
    warning: {
        color: theme.palette.red[500],
    },
}));
//# sourceMappingURL=GridRowMenu.js.map