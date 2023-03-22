import { identity } from 'ramda';
import React, { ComponentType, PureComponent } from 'react';
export declare const ValidatedFormContext: React.Context<any>;
export declare const ValidatedFormConsumer: React.Consumer<any>;
export declare const ValidatedFormProvider: React.Provider<any>;
interface Props {
    clearOnSubmit?: boolean;
    debug?: boolean;
    initialValues?: any;
    onSubmit?: any;
    triggerSubmit?: any;
    showErrorsOnBlur?: boolean;
    maxWidth?: number;
    title?: string;
    link?: React.ReactNode;
    topContent?: React.ReactNode;
    formActions?: React.ReactNode;
    inputsWidth?: number;
    elevated?: boolean;
    afterSubmit?: any;
    classes?: any;
    className?: string;
    id?: string;
    children?: React.ReactNode | ((props: any) => any);
    fieldSetter?: any;
    withAddonManager?: boolean;
    ClusterAddonManager?: ComponentType<any>;
    AddonDetailCards?: ComponentType<any>;
}
/**
 * ValidatedForm is a HOC wrapper for forms.  The child components define the
 * data value schema and the validations.
 */
declare class ValidatedForm extends PureComponent<Props, any> {
    constructor(props: any);
    /**
     * This stores the specification of the field, to be used for validation down the line.
     * This function will be called by the child components when they are initialized.
     */
    defineField: import("moize").Moized<(field: any) => (spec: any) => void, Partial<{
        isDeepEqual: boolean;
        isPromise: boolean;
        isReact: boolean;
        isSerialized: boolean;
        isShallowEqual: boolean;
        matchesArg: import("moize").IsEqual;
        matchesKey: import("moize").IsMatchingKey;
        maxAge: number;
        maxArgs: number;
        maxSize: number;
        onCacheAdd: import("moize").OnCacheOperation<(field: any) => (spec: any) => void>;
        onCacheChange: import("moize").OnCacheOperation<(field: any) => (spec: any) => void>;
        onCacheHit: import("moize").OnCacheOperation<(field: any) => (spec: any) => void>;
        onExpire: import("moize").OnExpire;
        profileName: string;
        serializer: import("moize").Serialize;
        transformArgs: import("moize").TransformKey;
        updateCacheForKey: import("moize").UpdateCacheForKey;
        updateExpire: boolean;
    }> & Partial<{
        isDeepEqual: boolean;
        isPromise: boolean;
        isReact: boolean;
        isSerialized: boolean;
        isShallowEqual: boolean;
        matchesArg: import("moize").IsEqual;
        matchesKey: import("moize").IsMatchingKey;
        maxAge: number;
        maxArgs: number;
        maxSize: number;
        onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onExpire: import("moize").OnExpire;
        profileName: string;
        serializer: import("moize").Serialize;
        transformArgs: import("moize").TransformKey;
        updateCacheForKey: import("moize").UpdateCacheForKey;
        updateExpire: boolean;
    }> & {
        maxSize: number;
    } & Partial<import("../../utils/misc").DefaultMoizeOptions>>;
    removeField: (field: any) => void;
    setValues: (values: any) => void;
    /**
     * Child components invoke this from their 'onChange' (or equivalent).
     * Note: many components use event.target.value, but we only need value here.
     * Note: values can be passed up to parent component by supplying a setContext function prop
     */
    setFieldValue: import("moize").Moized<(field: any) => (value: any, validateAll: any) => void, Partial<{
        isDeepEqual: boolean;
        isPromise: boolean;
        isReact: boolean;
        isSerialized: boolean;
        isShallowEqual: boolean;
        matchesArg: import("moize").IsEqual;
        matchesKey: import("moize").IsMatchingKey;
        maxAge: number;
        maxArgs: number;
        maxSize: number;
        onCacheAdd: import("moize").OnCacheOperation<(field: any) => (value: any, validateAll: any) => void>;
        onCacheChange: import("moize").OnCacheOperation<(field: any) => (value: any, validateAll: any) => void>;
        onCacheHit: import("moize").OnCacheOperation<(field: any) => (value: any, validateAll: any) => void>;
        onExpire: import("moize").OnExpire;
        profileName: string;
        serializer: import("moize").Serialize;
        transformArgs: import("moize").TransformKey;
        updateCacheForKey: import("moize").UpdateCacheForKey;
        updateExpire: boolean;
    }> & Partial<{
        isDeepEqual: boolean;
        isPromise: boolean;
        isReact: boolean;
        isSerialized: boolean;
        isShallowEqual: boolean;
        matchesArg: import("moize").IsEqual;
        matchesKey: import("moize").IsMatchingKey;
        maxAge: number;
        maxArgs: number;
        maxSize: number;
        onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onExpire: import("moize").OnExpire;
        profileName: string;
        serializer: import("moize").Serialize;
        transformArgs: import("moize").TransformKey;
        updateCacheForKey: import("moize").UpdateCacheForKey;
        updateExpire: boolean;
    }> & {
        maxSize: number;
    } & Partial<import("../../utils/misc").DefaultMoizeOptions>>;
    /**
     * This can be used to update a field value using an updaterFn instead of assigning a value directly
     */
    updateFieldValue: import("moize").Moized<(field: any) => (updaterFn: any, validateAll: any) => void, Partial<{
        isDeepEqual: boolean;
        isPromise: boolean;
        isReact: boolean;
        isSerialized: boolean;
        isShallowEqual: boolean;
        matchesArg: import("moize").IsEqual;
        matchesKey: import("moize").IsMatchingKey;
        maxAge: number;
        maxArgs: number;
        maxSize: number;
        onCacheAdd: import("moize").OnCacheOperation<(field: any) => (updaterFn: any, validateAll: any) => void>;
        onCacheChange: import("moize").OnCacheOperation<(field: any) => (updaterFn: any, validateAll: any) => void>;
        onCacheHit: import("moize").OnCacheOperation<(field: any) => (updaterFn: any, validateAll: any) => void>;
        onExpire: import("moize").OnExpire;
        profileName: string;
        serializer: import("moize").Serialize;
        transformArgs: import("moize").TransformKey;
        updateCacheForKey: import("moize").UpdateCacheForKey;
        updateExpire: boolean;
    }> & Partial<{
        isDeepEqual: boolean;
        isPromise: boolean;
        isReact: boolean;
        isSerialized: boolean;
        isShallowEqual: boolean;
        matchesArg: import("moize").IsEqual;
        matchesKey: import("moize").IsMatchingKey;
        maxAge: number;
        maxArgs: number;
        maxSize: number;
        onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onExpire: import("moize").OnExpire;
        profileName: string;
        serializer: import("moize").Serialize;
        transformArgs: import("moize").TransformKey;
        updateCacheForKey: import("moize").UpdateCacheForKey;
        updateExpire: boolean;
    }> & {
        maxSize: number;
    } & Partial<import("../../utils/misc").DefaultMoizeOptions>>;
    getFieldValue: import("moize").Moized<(field: any) => (getterFn?: typeof identity) => any, Partial<{
        isDeepEqual: boolean;
        isPromise: boolean;
        isReact: boolean;
        isSerialized: boolean;
        isShallowEqual: boolean;
        matchesArg: import("moize").IsEqual;
        matchesKey: import("moize").IsMatchingKey;
        maxAge: number;
        maxArgs: number;
        maxSize: number;
        onCacheAdd: import("moize").OnCacheOperation<(field: any) => (getterFn?: typeof identity) => any>;
        onCacheChange: import("moize").OnCacheOperation<(field: any) => (getterFn?: typeof identity) => any>;
        onCacheHit: import("moize").OnCacheOperation<(field: any) => (getterFn?: typeof identity) => any>;
        onExpire: import("moize").OnExpire;
        profileName: string;
        serializer: import("moize").Serialize;
        transformArgs: import("moize").TransformKey;
        updateCacheForKey: import("moize").UpdateCacheForKey;
        updateExpire: boolean;
    }> & Partial<{
        isDeepEqual: boolean;
        isPromise: boolean;
        isReact: boolean;
        isSerialized: boolean;
        isShallowEqual: boolean;
        matchesArg: import("moize").IsEqual;
        matchesKey: import("moize").IsMatchingKey;
        maxAge: number;
        maxArgs: number;
        maxSize: number;
        onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onExpire: import("moize").OnExpire;
        profileName: string;
        serializer: import("moize").Serialize;
        transformArgs: import("moize").TransformKey;
        updateCacheForKey: import("moize").UpdateCacheForKey;
        updateExpire: boolean;
    }> & {
        maxSize: number;
    } & Partial<import("../../utils/misc").DefaultMoizeOptions>>;
    /**
     *  Validate the field and return false on error, true otherwise
     */
    validateField: import("moize").Moized<(fieldPath: any) => () => boolean, Partial<{
        isDeepEqual: boolean;
        isPromise: boolean;
        isReact: boolean;
        isSerialized: boolean;
        isShallowEqual: boolean;
        matchesArg: import("moize").IsEqual;
        matchesKey: import("moize").IsMatchingKey;
        maxAge: number;
        maxArgs: number;
        maxSize: number;
        onCacheAdd: import("moize").OnCacheOperation<(fieldPath: any) => () => boolean>;
        onCacheChange: import("moize").OnCacheOperation<(fieldPath: any) => () => boolean>;
        onCacheHit: import("moize").OnCacheOperation<(fieldPath: any) => () => boolean>;
        onExpire: import("moize").OnExpire;
        profileName: string;
        serializer: import("moize").Serialize;
        transformArgs: import("moize").TransformKey;
        updateCacheForKey: import("moize").UpdateCacheForKey;
        updateExpire: boolean;
    }> & Partial<{
        isDeepEqual: boolean;
        isPromise: boolean;
        isReact: boolean;
        isSerialized: boolean;
        isShallowEqual: boolean;
        matchesArg: import("moize").IsEqual;
        matchesKey: import("moize").IsMatchingKey;
        maxAge: number;
        maxArgs: number;
        maxSize: number;
        onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
        onExpire: import("moize").OnExpire;
        profileName: string;
        serializer: import("moize").Serialize;
        transformArgs: import("moize").TransformKey;
        updateCacheForKey: import("moize").UpdateCacheForKey;
        updateExpire: boolean;
    }> & {
        maxSize: number;
    } & Partial<import("../../utils/misc").DefaultMoizeOptions>>;
    /**
     * Store the error state of the field, which will be accessed by child components
     */
    showFieldErrors: (field: any, errorMessage: any) => void;
    clearFieldErrors: (field: any) => void;
    state: {
        initialValues: any;
        values: any;
        fields: {};
        errors: {};
        setFieldValue: import("moize").Moized<(field: any) => (value: any, validateAll: any) => void, Partial<{
            isDeepEqual: boolean;
            isPromise: boolean;
            isReact: boolean;
            isSerialized: boolean;
            isShallowEqual: boolean;
            matchesArg: import("moize").IsEqual;
            matchesKey: import("moize").IsMatchingKey;
            maxAge: number;
            maxArgs: number;
            maxSize: number;
            onCacheAdd: import("moize").OnCacheOperation<(field: any) => (value: any, validateAll: any) => void>;
            onCacheChange: import("moize").OnCacheOperation<(field: any) => (value: any, validateAll: any) => void>;
            onCacheHit: import("moize").OnCacheOperation<(field: any) => (value: any, validateAll: any) => void>;
            onExpire: import("moize").OnExpire;
            profileName: string;
            serializer: import("moize").Serialize;
            transformArgs: import("moize").TransformKey;
            updateCacheForKey: import("moize").UpdateCacheForKey;
            updateExpire: boolean;
        }> & Partial<{
            isDeepEqual: boolean;
            isPromise: boolean;
            isReact: boolean;
            isSerialized: boolean;
            isShallowEqual: boolean;
            matchesArg: import("moize").IsEqual;
            matchesKey: import("moize").IsMatchingKey;
            maxAge: number;
            maxArgs: number;
            maxSize: number;
            onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onExpire: import("moize").OnExpire;
            profileName: string;
            serializer: import("moize").Serialize;
            transformArgs: import("moize").TransformKey;
            updateCacheForKey: import("moize").UpdateCacheForKey;
            updateExpire: boolean;
        }> & {
            maxSize: number;
        } & Partial<import("../../utils/misc").DefaultMoizeOptions>>;
        setValues: (values: any) => void;
        updateFieldValue: import("moize").Moized<(field: any) => (updaterFn: any, validateAll: any) => void, Partial<{
            isDeepEqual: boolean;
            isPromise: boolean;
            isReact: boolean;
            isSerialized: boolean;
            isShallowEqual: boolean;
            matchesArg: import("moize").IsEqual;
            matchesKey: import("moize").IsMatchingKey;
            maxAge: number;
            maxArgs: number;
            maxSize: number;
            onCacheAdd: import("moize").OnCacheOperation<(field: any) => (updaterFn: any, validateAll: any) => void>;
            onCacheChange: import("moize").OnCacheOperation<(field: any) => (updaterFn: any, validateAll: any) => void>;
            onCacheHit: import("moize").OnCacheOperation<(field: any) => (updaterFn: any, validateAll: any) => void>;
            onExpire: import("moize").OnExpire;
            profileName: string;
            serializer: import("moize").Serialize;
            transformArgs: import("moize").TransformKey;
            updateCacheForKey: import("moize").UpdateCacheForKey;
            updateExpire: boolean;
        }> & Partial<{
            isDeepEqual: boolean;
            isPromise: boolean;
            isReact: boolean;
            isSerialized: boolean;
            isShallowEqual: boolean;
            matchesArg: import("moize").IsEqual;
            matchesKey: import("moize").IsMatchingKey;
            maxAge: number;
            maxArgs: number;
            maxSize: number;
            onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onExpire: import("moize").OnExpire;
            profileName: string;
            serializer: import("moize").Serialize;
            transformArgs: import("moize").TransformKey;
            updateCacheForKey: import("moize").UpdateCacheForKey;
            updateExpire: boolean;
        }> & {
            maxSize: number;
        } & Partial<import("../../utils/misc").DefaultMoizeOptions>>;
        getFieldValue: import("moize").Moized<(field: any) => (getterFn?: typeof identity) => any, Partial<{
            isDeepEqual: boolean;
            isPromise: boolean;
            isReact: boolean;
            isSerialized: boolean;
            isShallowEqual: boolean;
            matchesArg: import("moize").IsEqual;
            matchesKey: import("moize").IsMatchingKey;
            maxAge: number;
            maxArgs: number;
            maxSize: number;
            onCacheAdd: import("moize").OnCacheOperation<(field: any) => (getterFn?: typeof identity) => any>;
            onCacheChange: import("moize").OnCacheOperation<(field: any) => (getterFn?: typeof identity) => any>;
            onCacheHit: import("moize").OnCacheOperation<(field: any) => (getterFn?: typeof identity) => any>;
            onExpire: import("moize").OnExpire;
            profileName: string;
            serializer: import("moize").Serialize;
            transformArgs: import("moize").TransformKey;
            updateCacheForKey: import("moize").UpdateCacheForKey;
            updateExpire: boolean;
        }> & Partial<{
            isDeepEqual: boolean;
            isPromise: boolean;
            isReact: boolean;
            isSerialized: boolean;
            isShallowEqual: boolean;
            matchesArg: import("moize").IsEqual;
            matchesKey: import("moize").IsMatchingKey;
            maxAge: number;
            maxArgs: number;
            maxSize: number;
            onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onExpire: import("moize").OnExpire;
            profileName: string;
            serializer: import("moize").Serialize;
            transformArgs: import("moize").TransformKey;
            updateCacheForKey: import("moize").UpdateCacheForKey;
            updateExpire: boolean;
        }> & {
            maxSize: number;
        } & Partial<import("../../utils/misc").DefaultMoizeOptions>>;
        defineField: import("moize").Moized<(field: any) => (spec: any) => void, Partial<{
            isDeepEqual: boolean;
            isPromise: boolean;
            isReact: boolean;
            isSerialized: boolean;
            isShallowEqual: boolean;
            matchesArg: import("moize").IsEqual;
            matchesKey: import("moize").IsMatchingKey;
            maxAge: number;
            maxArgs: number;
            maxSize: number;
            onCacheAdd: import("moize").OnCacheOperation<(field: any) => (spec: any) => void>;
            onCacheChange: import("moize").OnCacheOperation<(field: any) => (spec: any) => void>;
            onCacheHit: import("moize").OnCacheOperation<(field: any) => (spec: any) => void>;
            onExpire: import("moize").OnExpire;
            profileName: string;
            serializer: import("moize").Serialize;
            transformArgs: import("moize").TransformKey;
            updateCacheForKey: import("moize").UpdateCacheForKey;
            updateExpire: boolean;
        }> & Partial<{
            isDeepEqual: boolean;
            isPromise: boolean;
            isReact: boolean;
            isSerialized: boolean;
            isShallowEqual: boolean;
            matchesArg: import("moize").IsEqual;
            matchesKey: import("moize").IsMatchingKey;
            maxAge: number;
            maxArgs: number;
            maxSize: number;
            onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onExpire: import("moize").OnExpire;
            profileName: string;
            serializer: import("moize").Serialize;
            transformArgs: import("moize").TransformKey;
            updateCacheForKey: import("moize").UpdateCacheForKey;
            updateExpire: boolean;
        }> & {
            maxSize: number;
        } & Partial<import("../../utils/misc").DefaultMoizeOptions>>;
        removeField: (field: any) => void;
        validateField: import("moize").Moized<(fieldPath: any) => () => boolean, Partial<{
            isDeepEqual: boolean;
            isPromise: boolean;
            isReact: boolean;
            isSerialized: boolean;
            isShallowEqual: boolean;
            matchesArg: import("moize").IsEqual;
            matchesKey: import("moize").IsMatchingKey;
            maxAge: number;
            maxArgs: number;
            maxSize: number;
            onCacheAdd: import("moize").OnCacheOperation<(fieldPath: any) => () => boolean>;
            onCacheChange: import("moize").OnCacheOperation<(fieldPath: any) => () => boolean>;
            onCacheHit: import("moize").OnCacheOperation<(fieldPath: any) => () => boolean>;
            onExpire: import("moize").OnExpire;
            profileName: string;
            serializer: import("moize").Serialize;
            transformArgs: import("moize").TransformKey;
            updateCacheForKey: import("moize").UpdateCacheForKey;
            updateExpire: boolean;
        }> & Partial<{
            isDeepEqual: boolean;
            isPromise: boolean;
            isReact: boolean;
            isSerialized: boolean;
            isShallowEqual: boolean;
            matchesArg: import("moize").IsEqual;
            matchesKey: import("moize").IsMatchingKey;
            maxAge: number;
            maxArgs: number;
            maxSize: number;
            onCacheAdd: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onCacheChange: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onCacheHit: import("moize").OnCacheOperation<import("moize").Moizeable>;
            onExpire: import("moize").OnExpire;
            profileName: string;
            serializer: import("moize").Serialize;
            transformArgs: import("moize").TransformKey;
            updateCacheForKey: import("moize").UpdateCacheForKey;
            updateExpire: boolean;
        }> & {
            maxSize: number;
        } & Partial<import("../../utils/misc").DefaultMoizeOptions>>;
        showingErrors: boolean;
        showErrorsOnBlur: boolean;
    };
    /**
     * Validate all fields and return false if any error is found, true otherwise
     */
    validateForm: () => boolean;
    handleSubmit: (event: any) => Promise<boolean>;
    render(): JSX.Element;
}
export default ValidatedForm;
