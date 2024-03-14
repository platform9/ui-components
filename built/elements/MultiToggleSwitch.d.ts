/// <reference types="react" />
interface MultiToggleSwitchProps {
    options: Array<{
        label: string;
        value: unknown;
    }>;
    onChange?: (value: any) => void;
    className?: string;
    activeOptionColor?: string;
}
export default function MultiToggleSwitch({ options, onChange, className, activeOptionColor, }: MultiToggleSwitchProps): JSX.Element;
export {};
