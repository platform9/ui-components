"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pluginList = {};
const pluginManager = {
    getPlugins() {
        return pluginList;
    },
    getPlugin(pluginId) {
        return pluginList[pluginId];
    },
    registerPlugin: (plugin) => {
        pluginList[plugin.pluginId] = plugin;
    },
    deregisterPlugin: (pluginId) => {
        delete pluginList[pluginId];
    },
};
exports.default = pluginManager;
//# sourceMappingURL=pluginManager.js.map