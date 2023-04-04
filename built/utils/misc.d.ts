import { Moizeable } from 'moize';
export interface DefaultMoizeOptions {
}
export declare const memoize: <F extends Moizeable, O extends Partial<{
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
    onCacheAdd: import("moize").OnCacheOperation<Moizeable>;
    onCacheChange: import("moize").OnCacheOperation<Moizeable>;
    onCacheHit: import("moize").OnCacheOperation<Moizeable>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}> = DefaultMoizeOptions>(fn: F, options?: Partial<O>) => import("moize").Moized<F, Partial<{
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
    onCacheAdd: import("moize").OnCacheOperation<F>;
    onCacheChange: import("moize").OnCacheOperation<F>;
    onCacheHit: import("moize").OnCacheOperation<F>;
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
    onCacheAdd: import("moize").OnCacheOperation<Moizeable>;
    onCacheChange: import("moize").OnCacheOperation<Moizeable>;
    onCacheHit: import("moize").OnCacheOperation<Moizeable>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}> & {
    maxSize: number;
} & Partial<O>>;
/**
 * Memoize using shallow equality to compare cache each key argument
 */
export declare const memoizeShallow: <F extends Moizeable, O extends Partial<{
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
    onCacheAdd: import("moize").OnCacheOperation<Moizeable>;
    onCacheChange: import("moize").OnCacheOperation<Moizeable>;
    onCacheHit: import("moize").OnCacheOperation<Moizeable>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}>>(fn: F, options?: Partial<O>) => import("moize").Moized<F, Partial<{
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
    onCacheAdd: import("moize").OnCacheOperation<F>;
    onCacheChange: import("moize").OnCacheOperation<F>;
    onCacheHit: import("moize").OnCacheOperation<F>;
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
    onCacheAdd: import("moize").OnCacheOperation<Moizeable>;
    onCacheChange: import("moize").OnCacheOperation<Moizeable>;
    onCacheHit: import("moize").OnCacheOperation<Moizeable>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}> & {
    maxSize: number;
} & Partial<O> & {
    isShallowEqual: true;
}>;
/**
 * Utility to globally memoize objects such as props or params
 */
export declare const generateObjMemoizer: <T>() => (dep: T) => T;
export declare const memoizedObj: (dep: unknown) => unknown;
/**
 * Memoizes an async function to prevent the thundering herd problem.
 * This makes duplicate calls (comparing params using shallow equality) to return the same promise.
 */
export declare const memoizePromise: (asyncFn: any) => (...params: any[]) => Promise<any>;
export declare const defaultDateFormat = "MMM Do YYYY, hh:mm A";
export declare const formatDate: (ts?: string, format?: string) => string;
/**
 * DurationBetweenDates utility function that returns difference between give start and end date
 * into format 'n day(s) n hour(s) n minute(s) depending on respective values.
 * @example ('2020-01-28T00:44:35.000Z', '2020-01-29T01:45:36.000Z') -> '1 day, 1 hour, 1 minute'
 * @param {{labels?: string[], renameLabels?: {[key: string]: string}, pluralize?: boolean}} options
 * @returns {function(string): string}
 */
export declare const durationBetweenDates: ({ labels, renameLabels, pluralize, }: {
    labels?: string[];
    renameLabels?: Record<string, string>;
    pluralize?: boolean;
}) => import("moize").Moized<(startDateTime: any, endDateTime?: any) => string, Partial<{
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
    onCacheAdd: import("moize").OnCacheOperation<(startDateTime: any, endDateTime?: any) => string>;
    onCacheChange: import("moize").OnCacheOperation<(startDateTime: any, endDateTime?: any) => string>;
    onCacheHit: import("moize").OnCacheOperation<(startDateTime: any, endDateTime?: any) => string>;
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
    onCacheAdd: import("moize").OnCacheOperation<Moizeable>;
    onCacheChange: import("moize").OnCacheOperation<Moizeable>;
    onCacheHit: import("moize").OnCacheOperation<Moizeable>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}> & {
    maxSize: number;
} & Partial<DefaultMoizeOptions>>;
/**
 * Given a number of seconds returns the number of
 * years, months, days, hours and minutes in a human readable format
 * @param seconds
 * @returns {string}
 */
export declare const secondsToString: (seconds: any) => string;
/**
 * Given a timestamp, returns the years, months, days, hours and minutes in a human readable format
 * @param creationTimeStamp
 * @returns {string}
 */
export declare const calculateAge: import("moize").Moized<(creationTimestamp: any) => string, Partial<{
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
    onCacheAdd: import("moize").OnCacheOperation<(creationTimestamp: any) => string>;
    onCacheChange: import("moize").OnCacheOperation<(creationTimestamp: any) => string>;
    onCacheHit: import("moize").OnCacheOperation<(creationTimestamp: any) => string>;
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
    onCacheAdd: import("moize").OnCacheOperation<Moizeable>;
    onCacheChange: import("moize").OnCacheOperation<Moizeable>;
    onCacheHit: import("moize").OnCacheOperation<Moizeable>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}> & {
    maxSize: number;
} & Partial<DefaultMoizeOptions>>;
export declare const parseJSON: (str: any) => any;
export declare const isNumeric: (n: any) => boolean;
export declare const isPlainObject: (obj: any) => boolean;
export declare const pathJoin: (...pathParts: any[]) => string;
export declare const castFuzzyBool: (value: any) => any;
export declare const columnPathLookup: (_path: any) => (_: any, row: any) => any;
export declare const castBoolToStr: (t?: string, f?: string) => (value: any) => string;
export declare const tryJsonParse: import("moize").Moized<(val: any) => any, Partial<{
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
    onCacheAdd: import("moize").OnCacheOperation<(val: any) => any>;
    onCacheChange: import("moize").OnCacheOperation<(val: any) => any>;
    onCacheHit: import("moize").OnCacheOperation<(val: any) => any>;
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
    onCacheAdd: import("moize").OnCacheOperation<Moizeable>;
    onCacheChange: import("moize").OnCacheOperation<Moizeable>;
    onCacheHit: import("moize").OnCacheOperation<Moizeable>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}>>;
/**
 * Converts a camelCased string to a string with capitalized words separated by spaces
 * @example "camelCasedExampleString" -> "Camel Cased Example String"
 * @param inputStr
 * @returns {string}
 */
export declare const uncamelizeString: (inputStr?: string) => string;
/**
 * Converts a snake-case string to camelCase
 * @param inputStr
 */
export declare const snakeToCamelString: (inputStr: any) => any;
/**
 * Converts a snake-case string to PascalCase
 * @param inputStr
 */
export declare const snakeToPascalString: (inputStr: any) => any;
/**
 * Capitalize the first letter of the given string
 * @param inputStr
 * @returns {*}
 */
export declare const capitalizeString: (inputStr?: string) => string;
/**
 * Transform a string so that it only has alpha-numeric and hypens.  Useful for FQDN's.
 * @param {string} str
 * @returns {string}
 */
export declare const sanitizeUrl: (str?: string) => string;
export declare const getCookieValue: (name: any) => string;
export declare const normalizeUsername: (name?: string) => string;
export declare const indefiniteArticle: (word?: string) => "a" | "an";
export declare const cleanupStacktrace: (stacktrace?: string) => string;
export declare const compareArrByValue: (key: any, order?: string) => (a: any, b: any) => any;
export declare const escapeRegex: (str: any) => any;
export declare const add: (value: any, total: any) => any;
export declare const encodeStr: (str: string) => string;
export declare const decodeStr: (str: string) => string;
export declare const stripUnitFromValue: (value: any) => any;
export declare const filterBySearch: (data: any, targets: any, searchTerm: any) => any;
export declare function lightenDarkenColor(color: string, amt: number): string;
