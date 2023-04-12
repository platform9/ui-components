import Plugin from './plugin';
declare const pluginManager: {
    getPlugins(): {
        [key: string]: Plugin;
    };
    getPlugin(pluginId: any): Plugin;
    registerPlugin: (plugin: Plugin) => void;
    deregisterPlugin: (pluginId: any) => void;
};
export default pluginManager;
