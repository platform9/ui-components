import React from 'react';
interface Props {
    onChange: (value: any) => void;
    imageUpdater?: (value: any) => void;
    value?: string;
    imageData?: string;
    id?: string;
    validations?: any[];
    hasError?: boolean;
    errorMessage?: string;
}
declare const _default: React.FC<Props>;
export default _default;
