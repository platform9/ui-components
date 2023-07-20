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
const ValidatedForm_1 = __importDefault(require("../../components/validatedForm/ValidatedForm"));
const react_1 = __importStar(require("react"));
const Modal_1 = __importDefault(require("./Modal"));
const button_1 = __importDefault(require("../button"));
const use_react_router_1 = __importDefault(require("use-react-router"));
const Progress_1 = __importDefault(require("../../components/progress/Progress"));
const Alert_1 = __importDefault(require("../../components/Alert"));
function ModalForm(_a) {
    var { children, onSubmit, disableSubmit = false, submitTitle = 'Submit', fieldSetter = null, submitting = false, loading = false, loadingMessage = 'Loading', error, customErrorComponent, route, open, withAddonManager, initialValues = {}, showBackButton, onBackButtonClick } = _a, props = __rest(_a, ["children", "onSubmit", "disableSubmit", "submitTitle", "fieldSetter", "submitting", "loading", "loadingMessage", "error", "customErrorComponent", "route", "open", "withAddonManager", "initialValues", "showBackButton", "onBackButtonClick"]);
    const submitFuncRef = (0, react_1.useRef)(null);
    const { match } = (0, use_react_router_1.default)();
    const setSubmitFuncRef = (handleSubmit) => {
        submitFuncRef.current = { handleSubmit };
    };
    const handleSubmit = () => {
        submitFuncRef.current.handleSubmit();
    };
    const toOpen = (0, react_1.useMemo)(() => (route ? route.pattern.match(match.url) : open), [match.url, open]);
    return (react_1.default.createElement(Modal_1.default, Object.assign({ open: toOpen, footer: react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(button_1.default, { variant: "secondary", onClick: props.onClose, disabled: submitting }, "Cancel"),
            showBackButton && (react_1.default.createElement(button_1.default, { variant: "secondary", onClick: () => onBackButtonClick(), disabled: submitting }, "Back")),
            onSubmit && (react_1.default.createElement(button_1.default, { onClick: handleSubmit, loading: submitting, disabled: disableSubmit }, submitTitle))) }, props),
        !!error && react_1.default.createElement(Alert_1.default, { variant: "error", title: error === null || error === void 0 ? void 0 : error.title, message: error === null || error === void 0 ? void 0 : error.message }),
        customErrorComponent && customErrorComponent,
        react_1.default.createElement(Progress_1.default, { loading: loading, message: loadingMessage, renderContentOnMount: !!toOpen }, !loading && (react_1.default.createElement(ValidatedForm_1.default, { onSubmit: onSubmit, triggerSubmit: setSubmitFuncRef, elevated: false, fieldSetter: fieldSetter, initialValues: initialValues, withAddonManager: withAddonManager, clearOnSubmit: props.clearOnSubmit }, children)))));
}
exports.default = ModalForm;
//# sourceMappingURL=ModalForm.js.map