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
    isHidden?: boolean;
    nestedLinks: NestedLink[] | null;
    isBottomLink?: boolean;
    requiredRoles?: string;
    requiredFeatures?: (features: any) => boolean;
    Component?: React.ReactNode;
}
interface Link {
    onClick: () => void;
    path: string;
    definition?: string;
    exact?: boolean;
    external?: boolean;
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
