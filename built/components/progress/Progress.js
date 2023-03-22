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
const styles_1 = require("@material-ui/styles");
const styles_2 = require("@material-ui/styles");
const misc_1 = require("../../utils/misc");
const clsx_1 = __importDefault(require("clsx"));
const constants_1 = require("../../constants");
const Text_1 = __importDefault(require("../../elements/Text"));
const BlueLightTiles_1 = __importDefault(require("./loader-svgs/BlueLightTiles"));
const BlueDarkTiles_1 = __importDefault(require("./loader-svgs/BlueDarkTiles"));
const BluePinkLightTiles_1 = __importDefault(require("./loader-svgs/BluePinkLightTiles"));
const BluePinkDarkTiles_1 = __importDefault(require("./loader-svgs/BluePinkDarkTiles"));
const Ellipsis_1 = __importDefault(require("./loader-svgs/Ellipsis"));
const defaultLoaderHeight = 80;
const imageMap = {
    [constants_1.LoadingGifs.BluePinkTiles]: {
        light: BluePinkLightTiles_1.default,
        dark: BluePinkDarkTiles_1.default,
    },
    [constants_1.LoadingGifs.BlueTiles]: {
        light: BlueLightTiles_1.default,
        dark: BlueDarkTiles_1.default,
    },
    [constants_1.LoadingGifs.Ellipsis]: Ellipsis_1.default,
};
const getLoadingImage = misc_1.memoize((inline, imageType, themeType) => {
    if (inline) {
        return imageMap[constants_1.LoadingGifs.Ellipsis];
    }
    return imageMap[imageType][themeType];
});
// TODO: Make this component accept custom loading gifs, not just the pf9 ones
function Progress(_a) {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { loading = false, overlay = false, inline = false, renderLoadingImage = true, renderContentOnMount = true, message = 'Loading', loadingImage = constants_1.LoadingGifs.BlueTiles, loadingImageHeight = defaultLoaderHeight, inlineClassName, className, } = props;
    const theme = styles_1.useTheme();
    const classes = useStyles(props);
    const [state, setState] = react_1.useState({
        loadedOnce: false,
    });
    react_1.useEffect(() => {
        if (props.loading) {
            return;
        }
        setState({
            loadedOnce: true,
        });
    }, [props.loading]);
    const LoadingImageComponent = renderLoadingImage
        ? getLoadingImage(inline, loadingImage, theme.palette.type)
        : react_1.default.Fragment;
    const shouldRenderStatus = loading;
    const shouldNotRenderContent = !children || (!renderContentOnMount && !state.loadedOnce);
    return (react_1.default.createElement("div", { className: clsx_1.default(classes.root, 'progress-root', {
            [classes.rootInline]: inline,
        }) },
        shouldRenderStatus && (react_1.default.createElement("div", { className: clsx_1.default(classes.status, 'progress-status', {
                [classes.statusOverlayed]: overlay && loading && (renderContentOnMount || state.loadedOnce),
            }) },
            renderLoadingImage && (react_1.default.createElement(LoadingImageComponent, { className: classes.img, height: loadingImageHeight })),
            message && (react_1.default.createElement(Text_1.default, { className: clsx_1.default(classes.message, inlineClassName), variant: inline ? 'body2' : 'subtitle2' }, message)))),
        !shouldNotRenderContent && (react_1.default.createElement("div", { className: clsx_1.default(classes.content, className, 'progressContent', {
                loading,
                [classes.hiddenContent]: loading && !overlay,
                [classes.contentLoading]: loading,
            }) }, children))));
}
exports.default = Progress;
const useStyles = styles_2.makeStyles((theme) => ({
    root: {
        display: 'grid',
        position: 'relative',
        height: '100%',
        minWidth: 350,
        minHeight: ({ inline }) => (!inline ? 135 : 'unset'),
    },
    rootInline: {
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        position: 'relative',
        minWidth: 60,
    },
    message: {
        order: ({ inline }) => (inline ? -1 : 0),
    },
    img: {
        opacity: ({ inline }) => (inline ? 1 : 1),
    },
    status: {
        display: 'grid',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        rowGap: 16,
        gridAutoFlow: ({ inline }) => (inline ? 'column' : 'row'),
        gridAutoRows: 'max-content',
        alignContent: 'center',
        padding: ({ inline }) => (inline ? 'unset' : '32px 0'),
        minHeight: ({ inline, overlay }) => (inline || overlay ? 'unset' : 'max-content'),
    },
    statusOverlayed: {
        position: 'absolute',
        zIndex: 100,
        inset: ({ inline }) => (inline ? 'auto 0 8px 0' : '0 0'),
        minWidth: ({ inline }) => (inline ? 150 : 'unset'),
    },
    content: {
        width: '100%',
        transition: 'opacity .2s ease, filter .2s ease',
    },
    contentLoading: {
        opacity: ({ inline }) => (inline ? 0.6 : 0.35),
        filter: ({ inline }) => (inline ? 'unset' : 'blur(1px)'),
    },
    hiddenContent: {
        visibility: ({ inline }) => (inline ? 'visible' : 'hidden'),
        display: ({ inline }) => (inline ? 'none' : 'inherit'),
    },
}));
//# sourceMappingURL=Progress.js.map