import React from 'react'
import withSideEffect from 'react-side-effect'
import { memoize } from '../utils/misc'
import Breadcrumbs from '../elements/breadcrumbs'
import { HeaderTitlePortal } from '../elements/header/portals'

interface TagProps {
  name?: string
  charset?: string
  'http-equiv'?: string
  rel?: string
  href?: string
  property?: string
  content?: string
}
interface IPropsList {
  title?: string
  titleTemplate?: string
  bodyId?: string
  bodyClasses?: string[]
  metaTags?: TagProps[]
  linkTags?: TagProps[]
}
type IProperty = keyof IPropsList

const HEADER_ATTRIBUTE = 'data-react-header'
const TAG_NAMES = {
  META: 'meta',
  LINK: 'link',
} as const
const TAG_PROPERTIES = {
  NAME: 'name',
  CHARSET: 'charset',
  HTTPEQUIV: 'http-equiv',
  REL: 'rel',
  HREF: 'href',
  PROPERTY: 'property',
  CONTENT: 'content',
} as const
type TagProperties = 'name' | 'charset' | 'http-equiv' | 'rel' | 'href' | 'property' | 'content'

type TagTypes = 'meta' | 'link'

const getInnermostProperty = memoize(
  <T extends IProperty = IProperty>(
    list: IPropsList[],
    property: T,
    defaultValue?: string,
  ): IPropsList[T] | string => {
    // dont want to mutate the current list for future operations
    const propsList: IPropsList[] = [].concat(list)
    const innermostProplist = propsList.reverse().find((value) => value[property]) || {}
    return innermostProplist[property] || defaultValue
  },
)

const getTitleFromPropsList = (propsList: IPropsList[]) => {
  const innermostTitle = getInnermostProperty(propsList, 'title')
  const innermostTemplate = getInnermostProperty(propsList, 'titleTemplate', 'Platform9 - %s')
  if (innermostTemplate && innermostTitle) {
    // eslint-disable-next-line
    return innermostTemplate.replace(/\%s/g, innermostTitle)
  }
  return innermostTitle
}
const getBodyIdFromPropsList = (propsList: IPropsList[]) =>
  getInnermostProperty(propsList, 'bodyId')

const getBodyClassesFromPropsList = memoize((propsList: IPropsList[]) =>
  propsList
    .filter((props) => props.bodyClasses && Array.isArray(props.bodyClasses))
    .map((props) => props.bodyClasses)
    .reduce((classes, list) => classes.concat(list), []),
)

const getTagsFromPropsList = memoize(
  (tagName: TagTypes, uniqueTagIds: TagProperties[], propsList: IPropsList[]) => {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    const approvedSeenTags = {}
    const validTags = Object.keys(TAG_PROPERTIES).map((key) => TAG_PROPERTIES[key])

    const tagList = propsList
      .filter((props) => props[tagName] !== undefined)
      .map((props) => props[tagName])
      .reverse()
      .reduce((approvedTags, instanceTags) => {
        let instanceSeenTags = {}

        instanceTags
          .filter((tag) => {
            for (const attributeKey in tag) {
              const value = tag[attributeKey].toLowerCase()
              const attrKey = attributeKey.toLowerCase()

              if (validTags.indexOf(attrKey) == -1) {
                return false
              }
              if (!approvedSeenTags[attrKey]) {
                approvedSeenTags[attrKey] = []
              }
              if (!instanceSeenTags[attrKey]) {
                instanceSeenTags[attrKey] = []
              }
              // Added this to stop from crashing, not sure if correct
              if (!Array.isArray(approvedSeenTags[attrKey])) {
                return false
              }
              if (!approvedSeenTags[attrKey].includes(value)) {
                instanceSeenTags[attrKey].push(value)
                return true
              }
              return false
            }
            return false
          })
          .reverse()
          .forEach((tag) => approvedTags.push(tag))

        // Update seen tags with tags from this instance
        Object.keys(instanceSeenTags).forEach((attr) => {
          approvedSeenTags[attr] = { ...approvedSeenTags[attr], ...instanceSeenTags[attr] }
        })
        instanceSeenTags = {}
        return approvedTags
      }, [])
    return tagList
  },
)

const updateTitle = (title = '') => {
  if (!title || title === document.title) {
    return
  }
  document.title = title || document.title
}
const updateBodyId = (id = '') => {
  if (!id || id === document.body.id) {
    return
  }
  document.body.setAttribute('id', id)
}
const updateBodyClasses = (classes: string[]) => {
  document.body.className = ''
  classes.forEach((cl) => {
    if (!cl || cl === '') {
      return
    }
    document.body.classList.add(cl)
  })
}

const updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector('head')
  let existingTags = headElement.querySelectorAll(`${type}[${HEADER_ATTRIBUTE}]`)
  existingTags = Array.prototype.slice.call(existingTags)
  // Remove any duplicate tags
  existingTags.forEach((tag) => tag.parentNode.removeChild(tag))

  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type)
      for (const attribute in tag) {
        if (tag.hasOwnProperty(attribute)) {
          newElement.setAttribute(attribute, tag[attribute])
        }
      }
      newElement.setAttribute(HEADER_ATTRIBUTE, 'true')
      headElement.insertBefore(newElement, headElement.firstChild)
    })
  }
}

const reducePropsToState = (propsList: IPropsList[]) => ({
  title: getTitleFromPropsList(propsList),
  bodyId: getBodyIdFromPropsList(propsList),
  bodyClasses: getBodyClassesFromPropsList(propsList),
  metaTags: getTagsFromPropsList(
    TAG_NAMES.META,
    [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.CONTENT],
    propsList,
  ),
  linkTags: getTagsFromPropsList(
    TAG_NAMES.LINK,
    [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF],
    propsList,
  ),
})
const handleClientStateChange = ({
  title,
  bodyId,
  bodyClasses,
  metaTags,
  linkTags,
}: IPropsList) => {
  updateTitle(title)
  updateBodyId(bodyId)
  updateBodyClasses(bodyClasses)
  updateTags(TAG_NAMES.LINK, linkTags)
  updateTags(TAG_NAMES.META, metaTags)
}

export interface IDocumentMetaProps {
  title?: string
  titleTemplate?: string
  bodyId?: string
  bodyClasses?: any[]
  meta?: TagProps[]
  link?: TagProps[]
  breadcrumbs?: boolean
  breadcrumbNameOverrides?: Record<string, string>
  breadcrumbIcon?: string
}

interface AddScriptElementToDomBodyProps {
  id: string
  textContent?: string
  src?: string
  onload?: (event) => void
}

export class DocumentMetaCls extends React.Component<IDocumentMetaProps, {}> {
  static addScriptElementToDomBody({
    id,
    textContent,
    src,
    onload,
  }: AddScriptElementToDomBodyProps) {
    const existingScript = document.getElementById(id)
    if (existingScript) return
    const script = document.createElement('script')
    script.id = id
    script.textContent = textContent
    if (src) {
      script.src = src
    }
    script.onload = onload
    document.body.appendChild(script)
  }

  render() {
    if (this.props.breadcrumbs) {
      return (
        <HeaderTitlePortal>
          <Breadcrumbs
            nameOverrides={this.props.breadcrumbNameOverrides}
            icon={this.props.breadcrumbIcon}
          />
        </HeaderTitlePortal>
      )
    }
    return null
  }
}

export default withSideEffect(
  reducePropsToState,
  handleClientStateChange,
)(DocumentMetaCls) as React.ComponentClass<IDocumentMetaProps>
