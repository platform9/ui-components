import URLPattern from 'url-pattern';
interface GenericKVP {
    [key: string]: string;
}
interface IRouteOptions {
    id?: string;
    url: string;
    breadcrumbs?: Map<string, string>;
    name: string;
    defaultParams?: GenericKVP;
    metadata?: Record<string, string | boolean>;
    tab?: string;
}
declare type OptionalGenericKVP = GenericKVP | null | void;
declare type OptionalParamType<T extends OptionalGenericKVP> = T extends null ? void | GenericKVP : T & GenericKVP;
declare type RouterPathFn<T extends OptionalGenericKVP> = (params: OptionalParamType<T>, urlBase?: string) => string;
export declare class Route<T extends OptionalGenericKVP = null> {
    id: string;
    url: string;
    breadcrumbs: Map<string, string>;
    name: string;
    defaultParams: GenericKVP;
    metadata: Record<string, string | boolean>;
    pattern: URLPattern;
    tab: string;
    static routes: Route[];
    constructor(options: IRouteOptions);
    path: RouterPathFn<T>;
    toString(prefix?: string): string;
    /**
     * Register a route for this application
     * @param route route to register
     */
    static register<T extends OptionalGenericKVP = null>(routeOptions: IRouteOptions): Route<T>;
    static getRoutes(): Route[];
    static getCurrentRoute<T extends OptionalGenericKVP = null>(pathname?: string): Route<T> | null;
    static find: import("moize").Moized<(<T_1 extends OptionalGenericKVP = null>(pathname: string) => Route<T_1>), Partial<{
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
        onCacheAdd: import("moize").OnCacheOperation<(<T_1 extends OptionalGenericKVP = null>(pathname: string) => Route<T_1>)>;
        onCacheChange: import("moize").OnCacheOperation<(<T_1 extends OptionalGenericKVP = null>(pathname: string) => Route<T_1>)>;
        onCacheHit: import("moize").OnCacheOperation<(<T_1 extends OptionalGenericKVP = null>(pathname: string) => Route<T_1>)>;
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
    } & Partial<import("../utils/misc").DefaultMoizeOptions>>;
    static findRouteById: import("moize").Moized<(<T_1 extends OptionalGenericKVP = null>(id: string) => Route<T_1>), Partial<{
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
        onCacheAdd: import("moize").OnCacheOperation<(<T_1 extends OptionalGenericKVP = null>(id: string) => Route<T_1>)>;
        onCacheChange: import("moize").OnCacheOperation<(<T_1 extends OptionalGenericKVP = null>(id: string) => Route<T_1>)>;
        onCacheHit: import("moize").OnCacheOperation<(<T_1 extends OptionalGenericKVP = null>(id: string) => Route<T_1>)>;
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
    } & Partial<import("../utils/misc").DefaultMoizeOptions>>;
}
export declare function createUrlWithQueryString(url: URL | string, params?: GenericKVP): string;
export {};
