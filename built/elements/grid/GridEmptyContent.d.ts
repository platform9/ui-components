import { FC, PropsWithChildren } from 'react';
interface Props {
    message?: string;
    defaultHeight?: number;
    variant?: 'dark' | 'light';
}
declare const GridEmptyContent: FC<PropsWithChildren<Props>>;
export default GridEmptyContent;
