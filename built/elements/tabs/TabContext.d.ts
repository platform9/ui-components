import React from 'react';
export interface ITabContext {
    activeTab: string;
    addTab: (fields: {
        value: string;
        label: string;
    }) => void;
}
export declare const TabContext: React.Context<ITabContext>;
export declare const withTabContext: (Component: any) => (props: any) => JSX.Element;
