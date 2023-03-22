import React, { PropsWithChildren, PureComponent } from 'react';
interface Props {
    classes?: any;
    align: any;
    offset: any;
    info: string | React.ReactNode;
    infoPlacement?: any;
}
declare class InfoTooltip extends PureComponent<PropsWithChildren<Props>> {
    renderTitle: import("moize").Moized<(info: any) => JSX.Element, Partial<{
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
        onCacheAdd: import("moize").OnCacheOperation<(info: any) => JSX.Element>;
        onCacheChange: import("moize").OnCacheOperation<(info: any) => JSX.Element>;
        onCacheHit: import("moize").OnCacheOperation<(info: any) => JSX.Element>;
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
    render(): number | boolean | React.ReactFragment | JSX.Element;
}
declare const withInfoTooltip: (Component: any) => React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>;
export { withInfoTooltip };
export default InfoTooltip;
