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
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../elements/Text"));
function ProductInfoPage({ title, footerTitle = undefined, className, rootClassName, children, icon, actions = [], componentDidMountFn, componentWillUnmountFn, }) {
    const classes = useStyles();
    //   const dispatch = useDispatch()
    (0, react_1.useEffect)(() => {
        componentDidMountFn && componentDidMountFn();
        return () => {
            componentWillUnmountFn && componentWillUnmountFn();
        };
    }, []);
    //   useEffect(() => {
    //     dispatch(clientActions.setSidebarState('collapsed'))
    //     return () => {
    //       dispatch(clientActions.setSidebarState('expanded'))
    //     }
    //   }, [])
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.productInfoPage, rootClassName) },
        react_1.default.createElement("article", { className: (0, clsx_1.default)(classes.productInfoContent, className) },
            react_1.default.createElement(Text_1.default, { variant: "h2", component: "header", className: (0, clsx_1.default)('product-info-title', classes.productInfoTitle) }, title),
            react_1.default.createElement("div", { className: (0, clsx_1.default)('product-info-body', classes.productInfoBody) }, children),
            icon && (react_1.default.createElement("figure", { className: (0, clsx_1.default)('product-info-figure', classes.productInfoFigure) }, icon)),
            react_1.default.createElement("footer", { className: (0, clsx_1.default)('product-info-footer', classes.productInfoFooter) },
                footerTitle ? (react_1.default.createElement(Text_1.default, { variant: "caption2", className: classes.productInfoFooterTitle }, footerTitle)) : null,
                actions))));
}
exports.default = ProductInfoPage;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    '@global': {
        'html .content-main': {
            gridAutoRows: '1fr',
        },
    },
    productInfoPage: {
        display: 'grid',
        alignItems: 'center',
    },
    productInfoContent: {
        width: '100%',
        maxWidth: 1250,
        display: 'grid',
        gridTemplateAreas: `
      "product-info-title product-info-figure"
      "product-info-body product-info-figure"
      "product-info-footer product-info-figure"
    `,
        marginBottom: 40,
        gridTemplateColumns: '1fr max-content',
        gridTemplateRows: 'max-content max-content 1fr',
        justifySelf: 'center',
        gap: 32,
        '@media (max-width:1440px)': {
            maxWidth: 895,
            '& > .product-info-body, & > .product-info-title, & > .product-info-footer': {
                maxWidth: 480,
            },
            '& > .product-info-figure': {
                width: 320,
                height: 320,
                '& svg': {
                    width: 180,
                    height: 180,
                },
            },
        },
        '@media (max-width:992px)': {
            maxWidth: 'max-content',
            gridTemplateAreas: `
        "product-info-figure"
        "product-info-title"
        "product-info-body"
        "product-info-footer"
      `,
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'repeat(4, max-content)',
            '& > .product-info-title': {
                marginTop: 0,
                display: 'grid',
                alignItems: 'center',
            },
            '& > .product-info-figure': {
                width: 160,
                height: 160,
                '& svg': {
                    width: 88,
                    height: 88,
                },
            },
        },
    },
    productInfoTitle: {
        maxWidth: 520,
        gridArea: 'product-info-title',
        marginTop: 16,
    },
    productInfoBody: {
        maxWidth: 575,
        gridArea: 'product-info-body',
        display: 'grid',
        gridAutoRows: 'max-content',
        gap: '16px',
        justifyItems: 'start',
    },
    productInfoFigure: {
        backgroundColor: theme.components.iconButton.background,
        border: `1px solid ${theme.components.iconButton.border}`,
        borderRadius: '100%',
        margin: 0,
        padding: 0,
        gridArea: 'product-info-figure',
        width: 400,
        height: 400,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    productInfoFooter: {
        maxWidth: 575,
        marginTop: 16,
        display: 'grid',
        gridArea: 'product-info-footer',
        gap: 16,
    },
    productInfoFooterTitle: {
        color: theme.components.typography.passive,
        textTransform: 'uppercase',
    },
}));
//# sourceMappingURL=ProductInfoPage.js.map