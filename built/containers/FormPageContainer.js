"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../elements/Text"));
const useStyles = (0, styles_1.makeStyles)((theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return ({
        page: {
            minWidth: '100vw',
            minHeight: '100vh',
            boxSizing: 'border-box',
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.components) === null || _a === void 0 ? void 0 : _a.frame) === null || _b === void 0 ? void 0 : _b.background,
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            '@media (max-width:992px)': {
                '& .form-page-footer': {
                    maxWidth: 250,
                },
            },
        },
        container: {
            width: 1120,
            minHeight: 600,
            borderRadius: 16,
            border: `solid 1px ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.components) === null || _c === void 0 ? void 0 : _c.card) === null || _d === void 0 ? void 0 : _d.border}`,
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            overflow: 'hidden',
            '@media (max-width:1200px)': {
                width: 912,
                '& .left-pane': {
                    padding: '0 58px',
                },
                '& .right-pane': {
                    paddingLeft: 48,
                    paddingRight: 48,
                },
            },
            '@media (max-width:992px)': {
                gridTemplateColumns: 'unset',
                maxWidth: 400,
                minHeight: 475,
                width: '100%',
                '& .left-pane': {
                    display: 'none',
                },
            },
            '@media (max-width:480px)': {
                maxWidth: 360,
                '& .right-pane': {
                    paddingLeft: 24,
                    paddingRight: 24,
                },
            },
        },
        managementPlane: {
            backgroundColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.components) === null || _e === void 0 ? void 0 : _e.frame) === null || _f === void 0 ? void 0 : _f.accentBackground,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 80px',
            borderRight: `solid 1px ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.components) === null || _g === void 0 ? void 0 : _g.card) === null || _h === void 0 ? void 0 : _h.border}`,
        },
        formPane: {
            position: 'relative',
            padding: '48px 24px',
            backgroundColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.components) === null || _j === void 0 ? void 0 : _j.card) === null || _k === void 0 ? void 0 : _k.background,
            display: 'grid',
            alignItems: 'center',
            justifyItems: 'center',
            gridGap: theme.spacing(2),
        },
        img: {
            maxWidth: '100%',
        },
        logo: {
            width: 240,
            marginBottom: theme.spacing(6),
        },
        footer: {
            marginTop: 16,
        },
    });
});
const FormPageContainer = ({ children, className = undefined, footer = undefined, logoUrl = undefined, logoText = undefined, primayImgUrl, }) => {
    const classes = useStyles();
    return (react_1.default.createElement("section", { id: (0, clsx_1.default)('form-page-container', className), className: (0, clsx_1.default)('form-page-container', classes.page) },
        !logoUrl && !!logoText && (react_1.default.createElement(Text_1.default, { className: "form-logo", variant: "subtitle1" }, logoText)),
        !!logoUrl && (react_1.default.createElement("img", { src: logoUrl, alt: "Platform9 Logo", className: (0, clsx_1.default)('form-logo', classes.logo) })),
        react_1.default.createElement("article", { className: classes.container },
            react_1.default.createElement("div", { className: (0, clsx_1.default)('left-pane', classes.managementPlane) },
                react_1.default.createElement("img", { alt: "Platform9 Management Plane", src: primayImgUrl, className: classes.img })),
            react_1.default.createElement("div", { className: (0, clsx_1.default)('right-pane', classes.formPane) }, children)),
        footer && react_1.default.createElement("footer", { className: (0, clsx_1.default)('form-page-footer', classes.footer) }, footer)));
};
exports.default = FormPageContainer;
//# sourceMappingURL=FormPageContainer.js.map