/// <reference types="react" />
import DropdownCommonProps, { DropdownItemSpec } from './DropdownCommonProps';
export interface MultiDropdownProps<V, T extends DropdownItemSpec<V> = DropdownItemSpec<V>> extends DropdownCommonProps<V, T> {
    initialValues?: V[];
    value?: (V | '__all__' | '__none__')[];
    onChange?: (selectedValues: (V | '__all__' | '__none__')[]) => void;
    multiline?: boolean;
    preventUnselectLast?: boolean;
    noCheckboxes?: boolean;
    showAll?: boolean;
    id?: string;
    optionToggleCondition?: (option: any, isSelected: any, selectedValues: any) => boolean;
}
export default function MultiDropdown<V, T extends DropdownItemSpec<V> = DropdownItemSpec<V>>(props: MultiDropdownProps<V, T>): JSX.Element;
