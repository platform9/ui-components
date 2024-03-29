import React from 'react';
declare class Plugin {
    pluginId: string;
    name: string;
    basePath?: string;
    icon?: any;
    isDefault: boolean;
    data: {
        frame: any;
        components: any[];
        routes: any[];
        navItems: any[];
        secondaryHeader: any;
        options: {
            showFooter: boolean;
            showNavMenu: boolean;
            showSidebar: boolean;
        };
    };
    private prependBasePath;
    routeComponent?: React.ReactNode;
    constructor(pluginId: string, name: string, basePath?: string, icon?: any, isDefault?: boolean, data?: {
        frame: any;
        components: any[];
        routes: any[];
        navItems: any[];
        secondaryHeader: any;
        options: {
            showFooter: boolean;
            showNavMenu: boolean;
            showSidebar: boolean;
        };
    }, prependBasePath?: (navItem: any) => any);
    setAsDefault(): void;
    setDefaultRouteComponent(component: any): void;
    clearAll(): void;
    registerFrame(component: any): void;
    registerComponent(component: any): void;
    registerRoutes(components?: any[]): void;
    registerNavItems(items?: any[]): void;
    registerSecondaryHeader(component: any): void;
    getFrame(): any;
    getComponents(): any[];
    getRoutes(): any[];
    getNavItems(): any[];
    getSecondaryHeader(): any;
    getOptions(): {
        showFooter: boolean;
        showNavMenu: boolean;
        showSidebar: boolean;
    };
    getOption(key: any): any;
    setOption(key: any, value: any): void;
    getDefaultRoute(): string;
    render(): any;
}
export default Plugin;
