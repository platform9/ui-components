"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeSelector = void 0;
const ramda_1 = require("ramda");
const toolkit_1 = require("@reduxjs/toolkit");
const createThemeSlice_1 = require("./createThemeSlice");
exports.themeSelector = (0, toolkit_1.createSelector)((state) => (0, ramda_1.pathOr)(createThemeSlice_1.defaultThemeState, [createThemeSlice_1.themeKey])(state), ({ theme, components }) => {
    return Object.assign(Object.assign({}, theme), { components });
});
//# sourceMappingURL=selector.js.map