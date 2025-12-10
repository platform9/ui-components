import Plugin from './plugin'

describe('Plugin', () => {
    it('creates a plugin instance', () => {
        const plugin = new Plugin('test-plugin', 'Test Plugin', '/test')
        expect(plugin.pluginId).toBe('test-plugin')
        expect(plugin.name).toBe('Test Plugin')
        expect(plugin.basePath).toBe('/test')
    })

    it('can register and get routes', () => {
        const plugin = new Plugin('test', 'Test', '/test')
        plugin.registerRoutes([])
        expect(plugin.getRoutes()).toEqual([])
    })
})
