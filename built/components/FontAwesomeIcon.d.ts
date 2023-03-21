import React from 'react';
interface FontAwesomeStyles {
    solid?: boolean;
    brand?: boolean;
    regular?: boolean;
    light?: boolean;
    duotone?: boolean;
    thin?: boolean;
}
interface Props extends React.HTMLAttributes<HTMLElement>, FontAwesomeStyles {
    children?: any;
    size?: string;
    className?: string;
    name?: string;
    spin?: boolean;
    disabled?: boolean;
}
declare const FontAwesomeIcon: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;
export default FontAwesomeIcon;
