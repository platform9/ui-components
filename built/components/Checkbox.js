"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FontAwesomeIcon_1 = __importDefault(require("../components/FontAwesomeIcon"));
const IndeterminateCheckBox_1 = __importDefault(require("@material-ui/icons/IndeterminateCheckBox"));
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/styles");
const test_helpers_1 = __importDefault(require("../utils/test-helpers"));
const styles = (theme) => ({
    checked: {
        color: theme.palette.primary.main,
    },
});
const Checked = ({ classes }) => (react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.checked, size: "xs", solid: true }, "check-square"));
const StyledChecked = styles_1.withStyles(styles)(Checked);
const UnChecked = () => react_1.default.createElement(FontAwesomeIcon_1.default, { size: "xs" }, "square");
const Indeterminate = () => react_1.default.createElement(IndeterminateCheckBox_1.default, null);
const Checkbox = (props) => (react_1.default.createElement(core_1.Checkbox, Object.assign({ "data-testid": test_helpers_1.default(props.name), icon: react_1.default.createElement(UnChecked, null), checkedIcon: react_1.default.createElement(StyledChecked, null), indeterminateIcon: react_1.default.createElement(Indeterminate, null) }, props)));
exports.default = Checkbox;
//# sourceMappingURL=Checkbox.js.map