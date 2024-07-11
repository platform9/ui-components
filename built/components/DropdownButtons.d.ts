/// <reference types="react" />
interface IButton {
    label: string;
    icon: string;
    onClick?: () => void;
    externalLink?: string;
    disabled?: boolean;
    tooltipMsg?: string;
}
interface DropdownButtonsProps {
    buttons: IButton[];
    label?: string;
    className?: string;
}
export default function DropdownButtons({ label, buttons, className, }: DropdownButtonsProps): JSX.Element;
export {};
