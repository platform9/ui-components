"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterContainer = exports.HeaderContainer = exports.GridContainer = exports.FlexContainer = exports.Wrapper = exports.Container = void 0;
const styles_1 = require("@mui/material/styles");
// Common styled components for shared use across the app
// Container for layout elements
exports.Container = (0, styles_1.styled)('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}));
// Wrapper for grouping elements
exports.Wrapper = (0, styles_1.styled)('div')({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
});
// FlexContainer for flexible layouts
exports.FlexContainer = (0, styles_1.styled)('div')({
    display: 'flex',
});
// GridContainer for grid layouts
exports.GridContainer = (0, styles_1.styled)('div')(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(2),
}));
// HeaderContainer for headers
exports.HeaderContainer = (0, styles_1.styled)('header')(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
}));
// FooterContainer for footers
exports.FooterContainer = (0, styles_1.styled)('footer')(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
}));
//# sourceMappingURL=styled-components.js.map