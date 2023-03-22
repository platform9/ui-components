import { ComponentType } from 'react';
interface Props {
    id: string;
    label: string;
    options: any;
    hasError?: boolean;
    required?: boolean;
    errorMessage?: string;
    value?: any;
    onChange?: (any: any) => any;
    maxOptions?: number;
    sortSelectedFirst?: boolean;
    className?: string;
}
declare const SingleSelect: ComponentType<Props>;
export default SingleSelect;
