import React, { PropsWithChildren } from 'react';
import { MenuPlacementProps } from './model';
export interface IMenuProps extends MenuPlacementProps {
    open: boolean;
    anchor: JSX.Element;
    origin?: string;
    unorderedList?: boolean;
    className?: string;
    onClose?: () => void;
}
type Props = IMenuProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export default function Menu({ open, anchor, align, offset, origin, unorderedList, onClose, className, children, ...props }: PropsWithChildren<Props>): JSX.Element;
export {};
