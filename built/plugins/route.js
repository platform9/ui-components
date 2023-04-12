"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUrlWithQueryString = exports.Route = void 0;
const url_pattern_1 = __importDefault(require("url-pattern"));
const misc_1 = require("../utils/misc");
class Route {
    constructor(options) {
        this.path = (params) => {
            // @ts-ignore
            const allParams = Object.assign(Object.assign({}, this.defaultParams), (params || {}));
            return createUrlWithQueryString(new URL(this.url, window.location.origin), allParams);
        };
        this.id = options.id;
        this.url = options.url;
        this.name = options.name;
        this.breadcrumbs = options.breadcrumbs || new Map();
        this.defaultParams = options.defaultParams || {};
        this.pattern = new url_pattern_1.default(options.url);
        this.tab = options.tab || '';
    }
    toString(prefix = '') {
        return this.path(null).replace(prefix, '');
    }
    /**
     * Register a route for this application
     * @param route route to register
     */
    static register(routeOptions) {
        const route = new Route(routeOptions);
        Route.routes.push(route);
        return route;
    }
    static getRoutes() {
        return Route.routes;
    }
    static getCurrentRoute(pathname = '') {
        if (!pathname) {
            pathname = `${location.pathname}${location.hash}`;
        }
        return Route.find(pathname);
    }
}
Route.routes = [];
Route.find = (0, misc_1.memoize)((pathname) => {
    return Route.getRoutes().find((r) => !!r.pattern.match(pathname));
});
Route.findRouteById = (0, misc_1.memoize)((id) => {
    return Route.getRoutes().find((r) => r.id === id);
});
exports.Route = Route;
/*
    createUrlWithQueryString(routes.cluster.edit, {id: 'asdf', name: 'fdsa'})
    produces /ui/kubernetesd/clusters/edit/asdf?name=fdsa`,
  */
function createUrlWithQueryString(url, params) {
    if (!params || Object.keys(params || {}).length === 0) {
        if (typeof url === 'string') {
            return url;
        }
        return url.toString().replace(url.origin, '');
    }
    if (typeof url === 'string') {
        url = new URL(url, window.location.origin);
    }
    const fields = Object.assign({}, params);
    // nice utility to reconstruct urls from objects / models
    // replace pathname variables (e.g. '/:id') with params when applicable
    if (url.pathname.includes(':')) {
        const matches = url.pathname.match(/:([0-9_a-z]+)/gi) || [];
        matches.forEach((match) => {
            const key = match.replace(':', '');
            // dont replace if there isn't a substitution
            // @ts-ignore
            url.pathname = url.pathname.replace(match, fields[key] || match);
            delete fields[key];
        });
    }
    // replace a hash variable (e.g. '#:id') with params when applicable
    if (url.hash.includes(':')) {
        const [match = ''] = url.hash.match(/:([0-9_a-z]+)/gi) || [];
        const key = match.replace(':', '');
        if (key) {
            url.hash = url.hash.replace(match, fields[key] || match);
            delete fields[key];
        }
    }
    // Tack on the remaining key values from our params to the URL's searchParams
    for (const [key, value] of Object.entries(fields)) {
        url.searchParams.append(key, value);
    }
    // URL requires an origin, but these routes need to omit the origin
    return `${url.toString().replace(url.origin, '')}`;
}
exports.createUrlWithQueryString = createUrlWithQueryString;
//# sourceMappingURL=route.js.map