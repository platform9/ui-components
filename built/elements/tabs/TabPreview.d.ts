/// <reference types="react" />
interface Props {
    value: string;
    label: string;
    isActive: boolean;
    onClick: (value: string) => void;
}
export default function TabPreview({ label, value, isActive, onClick }: Props): JSX.Element;
export {};
