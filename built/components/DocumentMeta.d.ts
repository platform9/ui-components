import React from 'react';
interface TagProps {
    name?: string;
    charset?: string;
    'http-equiv'?: string;
    rel?: string;
    href?: string;
    property?: string;
    content?: string;
}
export interface IDocumentMetaProps {
    title?: string;
    titleTemplate?: string;
    bodyId?: string;
    bodyClasses?: any[];
    meta?: TagProps[];
    link?: TagProps[];
    breadcrumbs?: boolean;
    breadcrumbNameOverrides?: Record<string, string>;
    breadcrumbIcon?: string;
}
interface AddScriptElementToDomBodyProps {
    id: string;
    textContent?: string;
    src?: string;
    onload?: (event: any) => void;
}
export declare class DocumentMetaCls extends React.Component<IDocumentMetaProps, {}> {
    static addScriptElementToDomBody({ id, textContent, src, onload, }: AddScriptElementToDomBodyProps): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<IDocumentMetaProps, any>;
export default _default;
