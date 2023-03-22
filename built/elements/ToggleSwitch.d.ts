/// <reference types="react" />
export interface ToggleSwitchProps {
    active: boolean;
    disabled?: boolean;
    label?: string;
    onClick: (active: boolean) => void;
    className?: string;
}
export default function ToggleSwitch({ onClick, active, disabled, label, className, }: ToggleSwitchProps): JSX.Element;
