/// <reference types="react" />
import { MultiDropdownProps } from '../../dropdown/MultiDropdown';
interface Option {
    label: string;
    value: string;
}
interface SimpleValuePicklistProps extends Omit<MultiDropdownProps<string>, 'items'> {
    dropdownOptions: Option[];
}
export default function StringMultiDropdownFilter({ label, compact, dropdownOptions: options, loading, onChange, value, ...rest }: SimpleValuePicklistProps): JSX.Element;
export {};
