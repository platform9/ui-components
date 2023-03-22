import React, { ComponentType, PropsWithChildren } from 'react';
import { TextVariant } from '../elements/Text';
declare type ISimpleLinkVariant = 'error' | 'primary' | 'secondary';
interface Props {
    src?: string;
    staticContext?: any;
    className?: string;
    icon?: string;
    variant?: ISimpleLinkVariant;
    textVariant?: TextVariant;
    textDecoration?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    label?: string;
    lineClamp?: number;
    iconPosition?: 'left' | 'right';
}
declare const SimpleLink: ComponentType<PropsWithChildren<Props>>;
export default SimpleLink;
