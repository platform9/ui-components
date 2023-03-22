/// <reference types="react" />
import { Meta } from '@storybook/react';
export declare const DefaultCheckbox: {
    (args: any): JSX.Element;
    parameters: {
        docs: {
            source: {
                code: string;
            };
        };
    };
    args: {
        checked: boolean;
        disabled: boolean;
        indeterminate: boolean;
    };
};
declare const CheckboxStories: Meta;
export default CheckboxStories;
