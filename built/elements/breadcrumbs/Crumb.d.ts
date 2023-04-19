import React from 'react';
import { TextProps } from '../../elements/Text';
interface CrumbProps {
    name: string;
    path: string;
    active: boolean;
    icon: string;
    leftIcon?: React.ReactNode;
    disabled?: boolean;
    textVariant?: TextProps['variant'];
}
export default function Crumb({ icon, name, path, active, leftIcon, textVariant, disabled, }: CrumbProps): JSX.Element;
export {};
