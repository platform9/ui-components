import React from 'react';
export interface EntryShape {
    key: string;
    value: string;
}
interface KeyValuesProps {
    entries: EntryShape[];
    onChange: any;
    keySuggestions?: string[];
    valueSuggestions?: string[];
    blacklistedTags?: string[];
    allowMultipleValues?: boolean;
    addLabel?: string;
    keyLabel?: string;
    valueLabel?: string;
    additionalFields?: AdditionalField[];
}
interface AdditionalField {
    id: string;
    label: string;
    Component: React.ComponentType<any>;
    props?: any;
}
declare const _default: React.FC<import("../elements/tooltip/withTooltip").PropsWithTooltip<KeyValuesProps>>;
export default _default;
