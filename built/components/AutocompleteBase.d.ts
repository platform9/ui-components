import { PureComponent } from 'react';
interface AutocompleteBaseProps {
    suggestions?: string[];
    onChange: any;
    initialValue?: string;
    classes?: any;
    className?: string;
    label?: string;
    id?: string;
    inputProps?: any;
    fullWidth?: boolean;
    value: string;
}
declare class AutocompleteBase extends PureComponent<AutocompleteBaseProps> {
    state: {
        value: string;
        open: boolean;
    };
    matchedSuggestions: () => string[];
    propogateChange: () => void;
    handleChange: (event: any) => void;
    handleClick: (item: any) => () => void;
    handleClose: () => void;
    toggleOpen: () => void;
    renderSuggestions: (suggestions: any) => JSX.Element;
    render(): JSX.Element;
}
export default AutocompleteBase;
