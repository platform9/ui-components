import Plugin from './plugin'

const pluginList: { [key: string]: Plugin } = {}

const pluginManager = {
  getPlugins() {
    return pluginList
  },

  getPlugin(pluginId) {
    return pluginList[pluginId]
  },

  registerPlugin: (plugin: Plugin) => {
    pluginList[plugin.pluginId] = plugin
  },

  deregisterPlugin: (pluginId) => {
    delete pluginList[pluginId]
  },
}

export default pluginManager
