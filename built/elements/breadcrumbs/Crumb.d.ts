import React from 'react';
interface CrumbProps {
    name: string;
    path: string;
    active: boolean;
    icon: string;
    leftIcon?: React.ReactNode;
    disabled?: boolean;
}
export default function Crumb({ icon, name, path, active, leftIcon, disabled, }: CrumbProps): JSX.Element;
export {};
