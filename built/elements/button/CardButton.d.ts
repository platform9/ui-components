/// <reference types="react" />
import { ButtonProps } from '@material-ui/core';
interface Props extends Omit<ButtonProps, 'variant' | 'size'> {
    disabled?: boolean;
    icon?: string;
    title?: string;
    message?: string;
    solidIcon?: boolean;
}
declare const CardButton: ({ onClick, title, message, icon, disabled, className, solidIcon, ...props }: Props) => JSX.Element;
export default CardButton;
