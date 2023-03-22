/// <reference types="react" />
import { Meta } from '@storybook/react';
export declare const DefaultInput: {
    (args: any): JSX.Element;
    parameters: {
        docs: {
            source: {
                code: string;
            };
        };
    };
    args: {
        disabled: boolean;
    };
};
export declare const PasswordInput: {
    (args: any): JSX.Element;
    args: {
        disabled: boolean;
    };
};
declare const InputStories: Meta;
export default InputStories;
