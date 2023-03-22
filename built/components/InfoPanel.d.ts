import React, { FC } from 'react';
export interface IDetailFields<T> {
    id: string;
    title: string;
    required?: boolean;
    helpMessage?: string | React.ReactNode;
    condition?: (cluster: T) => boolean;
    render?: (value: any, item: any) => string | React.ReactNode;
    renderExtraContent?: (value: any, item: any) => React.ReactNode;
}
interface FieldValue {
    value?: string | React.ReactNode;
    helpMessage?: string | React.ReactNode;
    extraContent?: React.ReactNode;
}
export interface FieldsForCardsProps {
    [title: string]: FieldValue;
}
export declare const DetailRow: FC<{
    label: string;
    value: string | React.ReactNode;
    helpMessage?: string;
}>;
/**
 * Gets fields for the InfoPanel component
 *
 * Ex. getFieldsForCard(fields, cluster)
 */
export declare function getFieldsForCard<T>(fields: Array<IDetailFields<T>>, item: T): FieldsForCardsProps;
declare const InfoPanel: React.ComponentType<Pick<InfoPanelProps, "title" | "className" | "customBody" | "items"> & import("@material-ui/styles").StyledComponentProps<"card" | "row" | "root" | "title" | "half" | "cardContent"> & object>;
interface InfoPanelProps {
    title: string;
    classes?: any;
    items?: any;
    customBody?: JSX.Element | React.ReactNode;
    className?: string;
}
export default InfoPanel;
