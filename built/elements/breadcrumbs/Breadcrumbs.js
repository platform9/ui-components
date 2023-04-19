"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const use_react_router_1 = __importDefault(require("use-react-router"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const usePluginRouter_1 = __importDefault(require("../../hooks/usePluginRouter"));
const route_1 = require("../../plugins/route");
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const Crumb_1 = __importDefault(require("./Crumb"));
const helpers_1 = require("./helpers");
function Breadcrumbs({ nameOverrides }) {
    const { currentLink } = (0, usePluginRouter_1.default)();
    const { match, location } = (0, use_react_router_1.default)();
    const classes = useStyles({});
    const currentRoute = route_1.Route.getCurrentRoute();
    if (!currentRoute) {
        console.error('[breadcrumbs] no current route found for path', location.pathname);
        return null;
    }
    const crumbs = (0, helpers_1.getCrumbs)(currentRoute.breadcrumbs, nameOverrides, match.params);
    return (react_1.default.createElement("ul", { className: (0, clsx_1.default)(classes.breadcrumbs, classes.gridContainer, {
            [classes.fourCrumbs]: crumbs.length === 4,
            [classes.fiveCrumbs]: crumbs.length === 5,
        }) }, crumbs.map((crumb, idx) => (react_1.default.createElement(Crumb_1.default, { key: crumb.name, leftIcon: idx === 0 && (react_1.default.createElement(FontAwesomeIcon_1.default, { className: (0, clsx_1.default)(classes.icon, classes.primaryIcon) }, currentLink === null || currentLink === void 0 ? void 0 : currentLink.icon)), name: crumb.name, path: crumb.path, icon: "chevron-right", active: idx === crumbs.length - 1 })))));
}
exports.default = Breadcrumbs;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    gridContainer: {
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'start',
        gridAutoFlow: 'column',
        gap: 8,
    },
    breadcrumbs: {
        gap: 8,
        padding: 0,
        margin: 0,
    },
    primaryIcon: {
        fontSize: 20,
        color: theme.components.breadcrumb.text,
    },
}));
//# sourceMappingURL=Breadcrumbs.js.map