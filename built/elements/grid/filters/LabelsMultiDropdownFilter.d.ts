/// <reference types="react" />
import { MultiDropdownProps } from '../../dropdown/MultiDropdown';
interface KeyValuePair {
    key: string;
    value: string;
}
interface LabelPicklistProps extends Omit<MultiDropdownProps<KeyValuePair>, 'items'> {
    labels: KeyValuePair[];
}
export default function LabelsMultiDropdownFilter({ label, compact, labels, loading, onChange, value, ...rest }: LabelPicklistProps): JSX.Element;
export {};
