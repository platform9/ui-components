"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesCurrentPath = exports.matchLinkToPath = void 0;
const react_router_1 = require("react-router");
const misc_1 = require("../utils/misc");
const matchLinkToPath = (url) => (0, misc_1.memoize)((link) => {
    var _a;
    if ((0, exports.matchesCurrentPath)(url, link.link)) {
        return true;
    }
    else if ((_a = link === null || link === void 0 ? void 0 : link.nestedLinks) === null || _a === void 0 ? void 0 : _a.some(({ link }) => (0, exports.matchesCurrentPath)(url, link))) {
        return true;
    }
    return false;
});
exports.matchLinkToPath = matchLinkToPath;
exports.matchesCurrentPath = (0, misc_1.memoize)((url, link) => link &&
    (0, react_router_1.matchPath)(url, {
        path: link.definition || link.path,
        exact: link.exact || false,
        strict: false,
    }));
//# sourceMappingURL=route-helpers.js.map