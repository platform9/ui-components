/// <reference types="react" />
import Dropdown from '../../elements/dropdown';
import MultiDropdown from '../../elements/dropdown/MultiDropdown';
export declare const DefaultDropdown: (args: any) => JSX.Element;
export declare const ControlledDropdown: (args: any) => JSX.Element;
declare const _default: {
    title: string;
    component: typeof Dropdown;
    subcomponents: {
        MultiDropdown: typeof MultiDropdown;
    };
    argTypes: {
        placeholder: {
            control: {
                type: string;
            };
            defaultValue: string;
            table: {
                defaultValue: {
                    summary: string;
                };
                type: {
                    summary: string;
                };
            };
        };
        enableSearch: {
            description: string;
            defaultValue: boolean;
        };
        noCheckboxes: {
            description: string;
            defaultValue: boolean;
        };
        disabled: {
            description: string;
            defaultValue: boolean;
        };
        loading: {
            description: string;
            defaultValue: boolean;
        };
    };
};
export default _default;
