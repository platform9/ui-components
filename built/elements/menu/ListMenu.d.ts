import React from 'react';
import { IMenuProps } from './Menu';
declare type Props = IMenuProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    list: {
        name: string;
        id: string;
        icon?: string;
    }[];
    onMouseEnter?: any;
    onMouseLeave?: any;
    onClick?: (value: any) => any;
    onClose: () => void;
    render?: (item: any) => any;
};
export default function ListMenu({ anchor, list, onClick, render, ...props }: Props): JSX.Element;
export {};
