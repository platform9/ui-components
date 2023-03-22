"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("../../elements/Text"));
const colorHelpers_1 = require("../../utils/colorHelpers");
// import DocumentMeta from '../components/DocumentMeta'
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
// TODO: Find a way to add DocumentMeta back in. I had to take it out for now
// since it requires us to import the Breadcrumbs component which is more PF9 UI
// specific
function Modal(_a) {
    var { onClose, onClick, onBackdropClick, open = false, showOverlay = true, title = '', entityName = '', info = '', anchorId = 'modal-portal-root', footer = undefined, slideFrom = 'right', panel = 'drawer', maxWidth, children, className } = _a, rest = __rest(_a, ["onClose", "onClick", "onBackdropClick", "open", "showOverlay", "title", "entityName", "info", "anchorId", "footer", "slideFrom", "panel", "maxWidth", "children", "className"]);
    const animationDuration = panel === 'drawer' ? 350 : 200;
    const hasFooter = !!footer;
    const classes = useStyles({ hasFooter, slideFrom, panel, animationDuration, maxWidth });
    const containerElem = react_1.useMemo(() => document.getElementById(anchorId), [anchorId]);
    const [openState, setOpenState] = react_1.useState(false);
    react_1.useEffect(() => {
        if (open && !openState) {
            // give the first render cycle time before kicking off the animation
            setTimeout(() => {
                setOpenState(true);
            }, 10);
        }
        if (!open && openState) {
            // give the last render cycle its animation duration before removal
            setTimeout(() => {
                setOpenState(false);
            }, animationDuration);
        }
    }, [open]);
    const handleBackdropClick = react_1.useCallback((e) => {
        onBackdropClick ? onBackdropClick(e) : onClose(e);
    }, [onClose, onBackdropClick]);
    if (!open && !openState) {
        return null;
    }
    const infoComponent = !info ? null : typeof info === 'string' ? (react_1.default.createElement(Text_1.default, { "data-testid": test_helpers_1.default('test', 'completion', 'status'), variant: "body1" }, info)) : (info);
    const content = (react_1.default.createElement("div", { className: clsx_1.default(classes.modalPage, {
            [classes.isNotOpen]: !open,
            [classes.isOpen]: openState && open,
        }) },
        react_1.default.createElement("div", { className: clsx_1.default({
                [classes.overlay]: showOverlay,
            }), onClick: handleBackdropClick }),
        react_1.default.createElement("article", Object.assign({ onClick: onClick, className: clsx_1.default(className, classes.modalContainer, { open: openState && open }) }, rest),
            (title || infoComponent) && (react_1.default.createElement(Text_1.default, { "data-testid": test_helpers_1.default(title, 'grid', 'text'), component: "header", variant: "h4", className: clsx_1.default('modal-header', classes.gridContainer, classes.modalHeader) },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", null, title),
                    entityName && react_1.default.createElement("span", { className: classes.entityName }, ` (${entityName})`)),
                infoComponent)),
            react_1.default.createElement("section", { className: clsx_1.default('modal-body', classes.modalBody) }, children),
            hasFooter && (react_1.default.createElement(Text_1.default, { component: "footer", className: clsx_1.default('modal-footer', classes.gridContainer, classes.modalFooter) }, footer)))));
    return react_dom_1.default.createPortal(content, containerElem);
}
exports.default = Modal;
const getTranslateAxis = (slideFrom, value) => {
    const translateAxis = slideFrom === 'left' || slideFrom === 'right' ? 'X' : 'Y';
    const posNegAxis = slideFrom === 'left' || slideFrom === 'top' ? '-' : '';
    return `translate${translateAxis}(${posNegAxis}${value}${value === 0 ? '' : '%'})`;
};
const useStyles = styles_1.makeStyles((theme) => ({
    modalPage: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'grid',
        justifyItems: ({ panel }) => (panel === 'drawer' ? 'end' : 'center'),
        alignItems: 'center',
        alignContent: ({ panel }) => (panel === 'drawer' ? 'start' : 'center'),
        transitionProperty: 'transform, opacity',
        transitionDuration: ({ animationDuration }) => `${animationDuration}ms`,
        transitionTimingFunction: 'ease-out',
        opacity: 0,
        transform: ({ slideFrom, panel }) => panel === 'drawer' ? getTranslateAxis(slideFrom, 115) : 'unset',
    },
    isNotOpen: {
        transitionTimingFunction: 'ease-in',
    },
    isOpen: {
        opacity: 1,
        transform: ({ slideFrom, panel }) => panel === 'drawer' ? getTranslateAxis(slideFrom, 0) : 'unset',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colorHelpers_1.hexToRgbaCss(theme.components.frame.background, 0.75),
        zIndex: 1,
        cursor: 'pointer',
    },
    modalContainer: {
        height: ({ panel }) => (panel === 'drawer' ? '100vh' : 'unset'),
        width: '100%',
        maxHeight: ({ panel }) => (panel === 'dialog' ? '90vh' : 'initial'),
        minWidth: 'min-content',
        maxWidth: ({ panel, maxWidth }) => (maxWidth ? maxWidth : panel === 'dialog' ? 500 : 800),
        backgroundColor: theme.components.card.background,
        border: `1px solid ${theme.components.card.border}`,
        boxSizing: 'border-box',
        zIndex: 100,
        transform: ({ panel }) => (panel === 'dialog' ? 'scale(0)' : 'unset'),
        display: 'grid',
        gridTemplateRows: ({ hasFooter }) => hasFooter ? 'max-content 1fr max-content' : 'max-content 1fr',
        transitionProperty: 'transform',
        transitionDuration: ({ animationDuration }) => `${animationDuration}ms`,
        transitionTimingFunction: 'ease-out',
        '&.open': {
            transform: ({ panel }) => (panel === 'dialog' ? 'scale(1)' : 'unset'),
            transitionTimingFunction: 'ease-in',
        },
        '@media (max-width:1100px)': {
            maxWidth: 600,
        },
        '@media (max-width:800px)': {
            maxWidth: '75%',
        },
        '@media (max-width:600px)': {
            '& section.modal-body': {
                padding: '32px 16px 24px 24px',
            },
            '& header.modal-header, & footer.modal-footer': {
                padding: '0 16px 0 24px',
            },
        },
    },
    gridContainer: {
        boxSizing: 'border-box',
        height: 72,
        padding: '0 24px 0 32px',
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
    },
    modalHeader: {
        borderBottom: `1px solid ${theme.components.card.border}`,
        justifyContent: 'space-between',
    },
    entityName: {
        fontWeight: 'normal',
    },
    modalBody: {
        boxSizing: 'border-box',
        padding: '32px 24px 24px 32px',
        display: 'grid',
        gap: 16,
        alignContent: 'start',
        overflow: 'auto',
    },
    modalFooter: {
        borderTop: `1px solid ${theme.components.card.border}`,
        justifyContent: 'start',
        gap: 16,
    },
}));
//# sourceMappingURL=Modal.js.map