import { useMemo } from 'react'
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
  // const session = useSelector<RootState, SessionState>(prop(sessionStoreKey))
  // const {
  //   userDetails: { role },
  //   features,
  // } = session
  const pluginId = determineCurrentStack(location, appPlugins, initialPlugin)

  const currentPath = `${pathname}${hash}`
  // const sections = getSections(plugins, role, features)
  const sections = getSections(plugins)

  let currentSection = useMemo(
    () =>
      sections.find(
        (section, idx) => (pluginId === 'default' && section.isDefault) || pluginId === section.id,
      ),
    [pluginId, sections],
  )
  const currentLink = useMemo(
    () => currentSection.links.find(matchLinkToPath(currentPath)),
    [currentSection, currentPath],
  )

  const currentOptions: PluginOptions = useMemo(() => {
    return plugins?.[pluginId]?.data?.options
  }, [pluginId, plugins])

  return {
    plugins,
    currentPluginId: pluginId,
    sections,
    currentSection,
    currentLink,
    location,
    currentOptions,
  }
}

export default usePluginRouter
