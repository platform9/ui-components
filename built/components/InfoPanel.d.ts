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
declare const InfoPanel: React.JSXElementConstructor<Omit<React.JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>, "classes"> & import("@mui/styles").StyledComponentProps<"card" | "title" | "root" | "row" | "half" | "cardContent"> & object>;
export default InfoPanel;
