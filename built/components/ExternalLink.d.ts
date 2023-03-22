import { PropsWithChildren } from 'react';
interface Props {
    url: string;
    newWindow?: boolean;
}
declare const ExternalLink: ({ url, children, newWindow, ...rest }: PropsWithChildren<Props>) => JSX.Element;
export default ExternalLink;
