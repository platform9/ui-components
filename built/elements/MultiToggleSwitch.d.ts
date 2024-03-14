/// <reference types="react" />
interface MultiToggleSwitchProps {
    options: Array<{
        label: string;
        value: unknown;
    }>;
    value: unknown;
    onClick: (value: any) => void;
    className?: string;
    activeOptionColor?: string;
}
export default function MultiToggleSwitch({ options, value, onClick, className, activeOptionColor, }: MultiToggleSwitchProps): JSX.Element;
export {};
