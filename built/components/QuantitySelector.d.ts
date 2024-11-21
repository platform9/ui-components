/// <reference types="react" />
interface Props {
    id?: string;
    onChange: (value: number) => void;
    value?: number;
    className?: string;
    disabled?: boolean;
    iconSize?: 'sm' | 'lg';
    min?: number;
    max?: number;
    allowTypedInput?: boolean;
}
export default function QuantitySelector({ id, value, onChange, className, disabled, iconSize, min, max, allowTypedInput, }: Props): JSX.Element;
export {};
