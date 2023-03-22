/// <reference types="react" />
import { Meta } from '@storybook/react';
export declare const DefaultToggleSwitch: {
    (args: any): JSX.Element;
    parameters: {
        docs: {
            source: {
                code: string;
            };
        };
    };
    args: {
        active: boolean;
        disabled: boolean;
    };
};
declare const ToggleSwitchStories: Meta;
export default ToggleSwitchStories;
