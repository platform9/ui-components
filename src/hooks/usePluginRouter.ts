import { useMemo, useEffect, useRef } from 'react'
import useReactRouter from 'use-react-router'
// import { SessionState, sessionStoreKey } from 'core/session/sessionReducers'
import { determineCurrentStack, getSections } from '../plugins/helpers'
import pluginManager from '../plugins/pluginManager'
import { matchLinkToPath } from '../plugins/route-helpers'
import { PluginOptions } from '../plugins/model'

const usePluginRouter = (initialPlugin?: string, appPlugins?: string[]) => {
  const plugins = pluginManager.getPlugins()
  const { location } = useReactRouter()
  const { pathname, hash } = location
  const activePluginRef = useRef<string>()
  // const session = useSelector<RootState, SessionState>(prop(sessionStoreKey))
  // const {
  //   userDetails: { role },
  //   features,
  // } = session
  activePluginRef.current = determineCurrentStack(location, appPlugins, initialPlugin)
  useEffect(() => {
    if (activePluginRef.current === 'default') {
      // find the default plugin
      const pluginList = Object.values(plugins)
      const defaultPlugin = pluginList.find((plugin) => plugin.isDefault)
      activePluginRef.current = defaultPlugin ? defaultPlugin.pluginId : pluginList[0].pluginId
    }
  }, [activePluginRef.current])

  const currentPath = `${pathname}${hash}`
  // const sections = getSections(plugins, role, features)
  const sections = getSections(plugins)

  let currentSection = useMemo(
    () =>
      sections.find(
        (section, idx) =>
          (activePluginRef.current === 'default' && section.isDefault) ||
          activePluginRef.current === section.id,
      ),
    [activePluginRef.current, sections],
  )
  const currentLink = useMemo(
    () => currentSection.links.find(matchLinkToPath(currentPath)),
    [currentSection, currentPath],
  )

  const currentOptions: PluginOptions = useMemo(() => {
    return plugins?.[activePluginRef.current]?.data?.options
  }, [activePluginRef.current, plugins])

  return {
    plugins,
    currentPluginId: activePluginRef.current,
    sections,
    currentSection,
    currentLink,
    location,
    currentOptions,
  }
}

export default usePluginRouter
