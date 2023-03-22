import React from 'react';
export interface ButtonProps {
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function Button({ onClick, label, }: ButtonProps): JSX.Element;
