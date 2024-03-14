/// <reference types="react" />
import { Meta } from '@storybook/react';
export declare const DefaultMultiToggleSwitch: {
    (args: any): JSX.Element;
    parameters: {
        docs: {
            source: {
                code: string;
            };
        };
    };
    args: {
        options: {
            label: string;
            value: string;
        }[];
    };
};
declare const ToggleSwitchStories: Meta;
export default ToggleSwitchStories;
