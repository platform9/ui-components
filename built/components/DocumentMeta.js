"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentMetaCls = void 0;
const react_1 = __importDefault(require("react"));
const react_side_effect_1 = __importDefault(require("react-side-effect"));
const misc_1 = require("../utils/misc");
const breadcrumbs_1 = __importDefault(require("../elements/breadcrumbs"));
const portals_1 = require("../elements/header/portals");
const HEADER_ATTRIBUTE = 'data-react-header';
const TAG_NAMES = {
    META: 'meta',
    LINK: 'link',
};
const TAG_PROPERTIES = {
    NAME: 'name',
    CHARSET: 'charset',
    HTTPEQUIV: 'http-equiv',
    REL: 'rel',
    HREF: 'href',
    PROPERTY: 'property',
    CONTENT: 'content',
};
const getInnermostProperty = (0, misc_1.memoize)((list, property, defaultValue) => {
    // dont want to mutate the current list for future operations
    const propsList = [].concat(list);
    const innermostProplist = propsList.reverse().find((value) => value[property]) || {};
    return innermostProplist[property] || defaultValue;
});
const getTitleFromPropsList = (propsList) => {
    const innermostTitle = getInnermostProperty(propsList, 'title');
    const innermostTemplate = getInnermostProperty(propsList, 'titleTemplate', 'Platform9 - %s');
    if (innermostTemplate && innermostTitle) {
        // eslint-disable-next-line
        return innermostTemplate.replace(/\%s/g, innermostTitle);
    }
    return innermostTitle;
};
const getBodyIdFromPropsList = (propsList) => getInnermostProperty(propsList, 'bodyId');
const getBodyClassesFromPropsList = (0, misc_1.memoize)((propsList) => propsList
    .filter((props) => props.bodyClasses && Array.isArray(props.bodyClasses))
    .map((props) => props.bodyClasses)
    .reduce((classes, list) => classes.concat(list), []));
const getTagsFromPropsList = (0, misc_1.memoize)((tagName, uniqueTagIds, propsList) => {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    const approvedSeenTags = {};
    const validTags = Object.keys(TAG_PROPERTIES).map((key) => TAG_PROPERTIES[key]);
    const tagList = propsList
        .filter((props) => props[tagName] !== undefined)
        .map((props) => props[tagName])
        .reverse()
        .reduce((approvedTags, instanceTags) => {
        let instanceSeenTags = {};
        instanceTags
            .filter((tag) => {
            for (const attributeKey in tag) {
                const value = tag[attributeKey].toLowerCase();
                const attrKey = attributeKey.toLowerCase();
                if (validTags.indexOf(attrKey) == -1) {
                    return false;
                }
                if (!approvedSeenTags[attrKey]) {
                    approvedSeenTags[attrKey] = [];
                }
                if (!instanceSeenTags[attrKey]) {
                    instanceSeenTags[attrKey] = [];
                }
                // Added this to stop from crashing, not sure if correct
                if (!Array.isArray(approvedSeenTags[attrKey])) {
                    return false;
                }
                if (!approvedSeenTags[attrKey].includes(value)) {
                    instanceSeenTags[attrKey].push(value);
                    return true;
                }
                return false;
            }
            return false;
        })
            .reverse()
            .forEach((tag) => approvedTags.push(tag));
        // Update seen tags with tags from this instance
        Object.keys(instanceSeenTags).forEach((attr) => {
            approvedSeenTags[attr] = Object.assign(Object.assign({}, approvedSeenTags[attr]), instanceSeenTags[attr]);
        });
        instanceSeenTags = {};
        return approvedTags;
    }, []);
    return tagList;
});
const updateTitle = (title = '') => {
    if (!title || title === document.title) {
        return;
    }
    document.title = title || document.title;
};
const updateBodyId = (id = '') => {
    if (!id || id === document.body.id) {
        return;
    }
    document.body.setAttribute('id', id);
};
const updateBodyClasses = (classes) => {
    document.body.className = '';
    classes.forEach((cl) => {
        if (!cl || cl === '') {
            return;
        }
        document.body.classList.add(cl);
    });
};
const updateTags = (type, tags) => {
    const headElement = document.head || document.querySelector('head');
    let existingTags = headElement.querySelectorAll(`${type}[${HEADER_ATTRIBUTE}]`);
    existingTags = Array.prototype.slice.call(existingTags);
    // Remove any duplicate tags
    existingTags.forEach((tag) => tag.parentNode.removeChild(tag));
    if (tags && tags.length) {
        tags.forEach((tag) => {
            const newElement = document.createElement(type);
            for (const attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    newElement.setAttribute(attribute, tag[attribute]);
                }
            }
            newElement.setAttribute(HEADER_ATTRIBUTE, 'true');
            headElement.insertBefore(newElement, headElement.firstChild);
        });
    }
};
const reducePropsToState = (propsList) => ({
    title: getTitleFromPropsList(propsList),
    bodyId: getBodyIdFromPropsList(propsList),
    bodyClasses: getBodyClassesFromPropsList(propsList),
    metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.CONTENT], propsList),
    linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
});
const handleClientStateChange = ({ title, bodyId, bodyClasses, metaTags, linkTags, }) => {
    updateTitle(title);
    updateBodyId(bodyId);
    updateBodyClasses(bodyClasses);
    updateTags(TAG_NAMES.LINK, linkTags);
    updateTags(TAG_NAMES.META, metaTags);
};
class DocumentMetaCls extends react_1.default.Component {
    static addScriptElementToDomBody({ id, textContent, src, onload, }) {
        const existingScript = document.getElementById(id);
        if (existingScript)
            return;
        const script = document.createElement('script');
        script.id = id;
        script.textContent = textContent;
        if (src) {
            script.src = src;
        }
        script.onload = onload;
        document.body.appendChild(script);
    }
    render() {
        if (this.props.breadcrumbs) {
            return (react_1.default.createElement(portals_1.HeaderTitlePortal, null,
                react_1.default.createElement(breadcrumbs_1.default, { nameOverrides: this.props.breadcrumbNameOverrides, icon: this.props.breadcrumbIcon })));
        }
        return null;
    }
}
exports.DocumentMetaCls = DocumentMetaCls;
exports.default = (0, react_side_effect_1.default)(reducePropsToState, handleClientStateChange)(DocumentMetaCls);
//# sourceMappingURL=DocumentMeta.js.map