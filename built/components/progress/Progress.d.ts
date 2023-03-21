import { PropsWithChildren } from 'react';
import { LoadingGifs } from 'src/constants';
export interface ProgressProps {
    loading: boolean;
    overlay?: boolean;
    inline?: boolean;
    renderLoadingImage?: boolean;
    renderContentOnMount?: boolean;
    message?: string;
    loadingImage?: LoadingGifs;
    inlineClassName?: string;
    loadingImageHeight?: number;
    className?: string;
}
export default function Progress({ children, ...props }: PropsWithChildren<ProgressProps>): JSX.Element;
