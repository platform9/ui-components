/// <reference types="react" />
export interface GridSearchFilterProps {
    value: string;
    onChange: (value: string) => void;
}
export default function GridSearchFilter({ value: initialValue, onChange }: GridSearchFilterProps): JSX.Element;
