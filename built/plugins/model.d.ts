/// <reference types="react" />
export interface PluginSection {
    id: string;
    name: string;
    links: IRouterLink[];
    isDefault: boolean;
}
export interface IRouterLink {
    name: string;
    link: Link;
    icon?: string;
    type?: 'divider' | 'link' | 'component';
    isHidden?: (params: any) => boolean | boolean;
    nestedLinks: NestedLink[] | null;
    isBottomLink?: boolean;
    requiredRoles?: string;
    requiredFeatures?: (features: any) => boolean;
    Component?: React.ComponentType<any>;
    disabled?: (params: any) => boolean | boolean;
}
interface Link {
    onClick: () => void;
    path: string;
    definition?: string;
    exact?: boolean;
    external?: boolean;
    url?: string;
    hideExternalLinkIcon?: boolean;
    externalLinkIcon?: string;
}
interface NestedLink {
    name: string;
    link: Link;
    nestedLinks: null;
    requiredFeatures?: (features: any) => boolean;
}
export interface PluginOptions {
    showFooter: boolean;
    showNavMenu: boolean;
    showSidebar: boolean;
    singlePane?: boolean;
}
export {};
