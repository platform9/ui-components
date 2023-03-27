"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const helpers_1 = require("./helpers");
const colors_1 = __importDefault(require("./themes/base/colors"));
const typography_1 = __importDefault(require("./themes/base/typography"));
const helpers_2 = require("./themes/helpers");
const defaultColorPaletteOptions = {
    primary: 'blue',
    secondary: 'pink',
    themeKey: 'default',
    type: 'light',
};
const defaultTypographyOptions = {
    fontFamily: '"Eina04"',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
};
class CustomThemeHelper {
    constructor(colorsDefinition = colors_1.default, typographyDefinition = typography_1.default) {
        this.colorPaletteOptions = defaultColorPaletteOptions;
        this.typographyOptions = defaultTypographyOptions;
        this.colorsDefinition = (0, ramda_1.mergeRight)(colors_1.default, colorsDefinition);
        this.typographyDefinition = (0, ramda_1.mergeRight)(typography_1.default, typographyDefinition);
        this.components = (0, helpers_1.generatePf9ComponentColors)(this.colorsDefinition);
    }
    setColorPaletteOptions({ primary = defaultColorPaletteOptions.primary, secondary = defaultColorPaletteOptions.secondary, type = defaultColorPaletteOptions.type, themeKey = defaultColorPaletteOptions.themeKey, }) {
        this.colorPaletteOptions = (0, ramda_1.mergeDeepRight)(this.colorPaletteOptions, {
            primary,
            secondary,
            type,
            themeKey,
        });
    }
    setTypography({ fontFamily = defaultTypographyOptions.fontFamily, fontSize = defaultTypographyOptions.fontSize, fontWeightLight = defaultTypographyOptions.fontWeightLight, fontWeightRegular = defaultTypographyOptions.fontWeightRegular, fontWeightMedium = defaultTypographyOptions.fontWeightMedium, }) {
        this.typographyOptions = {
            fontFamily,
            fontSize,
            fontWeightLight,
            fontWeightRegular,
            fontWeightMedium,
        };
    }
    setComponentsTheme(componentsStyleGenerator) {
        this.components = (0, ramda_1.mergeDeepRight)(this.components, componentsStyleGenerator(this.colorsDefinition));
    }
    generateCustomTheme() {
        return {
            theme: (0, helpers_2.generateTheme)({
                palette: Object.assign({ colors: this.colorsDefinition }, this.colorPaletteOptions),
                typography: Object.assign({ typography: this.typographyDefinition }, this.typographyOptions),
            }),
            components: this.components,
        };
    }
}
exports.default = CustomThemeHelper;
//# sourceMappingURL=CustomThemeHelper.js.map