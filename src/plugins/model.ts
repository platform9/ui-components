export interface PluginSection {
  id: string
  name: string
  links: IRouterLink[]
  isDefault: boolean
}

export interface IRouterLink {
  name: string
  link: Link
  icon?: string
  type?: 'divider' | 'link'
  nestedLinks: NestedLink[] | null
  isBottomLink?: boolean
  requiredRoles?: string
  requiredFeatures?: (features: any) => boolean
}

interface Link {
  path: string
  definition?: string
  exact?: boolean
}

interface NestedLink {
  name: string
  link: Link
  nestedLinks: null
  requiredFeatures?: (features: any) => boolean
}

export interface PluginOptions {
  showFooter: boolean
  showNavMenu: boolean
  showSidebar: boolean
  singlePane?: boolean
}