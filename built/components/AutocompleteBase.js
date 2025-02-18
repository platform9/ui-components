"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
const FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
const ArrowDropDown_1 = __importDefault(require("@material-ui/icons/ArrowDropDown"));
const styles_1 = require("@material-ui/styles");
const MenuList_1 = __importDefault(require("@material-ui/core/MenuList"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const input_1 = __importDefault(require("../elements/input"));
const clsx_1 = __importDefault(require("clsx"));
const styles = (theme) => ({
    dropdownButton: { cursor: 'pointer' },
    absolute: { position: 'absolute', zIndex: '9999' },
    relative: { position: 'relative' },
});
// @ts-ignore
let AutocompleteBase = class AutocompleteBase extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            value: this.props.initialValue || '',
            open: this.props.initialValue && this.props.initialValue.length > 0,
        };
        this.matchedSuggestions = () => {
            const { suggestions } = this.props;
            const { value } = this.state;
            if (value.length === 0) {
                return suggestions;
            }
            const r = new RegExp(value);
            const matched = (suggestions || []).filter((x) => r.test(x));
            return matched;
        };
        this.propogateChange = () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        };
        this.handleChange = (event) => {
            if (!event || !event.target) {
                return;
            }
            const value = event.target.value;
            // IDK why this callback is necessary, but I guess we will
            // find out if we ever use the key/value suggestions
            // this.setState({ value, open: true }, this.propogateChange)
            this.setState({ value, open: true });
            this.props.onChange(value);
        };
        // Note: that we are using `onMouseDown` instead of `onClick` to trigger this.
        // The reason is that the Textfield's `onBlur` is firing before the `onClick`
        // and deleting the suggestions when then makes it behave as if the suggestion
        // was never clicked.  `onBlur` does not happen until `onMouseUp` so this seems
        // to work.  Not sure about tap events.
        this.handleClick = (item) => () => {
            this.setState({ value: item, open: false }, this.propogateChange);
        };
        this.handleClose = () => {
            this.setState({ open: false });
        };
        this.toggleOpen = () => {
            this.setState((state) => ({ open: !state.open }));
        };
        this.renderSuggestions = (suggestions) => {
            const { open } = this.state;
            const { classes } = this.props;
            if (!open || !suggestions || suggestions.length === 0) {
                return null;
            }
            return (react_1.default.createElement(Paper_1.default, { className: `${classes.container} ${classes.absolute}` },
                react_1.default.createElement(MenuList_1.default, { className: classes.container }, suggestions.map((item) => (react_1.default.createElement(MenuItem_1.default, { key: item, onMouseDown: this.handleClick(item) }, item))))));
        };
    }
    render() {
        const matched = this.matchedSuggestions();
        const { value } = this.state;
        const _a = this.props, { className, classes, suggestions, onChange, initialValue, label, id } = _a, other = __rest(_a, ["className", "classes", "suggestions", "onChange", "initialValue", "label", "id"]);
        const DropdownIcon = react_1.default.createElement(ArrowDropDown_1.default, { className: classes.dropdownButton });
        return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.relative, className) },
            react_1.default.createElement(FormControl_1.default, { className: classes.container, onMouseDown: this.toggleOpen },
                react_1.default.createElement(input_1.default, Object.assign({ id: id, placeholder: label, value: value, onChange: this.handleChange, onBlur: this.handleClose }, other))),
            this.renderSuggestions(matched)));
    }
};
AutocompleteBase = __decorate([
    (0, styles_1.withStyles)(styles)
], AutocompleteBase);
exports.default = AutocompleteBase;
//# sourceMappingURL=AutocompleteBase.js.map