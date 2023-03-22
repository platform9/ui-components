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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatedFormProvider = exports.ValidatedFormConsumer = exports.ValidatedFormContext = void 0;
const styles_1 = require("@material-ui/styles");
const fp_1 = require("../../utils/fp");
const clsx_1 = __importDefault(require("clsx"));
const FormFieldSection_1 = __importDefault(require("../../components/validatedForm/FormFieldSection"));
const fieldValidators_1 = require("../../utils/fieldValidators");
const ramda_1 = require("ramda");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const misc_1 = require("../../utils/misc");
const ValidatedFormDebug_1 = __importDefault(require("./ValidatedFormDebug"));
exports.ValidatedFormContext = react_1.default.createContext({});
exports.ValidatedFormConsumer = exports.ValidatedFormContext.Consumer;
exports.ValidatedFormProvider = exports.ValidatedFormContext.Provider;
// TODO: Convert ValidatedForm to a functional component so we can use makeStylesWithTheme
// Right now, our custom theme is not injected into the styles fn
const styles = (theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'stretch',
        marginBottom: '8px',
        // marginBottom: theme.spacing(1),
        '& .MuiFormControl-root.validatedFormInput': {
            width: '100%',
            maxWidth: '400px',
            marginTop: '12px',
            // marginTop: theme.spacing(1.5),
            marginBottom: '12px',
            // marginBottom: theme.spacing(1.5),
        },
        '& .tooltip-container': {
            maxWidth: '400px',
        },
    },
    formActions: {
        display: 'flex',
        marginLeft: '16px',
        // marginLeft: theme.spacing(2),
    },
});
/**
 * ValidatedForm is a HOC wrapper for forms.  The child components define the
 * data value schema and the validations.
 */
let ValidatedForm = class ValidatedForm extends react_1.PureComponent {
    constructor(props) {
        super(props);
        /**
         * This stores the specification of the field, to be used for validation down the line.
         * This function will be called by the child components when they are initialized.
         */
        this.defineField = (0, misc_1.memoize)((field) => (spec) => {
            this.setState(
            // Store the fields in a plain key-value map to be able to iterate over
            // them easily when performing the validations
            (0, ramda_1.assocPath)(['fields', field], spec), () => {
                if (this.state.showingErrors) {
                    this.validateField(field)();
                }
            });
        });
        this.removeField = (field) => {
            this.setState((0, ramda_1.pipe)((0, ramda_1.dissocPath)(['fields', field]), (0, fp_1.dissocPathStr)(`errors.${field}`)));
        };
        this.setValues = (values) => {
            this.setState((state) => {
                return { values: Object.assign(Object.assign({}, state.values), values) };
            }, () => {
                if (this.state.showingErrors || this.props.showErrorsOnBlur) {
                    this.validateForm();
                }
            });
        };
        /**
         * Child components invoke this from their 'onChange' (or equivalent).
         * Note: many components use event.target.value, but we only need value here.
         * Note: values can be passed up to parent component by supplying a setContext function prop
         */
        this.setFieldValue = (0, misc_1.memoize)((field) => {
            const valuePath = `values.${field}`;
            const hasErrPath = `errors.${field}.hasError`;
            return (value, validateAll) => {
                this.setState((0, fp_1.assocPathStr)(valuePath, value), () => {
                    if (this.state.showingErrors ||
                        (this.props.showErrorsOnBlur && (0, fp_1.pathEqStr)(hasErrPath, true, this.state))) {
                        if (validateAll) {
                            this.validateForm();
                        }
                        else {
                            this.validateField(field)();
                        }
                    }
                });
            };
        });
        /**
         * This can be used to update a field value using an updaterFn instead of assigning a value directly
         */
        this.updateFieldValue = (0, misc_1.memoize)((field) => {
            const valuePath = `values.${field}`;
            const hasErrPath = `errors.${field}.hasError`;
            return (updaterFn, validateAll) => {
                this.setState((state) => (0, fp_1.assocPathStr)(valuePath, updaterFn((0, fp_1.pathStr)(valuePath, state)), state), () => {
                    if (this.state.showingErrors ||
                        (this.props.showErrorsOnBlur && (0, fp_1.pathEqStr)(hasErrPath, true, this.state))) {
                        if (validateAll) {
                            this.validateForm();
                        }
                        else {
                            this.validateField(field)();
                        }
                    }
                });
            };
        });
        this.getFieldValue = (0, misc_1.memoize)((field) => (getterFn = ramda_1.identity) => {
            return getterFn((0, fp_1.pathStr)(`values.${field}`, this.state));
        });
        /**
         *  Validate the field and return false on error, true otherwise
         */
        this.validateField = (0, misc_1.memoize)((fieldPath) => () => {
            const { fields, values } = this.state;
            // Skip validation if the field has not been defined yet
            if (!fields.hasOwnProperty(fieldPath)) {
                return true;
            }
            const { validations } = fields[fieldPath];
            const fieldValue = (0, fp_1.pathStr)(fieldPath, values);
            const validationsArray = Array.isArray(validations)
                ? validations
                : (0, ramda_1.toPairs)(validations).map(([validationKey, validationSpec]) => (0, fieldValidators_1.parseValidator)(validationKey, validationSpec));
            const failedValidation = validationsArray.find((validator) => !validator.validate(fieldValue, values, fieldPath));
            if (failedValidation) {
                this.showFieldErrors(fieldPath, typeof failedValidation.errorMessage === 'function'
                    ? failedValidation.errorMessage(fieldValue, values, fieldPath)
                    : failedValidation.errorMessage);
                return false;
            }
            this.clearFieldErrors(fieldPath);
            return true;
        });
        /**
         * Store the error state of the field, which will be accessed by child components
         */
        this.showFieldErrors = (field, errorMessage) => {
            this.setState((0, fp_1.assocPathStr)(`errors.${field}`, {
                errorMessage,
                hasError: true,
            }));
        };
        this.clearFieldErrors = (field) => {
            this.setState((0, fp_1.assocPathStr)(`errors.${field}`, { hasError: false }));
        };
        this.state = {
            initialValues: Object.assign({}, (this.props.initialValues || {})),
            values: Object.assign({}, (this.props.initialValues || {})),
            fields: {},
            errors: {},
            setFieldValue: this.setFieldValue,
            setValues: this.setValues,
            updateFieldValue: this.updateFieldValue,
            getFieldValue: this.getFieldValue,
            defineField: this.defineField,
            removeField: this.removeField,
            validateField: this.validateField,
            showingErrors: false,
            showErrorsOnBlur: this.props.showErrorsOnBlur,
        };
        /**
         * Validate all fields and return false if any error is found, true otherwise
         */
        this.validateForm = () => {
            const { fields } = this.state;
            const results = Object.keys(fields).map((fieldPath) => this.validateField(fieldPath)());
            return !results.includes(false);
        };
        this.handleSubmit = async (event) => {
            const { clearOnSubmit = false, onSubmit } = this.props;
            const { initialValues, values, showingErrors, fields } = this.state;
            if (event) {
                event.preventDefault();
            }
            if (!this.validateForm()) {
                if (!showingErrors) {
                    this.setState((prevState) => (Object.assign(Object.assign({}, prevState), { showingErrors: true })));
                }
                return false;
            }
            if (onSubmit) {
                // Only send the values from the fields defined in the form
                const formDefinedValues = Object.keys(fields).reduce((acc, fieldPath) => (0, fp_1.assocPathStr)(fieldPath, (0, fp_1.pathStr)(fieldPath, values), acc), {});
                await onSubmit(formDefinedValues);
            }
            if (clearOnSubmit) {
                this.setState({ values: initialValues });
            }
            return true;
        };
        if (props.triggerSubmit) {
            props.triggerSubmit(this.handleSubmit);
        }
        if (props.fieldSetter) {
            props.fieldSetter(this.setFieldValue);
        }
    }
    render() {
        const { children, classes, debug = false, id, title, link, className, topContent, formActions, elevated = true, withAddonManager, ClusterAddonManager, AddonDetailCards, } = this.props;
        const inputs = children instanceof Function ? children(this.state) : children;
        const { values } = this.state;
        const contents = (react_1.default.createElement(react_1.default.Fragment, null,
            debug && react_1.default.createElement(ValidatedFormDebug_1.default, null),
            !elevated ? (inputs) : (react_1.default.createElement(FormFieldSection_1.default, { title: title, link: link, className: className },
                topContent,
                inputs))));
        return (react_1.default.createElement("form", { onSubmit: this.handleSubmit, className: classes.root, id: id },
            react_1.default.createElement(exports.ValidatedFormProvider, { value: this.state }, withAddonManager && ClusterAddonManager && AddonDetailCards ? (react_1.default.createElement(ClusterAddonManager, null,
                contents,
                react_1.default.createElement(AddonDetailCards, { values: values, setValues: this.setValues, setFieldValue: this.setFieldValue, defineField: this.defineField }))) : (contents)),
            formActions ? (react_1.default.createElement("div", { className: (0, clsx_1.default)('formActions', classes.formActions) }, formActions)) : null));
    }
};
ValidatedForm = __decorate([
    react_router_dom_1.withRouter
    // @ts-ignore
    ,
    (0, styles_1.withStyles)(styles)
], ValidatedForm);
exports.default = ValidatedForm;
//# sourceMappingURL=ValidatedForm.js.map