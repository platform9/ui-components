import { PropsWithChildren } from 'react';
import { Props as SimpleLinkProps } from '../components/SimpleLink';
interface Props extends SimpleLinkProps {
    url: string;
    newWindow?: boolean;
}
declare const ExternalLink: ({ url, children, newWindow, ...rest }: PropsWithChildren<Props>) => JSX.Element;
export default ExternalLink;
