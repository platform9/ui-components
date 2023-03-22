import { FunctionComponent } from 'react';
interface Props {
    className?: string;
    copyText: string;
    children?: any;
    inline?: boolean;
    codeBlock?: boolean;
    header?: string;
    fill?: boolean;
    copyIcon?: any;
    triggerWithChild?: boolean;
}
declare const CopyToClipboard: FunctionComponent<Props>;
export default CopyToClipboard;
