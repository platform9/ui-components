import React from 'react';
interface DropdownItemProps {
    isSelected?: boolean;
    showCheckbox?: boolean;
    onClick: () => void;
    disabled?: boolean;
    disableCheckbox?: boolean;
}
declare const _default: React.ForwardRefExoticComponent<DropdownItemProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLLIElement>>;
export default _default;
