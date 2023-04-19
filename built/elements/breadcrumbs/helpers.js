"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCrumbs = void 0;
const route_1 = require("../../plugins/route");
const misc_1 = require("../../utils/misc");
const newCrumb = (name, path) => ({
    name,
    path,
});
const getCrumbName = (pathPart, params) => {
    if (pathPart.includes(':')) {
        const key = pathPart.replace(':', '');
        return params[key];
    }
    else {
        return pathPart.split('-').map(misc_1.capitalizeString).join(' ');
    }
};
const getCrumbPath = (routeId, params) => {
    if (!routeId) {
        return null;
    }
    const foundRoute = route_1.Route.findRouteById(routeId);
    if (!foundRoute) {
        return null;
    }
    // remove any excess params that are converted to qs
    return foundRoute.path(params).split('?')[0];
};
exports.getCrumbs = (0, misc_1.memoize)((breadcrumbs, breadCrumbParams, routeParams) => {
    if (!breadcrumbs) {
        return [];
    }
    const crumbs = [];
    for (const [pathPart, routeId] of breadcrumbs.entries()) {
        const name = getCrumbName(pathPart, breadCrumbParams);
        const path = getCrumbPath(routeId, routeParams);
        crumbs.push(newCrumb(name, path));
    }
    return crumbs;
});
//# sourceMappingURL=helpers.js.map