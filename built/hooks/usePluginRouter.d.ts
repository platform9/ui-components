import { PluginOptions } from '../plugins/model';
declare const usePluginRouter: (initialPlugin?: string, appPlugins?: string[]) => {
    plugins: {
        [key: string]: import("../plugins/plugin").default;
    };
    currentPluginId: string;
    sections: import("../plugins/model").PluginSection[];
    currentSection: import("../plugins/model").PluginSection;
    currentLink: import("../plugins/model").IRouterLink;
    location: RouteComponentProps<P, C, S>;
    currentOptions: PluginOptions;
};
export default usePluginRouter;
