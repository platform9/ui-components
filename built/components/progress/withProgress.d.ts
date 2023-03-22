import { FC } from 'react';
import { ProgressProps } from './Progress';
export declare type PropsWithProgress<P> = {
    loading?: boolean;
    loadingProps?: Omit<ProgressProps, 'loading'>;
} & P;
export default function withProgress<P>(Component: FC<P>, defaultProgressProps?: Omit<ProgressProps, 'loading'>): FC<PropsWithProgress<P>>;
