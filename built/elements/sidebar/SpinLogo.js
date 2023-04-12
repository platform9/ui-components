"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const spinLogoPaths = {
    dark: {
        color: '#1C8CC9',
    },
    light: {
        color: '#6CCDEE',
    },
    borders: {
        color: '#23A7E0',
    },
};
const useLogoStyles = (0, styles_1.makeStyles)((theme) => ({
    logoContainer: {
        display: 'grid',
    },
    spinContainer: {
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 2s ease',
        '& #logoDefault': {
            transform: ({ active }) => active
                ? 'rotateZ(49deg) rotateX(-3deg) rotateY(71deg) scale(2.65) translate(0px, 2px)'
                : 'rotate(0deg) scale(1) translate(0px, 0px)',
            transition: '0.5s',
        },
        '& #logoDefault__bottom-layer, & #logoDefault__top-layer': {
            transition: '0.2s',
            opacity: ({ active }) => (active ? 0 : 1),
        },
        '& #logoDefault__borders': {
            opacity: ({ active }) => (active ? 0 : 1),
            transition: '0.5s',
        },
        '& #logoDefault__active-squares': {
            transition: '0.5s',
            fill: theme.components.sidebar.spinLogoFill,
            opacity: ({ active }) => (active ? 1 : 0),
        },
    },
    customLogo: {
        maxHeight: 44,
        maxWidth: 48,
    },
}));
const logoDefault = (react_1.default.createElement("svg", { id: "logoDefault", width: "48", height: "22", viewBox: "0 0 48 22", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
    react_1.default.createElement("g", { id: "Platform9DefaultLogo", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
        react_1.default.createElement("g", { id: "Platform9DefaultLogoGroup", transform: "translate(-0.000000, 0.000000)" },
            react_1.default.createElement("polygon", { id: "logoDefault__top-layer", fill: spinLogoPaths.light.color, fillRule: "nonzero", points: "48.0000652 7.98296986 24.0648984 15.9993333 0.0443984239 8.02533333 24.0228984 5.68410504e-14" }),
            react_1.default.createElement("polygon", { id: "logoDefault__bottom-layer", fill: spinLogoPaths.dark.color, fillRule: "nonzero", points: "48.0000652 13.4829699 24.0648984 21.4993333 0.0443984239 13.5253333 24.0228984 5.5" }),
            react_1.default.createElement("path", { d: "M30.2423984,2.96933333 L24.0773984,5.02433333 L17.8443984,2.95533333 L24.0263984,0.906333333 L30.2423984,2.96933333 Z M22.7023984,5.47433333 L16.4853984,7.54433333 L10.2363984,5.47433333 L16.4773984,3.40433333 L22.7013984,5.47433333 L22.7023984,5.47433333 Z M31.6353984,7.52333333 L37.8003984,5.47333333 L31.6183984,3.42533333 L25.4443984,5.47433333 L31.6273984,7.52333333 L31.6353984,7.52333333 L31.6353984,7.52333333 Z M45.3413984,7.97933333 L39.1843984,10.0213333 L33.0023984,7.97933333 L39.1673984,5.92933333 L45.3413984,7.97933333 Z M24.0443984,10.9453333 L30.2153984,12.9943333 L24.0273984,15.0503333 L17.8533984,13.0013333 L24.0353984,10.9453333 L24.0443984,10.9453333 Z M16.4863984,8.45333333 L22.6683984,10.5033333 L16.4863984,12.5443333 L16.4863984,12.5453333 L10.3123984,10.5033333 L16.4863984,8.45333333 Z M31.6353984,8.42733333 L37.8173984,10.4683333 L31.5853984,12.5383333 L31.5843984,12.5393333 L25.4023984,10.4893333 L31.6353984,8.42733333 Z M8.87839842,5.92933333 L15.1183984,7.99933333 L8.94339842,10.0473333 L2.70439842,7.97933333 L8.87839842,5.92933333 Z M24.0773984,5.92833333 L30.2593984,7.97833333 L24.0353984,10.0403333 L24.0353984,10.0413333 L17.8533984,7.99933333 L24.0773984,5.92833333 Z", id: "logoDefault__active-squares", fill: "#FFFFFF" }),
            react_1.default.createElement("path", { d: "M40.5603984,5.45933333 L47.8903984,7.89633333 C47.8903984,7.89633333 48.1423984,7.97833333 47.8823984,8.08033333 C47.7653984,8.11433333 44.0323984,9.34633333 39.5623984,10.8303333 C35.3103984,12.2453333 30.3843984,13.8803333 27.2393984,14.9233333 L27.2333984,14.9253333 L24.1533984,15.9483333 C24.0648653,15.9737049 23.9707171,15.9716127 23.8833984,15.9423333 C15.9367987,13.3041354 7.99046538,10.6651354 0.0443984239,8.02533333 C-0.0646015761,7.98533333 0.0613984239,7.93733333 0.0613984239,7.93733333 L7.46839842,5.47333333 L8.83539842,5.01633333 L15.0763984,2.94733333 L16.4433984,2.49133333 L23.8833984,0.0213333333 C23.8833984,0.0213333333 24.0433984,-0.0266666667 24.1603984,0.0213333333 C24.2703984,0.0683333333 31.6433984,2.49833333 31.6433984,2.49833333 L33.0183984,2.95433333 L39.1923984,5.00333333 L40.5593984,5.45933333 L40.5603984,5.45933333 Z M31.6343984,7.52133333 L37.7993984,5.47233333 L31.6173984,3.42333333 L25.4443984,5.47333333 L31.6263984,7.52133333 L31.6343984,7.52133333 L31.6343984,7.52133333 Z M30.2593984,7.97833333 L24.0353984,10.0403333 L17.8533984,7.99933333 L24.0773984,5.92933333 L30.2593984,7.97933333 L30.2593984,7.97833333 Z M30.2423984,2.96833333 L24.0263984,0.905333333 L17.8443984,2.95533333 L24.0773984,5.02433333 L30.2423984,2.96833333 Z M16.4773984,3.40333333 L22.7013984,5.47333333 L16.4853984,7.54233333 L10.2363984,5.47233333 L16.4763984,3.40333333 L16.4773984,3.40333333 Z M8.87739842,5.92933333 L2.70339842,7.97833333 L8.94439842,10.0473333 L15.1263984,7.99833333 L8.87739842,5.92833333 L8.87739842,5.92933333 Z M10.3113984,10.5033333 L16.4853984,8.45333333 L22.6673984,10.5033333 L16.4853984,12.5523333 L10.3123984,10.5023333 L10.3113984,10.5033333 Z M17.8533984,13.0013333 L24.0273984,15.0503333 L30.2173984,12.9943333 L24.0433984,10.9453333 L24.0353984,10.9453333 L17.8533984,13.0013333 L17.8533984,13.0013333 Z M31.5833984,12.5383333 L25.4103984,10.4883333 L31.6343984,8.42633333 L37.8163984,10.4693333 L31.5843984,12.5383333 L31.5833984,12.5383333 Z M33.0023984,7.97833333 L39.1843984,10.0203333 L45.3413984,7.97833333 L39.1673984,5.92833333 L33.0003984,7.97933333 L33.0023984,7.97833333 Z", id: "logoDefault__borders", fill: spinLogoPaths.borders.color })))));
const CustomLogo = ({ logoSrc, logoUrl }) => {
    const classes = useLogoStyles({});
    const imageSource = logoSrc ? `data:image/png;base64,${logoSrc}` : '';
    return react_1.default.createElement("img", { className: classes.customLogo, src: imageSource || logoUrl });
};
function SpinLogo({ active = false }) {
    const classes = useLogoStyles({ active });
    return react_1.default.createElement("div", { className: classes.spinContainer }, logoDefault);
    // const { logoSrc, logoUrl } = useSelector(prop<string, PreferencesState>(preferencesStoreKey))
    // const hasCustomLogo = logoSrc || logoUrl
    // return (
    //   <div className={classes.spinContainer}>
    //     {hasCustomLogo ? <CustomLogo logoSrc={logoSrc} logoUrl={logoUrl} /> : logoDefault}
    //   </div>
    // )
}
exports.default = SpinLogo;
//# sourceMappingURL=SpinLogo.js.map