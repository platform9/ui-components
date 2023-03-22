import { FC } from 'react';
interface ReviewRow<T> {
    id: keyof T;
    label: string;
    title?: string;
    subHeader?: string;
    header?: string;
    render?: (value: any) => any;
    jointRender?: (value: any, data: any) => any;
    insertDivider?: boolean;
    renderArray?: boolean;
    hide?: (value: any) => any;
    RowComponent?: FC<{
        value: any;
    }>;
}
declare type GenericObject = Record<string, any>;
interface Props<T = GenericObject> {
    data: T;
    columns: Array<ReviewRow<T>>;
    className?: string;
}
declare const FormReviewTable: FC<Props>;
export default FormReviewTable;
