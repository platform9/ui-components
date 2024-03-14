/// <reference types="react" />
interface MultiToggleSwitchProps {
    options: Array<{
        label: string;
        value: unknown;
    }>;
    onChange?: (value: any) => void;
    className?: string;
}
export default function MultiToggleSwitch({ options, onChange, className, }: MultiToggleSwitchProps): JSX.Element;
export {};
