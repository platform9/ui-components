import { PropsWithChildren } from 'react';
interface Props {
    message?: string;
    defaultHeight?: number;
}
export default function NoContentMessage({ children, message, defaultHeight, }: PropsWithChildren<Props>): JSX.Element;
export {};
