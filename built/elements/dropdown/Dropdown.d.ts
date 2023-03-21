/// <reference types="react" />
import DropdownCommonProps, { DropdownItemSpec } from './DropdownCommonProps';
export interface DropdownProps<V, T extends DropdownItemSpec<V> = DropdownItemSpec<V>> extends DropdownCommonProps<V, T> {
    initialValue?: V;
    value?: V | '__all__' | '__none__';
    onChange?: (selectedValue: V | '__all__' | '__none__') => void;
    noBlankValue?: boolean;
    showAll?: boolean;
    allLabel?: string;
    allKey?: string;
    showNone?: boolean;
    noneLabel?: string;
    noneKey?: string;
    showClearButton?: boolean;
}
export default function Dropdown<V, T extends DropdownItemSpec<V> = DropdownItemSpec<V>>(props: DropdownProps<V, T>): JSX.Element;
