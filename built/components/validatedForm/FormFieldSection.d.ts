import { PropsWithChildren, ReactNode } from 'react';
import { TextVariant } from '../../elements/Text';
interface InfoModel {
    title: string;
    children: ReactNode;
}
interface Props {
    title: string;
    className?: string;
    link?: ReactNode;
    step?: number;
    info?: string | InfoModel;
    errorMessage?: string | ReactNode;
    textVariant?: TextVariant;
}
export default function FormFieldSection({ title, className, link, info, step, children, errorMessage, textVariant, }: PropsWithChildren<Props>): JSX.Element;
export declare const useStyles: (props?: any) => Record<string, string>;
export {};
